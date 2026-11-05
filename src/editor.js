/* Edit mode for the published (claude.ai) copy of the deck.

   Built only by `python build.py --editable`. Two parts:
   1. captureDeck() runs right after the slides are parsed, before any other script
      touches them, and keeps a clean copy of the page to save from.
   2. The rest runs at the end of the page: press E (or the Edit button) to type
      straight onto any slide text or speaker note, then Save to publish the deck
      with the changes, or Download to get the .html file.

   Text drawn by the charts and widgets (from the DATA block in widgets.js) and the
   pitch basics (price, target, rating) are not editable here: change those in the
   repo or the fill sheet. */
(function(){
'use strict';
var E = window.DeckEdit = window.DeckEdit || {};

// ---------- 1. capture the pristine page (called inline, before the deck boots) ----------
E.capture = function(){
  var body = document.body, live = document.getElementById('viewport');
  E.head = [];
  for (var n = body.firstChild; n; n = n.nextSibling){ if (n === live) break; E.head.push(n.cloneNode(true)); }
  E.clean = live.cloneNode(true);
  E.map = {};
  var INLINE = /^(B|I|EM|STRONG|SPAN|BR|SUB|SUP|A|SMALL|U|S|MARK|ABBR|WBR)$/;
  var TEXT = /^(H1|H2|H3|H4|H5|P|LI|TD|TH|DT|DD|SPAN|DIV|SMALL|B|LABEL|FIGCAPTION|EM|STRONG|I)$/;
  var SKIP = /^(SCRIPT|STYLE|SVG|CANVAS|BUTTON|INPUT|SELECT|TEXTAREA|OPTION|svg|IMG)$/;
  var id = 0;
  function okInside(el){
    if (el.id) return false;
    for (var c = el.firstElementChild; c; c = c.nextElementSibling){
      if (!INLINE.test(c.tagName) || c.id || !okInside(c)) return false;
    }
    return true;
  }
  function walk(a, b){
    for (var x = a.firstElementChild, y = b.firstElementChild; x; x = x.nextElementSibling, y = y.nextElementSibling){
      if (SKIP.test(x.tagName) || x.namespaceURI !== 'http://www.w3.org/1999/xhtml') continue;
      if (TEXT.test(x.tagName) && x.textContent.trim() && okInside(x) && !x.matches('[data-k],[data-logo],[data-orglogo],[data-owner]')){
        var k = 'e' + (++id); x.setAttribute('data-eid', k); E.map[k] = y; continue;
      }
      walk(x, y);
    }
  }
  walk(live, E.clean);
};

// ---------- 2. the editor ----------
E.start = function(){
  if (!E.clean) return;
  var dirty = {}, nDirty = 0, on = false, artifact = null, downloads = null, busy = false;
  var deckScripts = Array.prototype.slice.call(document.querySelectorAll('script[data-deck]'));

  // after a save the page reloads: come back to the same slide
  try { var back = sessionStorage.getItem('smifEditBack'); if (back){ sessionStorage.removeItem('smifEditBack'); if (!/^#\d+$/.test(location.hash)) history.replaceState(null, '', back); } } catch (e) {}

  var css = document.createElement('style');
  css.textContent =
    'html.editing [data-eid]{outline:1px dashed rgba(184,134,11,.55);outline-offset:2px;cursor:text}' +
    'html.editing [data-eid]:hover{outline:2px dashed #B8860B}' +
    'html.editing [data-eid]:focus{outline:2px solid #B8860B;background:rgba(255,236,170,.25)}' +
    'html.editing [data-eid].ed-dirty{outline-color:#2E7D32}' +
    'html.editing.ed-notes .slide .notes{display:block!important;position:absolute;left:0;right:0;bottom:0;background:#FFF8E1;border-top:3px solid #B8860B;padding:10px 18px;font:15px/1.4 Arial,sans-serif;color:#222;z-index:5;max-height:300px;overflow:auto;box-shadow:0 -6px 18px rgba(0,0,0,.12)}' +
    'html.editing.ed-notes .slide .notes::before{content:"Speaker notes (editable)";display:block;font:700 11px/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#8A6508;margin-bottom:6px}' +
    'html.editing.ed-notes .slide .notes p{margin:4px 0}' +
    '#edbar{position:fixed;top:10px;right:12px;z-index:95;display:flex;gap:6px;align-items:center;background:rgba(26,26,26,.94);color:#fff;padding:6px;border-radius:8px;font:500 13.5px/1 Arial,sans-serif;box-shadow:0 4px 18px rgba(0,0,0,.25)}' +
    '#edbar button{appearance:none;border:0;background:transparent;color:#fff;font:inherit;padding:9px 11px;border-radius:5px;cursor:pointer;white-space:nowrap}' +
    '#edbar button:hover{background:rgba(255,255,255,.14)}' +
    '#edbar button.pri{background:#B8860B}#edbar button.pri:hover{background:#9C7209}' +
    '#edbar button:disabled{opacity:.45;cursor:default;background:transparent}' +
    '#edbar .st{padding:0 6px;color:#ddd;white-space:nowrap}' +
    '#edbar [hidden]{display:none!important}' +
    'html:not(.editing) #edbar{opacity:.35;transition:opacity .2s}html:not(.editing) #edbar:hover{opacity:1}' ;
  document.head.appendChild(css);

  var bar = document.createElement('div'); bar.id = 'edbar'; bar.setAttribute('role', 'toolbar'); bar.setAttribute('aria-label', 'Edit the deck');
  bar.innerHTML = '<button type="button" data-a="edit" aria-pressed="false" title="Edit text on the slides (E)">Edit · E</button>' +
    '<span class="st" hidden></span>' +
    '<button type="button" data-a="notes" hidden aria-pressed="false" title="Show this slide\'s speaker notes so you can edit them">Notes</button>' +
    '<button type="button" data-a="save" class="pri" hidden disabled title="Save the changes into this deck for everyone">Save</button>' +
    '<button type="button" data-a="undo" hidden disabled title="Throw away unsaved changes">Discard</button>' +
    '<button type="button" data-a="dl" hidden title="Download this deck, with your changes, as one .html file">Download</button>';
  document.body.appendChild(bar);
  var B = {}; Array.prototype.forEach.call(bar.querySelectorAll('[data-a]'), function(b){ B[b.dataset.a] = b; });
  var st = bar.querySelector('.st');

  function note(msg){ st.hidden = false; st.textContent = msg; }
  function paint(){
    B.edit.setAttribute('aria-pressed', String(on));
    B.edit.textContent = on ? 'Done · E' : 'Edit · E';
    [B.save, B.undo, B.dl].forEach(function(b){ b.hidden = !on && !nDirty; });
    B.save.hidden = B.save.hidden || !artifact;
    B.notes.hidden = !on; B.notes.setAttribute('aria-pressed', String(document.documentElement.classList.contains('ed-notes')));
    B.save.disabled = !nDirty || busy; B.undo.disabled = !nDirty || busy;
    st.hidden = !on && !nDirty;
    if (!busy) st.textContent = nDirty ? nDirty + ' unsaved change' + (nDirty === 1 ? '' : 's') : 'Click any text to change it';
  }
  function editables(){ return document.querySelectorAll('[data-eid]'); }
  function setOn(v){
    on = v; document.documentElement.classList.toggle('editing', on);
    Array.prototype.forEach.call(editables(), function(el){
      if (on){ el.setAttribute('contenteditable', 'true'); el.setAttribute('spellcheck', 'true'); }
      else { el.removeAttribute('contenteditable'); el.removeAttribute('spellcheck'); }
      Array.prototype.forEach.call(el.querySelectorAll('[data-k],[data-logo],[data-orglogo],[data-owner]'), function(k){ if (on) k.setAttribute('contenteditable', 'false'); else k.removeAttribute('contenteditable'); });
    });
    if (!on && document.activeElement && document.activeElement.blur) document.activeElement.blur();
    paint();
  }
  document.addEventListener('input', function(e){
    var el = e.target && e.target.closest && e.target.closest('[data-eid]');
    if (!el) return;
    var k = el.getAttribute('data-eid');
    if (!dirty[k]){ dirty[k] = true; nDirty++; el.classList.add('ed-dirty'); }
    paint();
  }, true);
  // keep pasted text plain so it keeps the slide's fonts
  document.addEventListener('paste', function(e){
    if (!on || !e.target.closest || !e.target.closest('[data-eid]')) return;
    var t = (e.clipboardData || window.clipboardData).getData('text/plain');
    e.preventDefault(); document.execCommand('insertText', false, t.replace(/\s*\n\s*/g, ' '));
  }, true);
  // Enter would add a new block inside a headline: finish the edit instead
  document.addEventListener('keydown', function(e){
    var t = e.target;
    if (on && t && t.isContentEditable && e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); t.blur(); return; }
    if (t && (t.isContentEditable || /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName))) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'e' || e.key === 'E'){ setOn(!on); e.preventDefault(); }
  });
  // in edit mode a click on a slide link should not jump away
  document.addEventListener('click', function(e){ if (on && e.target.closest && e.target.closest('[data-eid] a')) e.preventDefault(); }, true);

  function cleanHTML(el){
    var c = el.cloneNode(true);
    Array.prototype.forEach.call(c.querySelectorAll('[contenteditable],[spellcheck]'), function(x){ x.removeAttribute('contenteditable'); x.removeAttribute('spellcheck'); });
    Array.prototype.forEach.call(c.querySelectorAll('[data-k],[data-logo],[data-orglogo],[data-owner]'), function(x){ x.innerHTML = ''; });
    return c.innerHTML.replace(/\u2014/g, ', ').replace(/&nbsp;/g, ' ');
  }
  function documentHTML(){
    Object.keys(dirty).forEach(function(k){ var live = document.querySelector('[data-eid="' + k + '"]'); if (live) E.map[k].innerHTML = cleanHTML(live); });
    var parts = ['<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>' + E.reset + '</style></head><body>'];
    E.head.forEach(function(n){ parts.push(n.nodeType === 1 ? n.outerHTML : n.nodeType === 3 ? n.textContent : ''); });
    parts.push(E.clean.outerHTML);
    deckScripts.forEach(function(s){ parts.push('\n<script data-deck' + (s.type ? ' type="' + s.type + '"' : '') + '>' + s.textContent + '<\/script>'); });
    parts.push('\n</body></html>');
    return parts.join('');
  }
  function stamp(){ var d = new Date(), p = function(n){ return (n < 10 ? '0' : '') + n; }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }

  B.edit.onclick = function(){ setOn(!on); };
  B.notes.onclick = function(){ document.documentElement.classList.toggle('ed-notes'); paint(); };
  B.undo.onclick = function(){ if (confirm('Throw away ' + nDirty + ' unsaved change' + (nDirty === 1 ? '' : 's') + '?')){ nDirty = 0; dirty = {}; location.reload(); } };
  B.save.onclick = function(){
    if (!artifact || !nDirty || busy) return;
    busy = true; note('Saving...'); paint();
    var html = documentHTML();
    try { sessionStorage.setItem('smifEditBack', location.hash || ''); } catch (e) {}
    artifact.publish(html).then(function(){ nDirty = 0; dirty = {}; note('Saved'); }).catch(function(err){
      busy = false;
      var c = err && err.code;
      note(c === 'conflict' ? 'Someone saved first: reloading their version' : (c === 'not_granted' || c === 'not_writer') ? 'View only: use Download to keep your changes' : 'Could not save: try again or Download');
      if (c === 'not_granted' || c === 'not_writer'){ artifact = null; }
      setTimeout(paint, 3500);
    });
  };
  B.dl.onclick = function(){
    var html = documentHTML(), name = 'smif-materials-pitch-edited-' + stamp() + '.html';
    if (downloads){ downloads.save({filename: name, data: html}).catch(function(){}); return; }
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([html], {type: 'text/html'})); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  };
  window.addEventListener('beforeunload', function(e){ if (nDirty && !busy){ e.preventDefault(); e.returnValue = ''; } });

  paint();
  if (window.claude && typeof window.claude.use === 'function'){
    window.claude.use('artifact').then(function(a){ artifact = a; paint(); }).catch(function(){});
    window.claude.use('downloads').then(function(d){ downloads = d; }).catch(function(){});
  }
};
})();
