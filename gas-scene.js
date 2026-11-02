/* gas-scene.js
 * Procedural three.js (r128) model of an industrial gas business for the SMIF deck.
 * Plain script. Requires window.THREE and THREE.OrbitControls. Defines window.GasScene.
 * Layout reads left to right: MAKE (air separation plant) -> DELIVER (pipeline, trucks,
 * cylinders) -> BUY (customers), with the money pieces (HQ, new plant) next to the plant.
 */
(function () {
'use strict';
if (window.GasScene && window.GasScene.__v) return;

/* ------------------------------------------------------------------ constants */
var CSS = [
'.gs-canvas{position:absolute;left:0;top:0;width:100%;height:100%;display:block;outline:none;touch-action:none;cursor:grab;z-index:1}',
'.gs-canvas:active{cursor:grabbing}',
'.gs-layer{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:2}',
'.gs-pill{position:absolute;left:0;top:0;box-sizing:border-box;background:#FFFFFF;color:#6B432B;border:1.5px solid #6B432B;border-radius:3px;font:600 15px Inter,"Helvetica Neue",Arial,sans-serif;line-height:1.2;padding:6px 10px;white-space:nowrap;pointer-events:auto;cursor:pointer;user-select:none;-webkit-user-select:none;box-shadow:0 1px 5px rgba(107,67,43,.14)}',
'.gs-pill.gs-sel{background:#6B432B;color:#FFFFFF}',
'.gs-stem{position:absolute;left:0;top:0;width:1.5px;margin-left:-.75px;background:#6B432B;transform-origin:50% 0}',
'.gs-dot{position:absolute;left:0;top:0;width:9px;height:9px;margin:-4.5px 0 0 -4.5px;box-sizing:border-box;border-radius:50%;background:#6B432B;border:2px solid #FFFFFF}',
'.gs-tip{position:absolute;left:0;top:0;z-index:3;background:#1A1A1A;color:#FFFFFF;font:500 14px Inter,"Helvetica Neue",Arial,sans-serif;line-height:1.3;padding:6px 10px;border-radius:4px;pointer-events:none;white-space:nowrap;display:none}'
].join('\n');

var COL = {
  bg: 0xF7F4EF, ground: 0xF4EFE7, road: 0xDDD6CE, pad: 0xFBF9F6, white: 0xFFFFFF, light: 0xE7E3DC,
  navy: 0x6B432B, wall: 0xF1EDE6, roof: 0xEDDDD3, steelL: 0xC9B3A3, steelD: 0x595959,
  gold: 0x2B5780, green: 0x2E7D4F, red: 0xB23A2E, ring: 0x90745F, tree: 0xE8E4DD, trunk: 0xC5C1BA
};

var TEXT = {
  intake: 'Air in: a free raw material',
  compressor: 'Compressor: power is the biggest cost',
  coldbox: 'Cold box: air split by boiling point',
  tanks: 'Liquid oxygen, nitrogen, argon',
  pylons: 'Grid power in',
  pipeline: 'On-site pipeline \u00b7 15-20 yr take-or-pay',
  trucks: 'Bulk liquid trucks \u00b7 3-7 yr contracts',
  cylinders: 'Packaged cylinders \u00b7 1-3 yr',
  ring: 'Trucking pays within ~150 miles',
  fab: 'Chip fab',
  steel: 'Steel mill',
  refinery: 'Refinery and chemicals',
  hospital: 'Hospital',
  food: 'Food and beverage',
  rocket: 'Launch pad',
  workshop: 'Metal fabrication',
  hq: 'Cash collected every month',
  newplant: 'New plant: capex now, cash for 15-20 years',
  passthru: 'Energy cost billed through to customers'
};
var NAMES = {
  intake: 'Air intake and filter house', compressor: 'Main air compressor', coldbox: 'Cold box: cryogenic air separation',
  tanks: 'Liquid oxygen, nitrogen and argon tanks', pylons: 'Grid power supply', pipeline: 'On-site gas pipeline',
  trucks: 'Bulk liquid tanker trucks', cylinders: 'Cylinder filling depot', ring: 'Trucking radius, about 150 miles',
  fab: 'Semiconductor fab', steel: 'Steel mill', refinery: 'Refinery and chemical plant', hospital: 'Hospital',
  food: 'Food and beverage plant', rocket: 'Rocket launch pad', workshop: 'Metal fabrication workshop',
  hq: 'Company office (HQ)', newplant: 'New plant under construction', passthru: 'Energy cost pass-through'
};
var ORDER = ['intake', 'compressor', 'coldbox', 'tanks', 'pylons', 'pipeline', 'trucks', 'cylinders', 'ring',
  'fab', 'steel', 'refinery', 'hospital', 'food', 'rocket', 'workshop', 'hq', 'newplant', 'passthru'];
var STOP_KEYS = ['site', 'make', 'deliver', 'buyers', 'money'];
var STOPS = {
  site: { labels: ['coldbox', 'pipeline', 'trucks', 'fab', 'hospital', 'hq'], flows: { air: true, gas: true, energy: true, cash: false, passthru: false } },
  make: { labels: ['coldbox', 'compressor', 'intake', 'tanks', 'pylons'], flows: { air: true, gas: true, energy: true, cash: false, passthru: false } },
  deliver: { labels: ['pipeline', 'trucks', 'cylinders', 'ring', 'tanks'], flows: { air: false, gas: true, energy: false, cash: false, passthru: false } },
  buyers: { labels: ['fab', 'steel', 'refinery', 'hospital', 'food', 'rocket', 'workshop'], flows: { air: false, gas: true, energy: false, cash: false, passthru: false } },
  money: { labels: ['hq', 'newplant', 'passthru', 'pylons', 'fab'], flows: { air: false, gas: false, energy: true, cash: true, passthru: true } }
};
/* flow kinds: color, speed (world units / s), on-screen dot size (css px) */
var FL = {
  air: { c: '#7F9CC4', v: 5, px: 11 },
  gas: { c: '#6B432B', v: 8, px: 12 },
  energy: { c: '#2B5780', v: 14, px: 12 },
  cash: { c: '#2E7D4F', v: 16, px: 13 },
  passthru: { c: '#1A1A1A', v: 13, px: 11 },
  liquid: { c: '#A57C61', v: 4, px: 10 }
};

function injectStyle() {
  if (document.getElementById('gs-style')) return;
  var s = document.createElement('style'); s.id = 'gs-style'; s.textContent = CSS;
  (document.head || document.documentElement).appendChild(s);
}
function hasWebGL() {
  try {
    var c = document.createElement('canvas');
    var g = c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl');
    if (!g) return false;
    var ext = g.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext();
    return true;
  } catch (e) { return false; }
}

function create(opts) {
  opts = opts || {};
  var THREE = window.THREE;
  if (!THREE || !THREE.OrbitControls || !THREE.WebGLRenderer) return null;
  if (!hasWebGL()) return null;
  try { return build(THREE, opts); }
  catch (e) { try { console.warn('GasScene could not start: ' + (e && e.message)); } catch (_) {} return null; }
}

/* ================================================================== build */
function build(THREE, opts) {
  var V = function (x, y, z) { return new THREE.Vector3(x, y, z); };
  var RM = false;
  try {
    var mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq) {
      RM = !!mq.matches;
      var onMq = function () { RM = !!mq.matches; };
      if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
    }
  } catch (e) {}
  injectStyle();

  var renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true }); } catch (e) { return null; }
  if (!renderer.getContext()) return null;
  renderer.setClearColor(COL.bg, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  var canvas = renderer.domElement;
  canvas.className = 'gs-canvas';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', '3D model of an industrial gas business: air separation plant, pipeline, trucks and customers');

  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(COL.bg, 430, 980);
  var camera = new THREE.PerspectiveCamera(36, 1020 / 690, 1, 2600);
  camera.position.set(0, 220, 220);
  var controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.maxPolarAngle = 1.45; controls.minDistance = 16; controls.maxDistance = 480;
  controls.screenSpacePanning = true; controls.rotateSpeed = 0.6; controls.zoomSpeed = 0.8;
  /* a plain scroll or trackpad swipe must not zoom the plant away; pinch (ctrlKey) and Ctrl or Cmd+scroll still zoom */
  canvas.addEventListener('wheel', function (e) { if (!e.ctrlKey && !e.metaKey) e.stopImmediatePropagation(); }, { capture: true });

  /* lights: soft, bright study-model lighting */
  scene.add(new THREE.HemisphereLight(0xFFFFFF, 0xCECAC3, 0.74));
  var sun = new THREE.DirectionalLight(0xFFFFFF, 0.38);
  sun.position.set(-75, 175, 115); sun.target.position.set(-10, 0, 0);
  sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
  var sc = sun.shadow.camera; sc.left = -140; sc.right = 140; sc.top = 125; sc.bottom = -125; sc.near = 40; sc.far = 520;
  sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.05;
  scene.add(sun); scene.add(sun.target);
  var fill = new THREE.DirectionalLight(0xF2EEE7, 0.14); fill.position.set(80, 60, -90); scene.add(fill);

  /* ---------------------------------------------------------------- materials */
  var MC = {};
  function mat(c, o) {
    o = o || {};
    var r = o.r == null ? 0.62 : o.r, m = o.m == null ? 0.04 : o.m;
    var k = c + '|' + r + '|' + m + '|' + (o.op || 1) + '|' + (o.ds ? 1 : 0);
    if (!o.own && MC[k]) return MC[k];
    var mt = new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m, side: o.ds ? THREE.DoubleSide : THREE.FrontSide });
    if (o.op && o.op < 1) { mt.transparent = true; mt.opacity = o.op; mt.depthWrite = false; }
    if (!o.own) MC[k] = mt;
    return mt;
  }
  var M = {
    white: mat(COL.white), pad: mat(COL.pad, { r: 0.9 }), light: mat(COL.light), navy: mat(COL.navy, { r: 0.5, m: 0.08 }),
    wall: mat(COL.wall), roof: mat(COL.roof, { r: 0.75 }), steelL: mat(COL.steelL, { r: 0.5, m: 0.15 }),
    steelD: mat(COL.steelD, { r: 0.5, m: 0.2 }), road: mat(0xCCC8C1, { r: 0.95 }), ground: mat(0xDAD6CF, { r: 1, m: 0 }),
    glass: mat(0xA7A39C, { r: 0.25, m: 0.25 }), dark: mat(0x3E3229, { r: 0.7 }), red: mat(COL.red, { r: 0.55 }),
    tree: mat(COL.tree, { r: 0.9 }), trunk: mat(COL.trunk, { r: 0.9 }), ring: mat(COL.ring, { r: 0.8 }),
    liquid: mat(0xA57C61, { r: 0.45, m: 0.15 }), pipeL: mat(0xD3CFC8, { r: 0.45, m: 0.25 })
  };

  /* ---------------------------------------------------------------- geometry cache */
  var G = {};
  function gBox() { return G.box || (G.box = new THREE.BoxGeometry(1, 1, 1)); }
  function gCyl(seg, rt) {
    seg = seg || 24; rt = rt == null ? 1 : rt;
    var k = 'c' + seg + '_' + rt;
    return G[k] || (G[k] = new THREE.CylinderGeometry(rt, 1, 1, seg, 1));
  }
  function gSph(seg) { seg = seg || 16; var k = 's' + seg; return G[k] || (G[k] = new THREE.SphereGeometry(1, seg, Math.max(6, Math.round(seg * 0.6)))); }
  function gDome(seg) { seg = seg || 24; var k = 'd' + seg; return G[k] || (G[k] = new THREE.SphereGeometry(1, seg, 8, 0, Math.PI * 2, 0, Math.PI / 2)); }
  function gPrism(saw) {
    var k = saw ? 'saw' : 'prism';
    if (!G[k]) {
      var s = new THREE.Shape(); s.moveTo(-0.5, 0); s.lineTo(0.5, 0); s.lineTo(saw ? 0.5 : 0, 1); s.lineTo(-0.5, 0);
      var g = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false }); g.translate(0, 0, -0.5); G[k] = g;
    }
    return G[k];
  }

  /* ---------------------------------------------------------------- mesh helpers */
  var root = new THREE.Group(); scene.add(root);
  var UN = {}, PICK = [], CUR = null;
  function ensureUnit(k) { if (!UN[k]) UN[k] = { key: k, meshes: [] }; }
  function unit(k) { CUR = k; if (k) ensureUnit(k); }
  function add(geo, m, x, y, z, o) {
    o = o || {};
    var me = new THREE.Mesh(geo, m);
    me.position.set(x, y, z);
    if (o.s) me.scale.set(o.s[0], o.s[1], o.s[2]);
    if (o.rot) me.rotation.set(o.rot[0], o.rot[1], o.rot[2]);
    if (o.q) me.quaternion.copy(o.q);
    me.castShadow = o.cast !== false; me.receiveShadow = o.recv !== false;
    (o.parent || root).add(me);
    if (!o.dyn) { me.updateMatrix(); me.matrixAutoUpdate = false; }
    var u = o.unit !== undefined ? o.unit : CUR;
    if (u && !o.nopick) { ensureUnit(u); me.userData.unit = u; if (o.tip) me.userData.tip = o.tip; PICK.push(me); UN[u].meshes.push(me); }
    return me;
  }
  function ext(o, more) { var r = {}, k; o = o || {}; for (k in o) r[k] = o[k]; for (k in more) r[k] = more[k]; return r; }
  function bx(w, h, d, x, y0, z, m, o) { return add(gBox(), m, x, y0 + h / 2, z, ext(o, { s: [w, h, d] })); }
  function vcyl(x, y0, z, r, h, m, o) { o = o || {}; return add(gCyl(o.seg || 24, o.taper), m, x, y0 + h / 2, z, ext(o, { s: [r, h, r] })); }
  function hcyl(x, y, z, r, len, axis, m, o) {
    o = o || {};
    return add(gCyl(o.seg || 24), m, x, y, z, ext(o, { s: [r, len, r], rot: axis === 'x' ? [0, 0, Math.PI / 2] : [Math.PI / 2, 0, 0] }));
  }
  function sph(x, y, z, r, m, o) { o = o || {}; var s = o.sy ? [r, r * o.sy, r] : [r, r, r]; return add(gSph(o.seg || 16), m, x, y, z, ext(o, { s: s })); }
  function dome(x, y, z, r, hr, m, o) { return add(gDome(24), m, x, y, z, ext(o, { s: [r, hr, r] })); }
  function prism(span, h, len, x, y0, z, m, o) {
    o = o || {};
    return add(gPrism(o.saw), m, x, y0, z, ext(o, { s: [span, h, len], rot: o.alongX ? [0, Math.PI / 2, 0] : [0, 0, 0] }));
  }
  var YQ = V(0, 1, 0);
  function seg(a, b, r, m, o) {
    var d = b.clone().sub(a), L = d.length(); if (L < 1e-3) return null;
    var q = new THREE.Quaternion().setFromUnitVectors(YQ, d.normalize());
    o = o || {};
    return add(gCyl(o.seg || 10), m, (a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2, ext(o, { s: [r, L, r], q: q }));
  }
  function toV(p) { return p.isVector3 ? p : V(p[0], p[1], p[2]); }
  function run(pts, r, m, o) {
    var P = pts.map(toV);
    for (var i = 1; i < P.length; i++) seg(P[i - 1], P[i], r, m, o);
    for (var j = 1; j < P.length - 1; j++) sph(P[j].x, P[j].y, P[j].z, r * 1.18, m, ext(o, { seg: 12 }));
    return P;
  }

  /* canvas text textures */
  var TXT = [];
  function canvasTex(w, h, draw) {
    var c = document.createElement('canvas'); c.width = w; c.height = h;
    var t = new THREE.CanvasTexture(c); t.anisotropy = 4;
    var o = { c: c, t: t, draw: draw };
    o.redraw = function () { var x = c.getContext('2d'); x.clearRect(0, 0, w, h); o.draw(x, w, h); t.needsUpdate = true; };
    o.redraw(); TXT.push(o); return o;
  }
  function textTex(text, color, opt) {
    opt = opt || {};
    return canvasTex(opt.w || 512, opt.h || 128, function (x, w, h) {
      if (opt.bg) { x.fillStyle = opt.bg; x.fillRect(0, 0, w, h); }
      var fs = opt.fs || 64;
      x.font = '700 ' + fs + 'px Inter,"Helvetica Neue",Arial,sans-serif';
      while (fs > 16 && x.measureText(text).width > w - 30) { fs -= 4; x.font = '700 ' + fs + 'px Inter,"Helvetica Neue",Arial,sans-serif'; }
      x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, w / 2, h / 2 + 3);
    });
  }

  /* instancing helper */
  var _m4 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _p = new THREE.Vector3(), _e = new THREE.Euler();
  function instanced(geo, m, list, o) {
    o = o || {};
    if (!list.length) return null;
    var im = new THREE.InstancedMesh(geo, m, list.length);
    list.forEach(function (it, i) {
      _p.set(it[0], it[1], it[2]); _e.set(0, it[6] || 0, 0); _q.setFromEuler(_e); _s.set(it[3], it[4], it[5]);
      _m4.compose(_p, _q, _s); im.setMatrixAt(i, _m4);
    });
    im.instanceMatrix.needsUpdate = true;
    im.castShadow = !!o.cast; im.receiveShadow = o.recv !== false;
    (o.parent || root).add(im);
    var u = o.unit !== undefined ? o.unit : CUR;
    if (u && !o.nopick) { ensureUnit(u); im.userData.unit = u; if (o.tip) im.userData.tip = o.tip; PICK.push(im); UN[u].meshes.push(im); }
    return im;
  }

  /* ================================================================ GROUND */
  CUR = null;
  var ground = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600), M.ground);
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; root.add(ground);
  function pad(x0, x1, z0, z1, m, h) { return bx(x1 - x0, h || 0.3, z1 - z0, (x0 + x1) / 2, 0, (z0 + z1) / 2, m || M.pad, { cast: false, nopick: true }); }
  var DASH = [];
  function road(x0, z0, x1, z1, w, dashed, y0) {
    w = w || 6; y0 = y0 || 0;
    if (z0 === z1) {
      bx(Math.abs(x1 - x0), 0.12, w, (x0 + x1) / 2, y0, z0, M.road, { cast: false, nopick: true });
      if (dashed) for (var x = Math.min(x0, x1) + 2; x < Math.max(x0, x1) - 2; x += 5) DASH.push([x, y0 + 0.13, z0, 2.4, 0.02, 0.28, 0]);
    } else {
      bx(w, 0.12, Math.abs(z1 - z0), x0, y0, (z0 + z1) / 2, M.road, { cast: false, nopick: true });
      if (dashed) for (var z = Math.min(z0, z1) + 2; z < Math.max(z0, z1) - 2; z += 5) DASH.push([x0, y0 + 0.13, z, 0.28, 0.02, 2.4, 0]);
    }
  }
  function disc(x, z, r, y0) { return vcyl(x, y0 || 0, z, r, 0.12, M.road, { cast: false, nopick: true, seg: 40 }); }

  /* concrete pads */
  pad(-58, 8, -17, 18);           /* air separation plant */
  pad(-50, -12, -43, -22, M.pad); /* new plant site */
  pad(-66, -50, -41, -19);        /* HQ plaza */
  pad(-32, -16, 27, 41);          /* cylinder depot */
  pad(6, 29, 27.8, 40);           /* hospital */
  pad(33, 59, 27.8, 40);          /* food plant */
  pad(20, 36, 39, 51);            /* workshop */
  pad(24, 49, 4, 19);             /* refinery */
  pad(23, 54, -33, -15.5);        /* fab */
  pad(45, 68, -17, 9.5);          /* steel */
  pad(-56, -47, -12, -4, M.pad, 0.32); /* substation */

  /* roads */
  road(-73, 22, 70, 22, 6, true);         /* main road */
  road(-70, -30, -70, 19, 6, true);       /* west road to HQ */
  road(-73, -30, -66, -30, 5);            /* HQ entrance */
  road(-6, 9, -6, 18, 4.2, false, 0.3); road(-6, 18, -6, 22, 4.2);   /* bay entry (one way) */
  road(4.4, 9, 4.4, 18, 4.2, false, 0.3); road(4.4, 18, 4.4, 22, 4.2); /* bay exit (one way) */
  road(-8, 9, 6.5, 9, 4.6, false, 0.3);                               /* through the loading bay */
  road(9.5, 22, 9.5, 26.4, 3.4); road(20.5, 22, 20.5, 26.4, 3.4); road(8, 26.4, 22, 26.4, 3.4); /* hospital drive */
  road(37.5, 22, 37.5, 26.4, 3.4); road(48.5, 22, 48.5, 26.4, 3.4); road(36, 26.4, 50, 26.4, 3.4); /* food drive */
  road(-24, 41, -24, 46, 5);              /* depot to front road */
  road(-24, 46, 18, 46, 5, true);         /* front road to the workshop */
  road(72, -36, 72, 22, 6, true);         /* road to the launch site */
  disc(72, 22, 6.4); vcyl(72, 0, 22, 2.2, 0.5, M.pad, { cast: false, nopick: true, seg: 32 });
  disc(19, 46, 4.6, 0.3); disc(-24, 39.6, 4.4, 0.3);
  instanced(gBox(), mat(0xFFFFFF, { r: 0.9 }), DASH, { nopick: true, unit: null });

  /* ================================================================ POWER */
  unit('pylons');
  var PYX = [-100, -88, -76, -64], PYZ = -8;
  var ATT = [[10.5, 4.3], [10.5, -4.3], [13.5, 2.9], [13.5, -2.9]];
  function pylon(x0, z0) {
    var m = M.steelD, H1 = 13, b = 2.1, t = 0.55;
    var C4 = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    var lp = function (c, y) { var f = y / H1, hw = b + (t - b) * f; return V(x0 + c[0] * hw, y, z0 + c[1] * hw); };
    C4.forEach(function (c) { seg(lp(c, 0), lp(c, H1), 0.12, m, { seg: 6 }); });
    var lv = [0, 3.6, 7, 10.2, H1];
    for (var i = 0; i < lv.length - 1; i++) {
      for (var j = 0; j < 4; j++) {
        var c1 = C4[j], c2 = C4[(j + 1) % 4];
        seg(i % 2 ? lp(c1, lv[i]) : lp(c2, lv[i]), i % 2 ? lp(c2, lv[i + 1]) : lp(c1, lv[i + 1]), 0.05, m, { seg: 4, cast: false });
        seg(lp(c1, lv[i + 1]), lp(c2, lv[i + 1]), 0.06, m, { seg: 4, cast: false });
      }
    }
    C4.forEach(function (c) { seg(lp(c, H1), V(x0, 16.4, z0), 0.08, m, { seg: 5 }); });
    bx(0.5, 0.36, 9.8, x0, 10.9, z0, m);
    bx(0.5, 0.36, 7, x0, 13.9, z0, m);
    ATT.forEach(function (a) { vcyl(x0, a[0], z0 + a[1], 0.13, 0.8, M.white, { seg: 8, cast: false }); });
    C4.forEach(function (c) { bx(0.9, 0.45, 0.9, x0 + c[0] * b, 0, z0 + c[1] * b, M.light, { cast: false }); });
  }
  PYX.forEach(function (x) { pylon(x, PYZ); });
  /* substation gantry and transformer */
  var GX = -53, GZ = -8;
  [-3.3, 3.3].forEach(function (dz) { vcyl(GX, 0.3, GZ + dz, 0.22, 9.4, M.steelD, { seg: 8 }); });
  bx(0.5, 0.45, 7.4, GX, 9.5, GZ, M.steelD);
  var GATT = [[9.4, 2.6], [9.4, -2.6], [9.4, 1], [9.4, -1]];
  bx(3.2, 2.9, 2.6, -49.5, 0.32, GZ, M.light, { tip: 'Transformer: grid power stepped down for the motors' });
  for (var fi = 0; fi < 5; fi++) bx(0.12, 2.2, 3.2, -51.3 + fi * 0.04, 0.6, GZ, M.steelD, { cast: false });
  [-0.8, 0, 0.8].forEach(function (dz) { vcyl(-49.5, 3.2, GZ + dz, 0.14, 1.1, M.white, { seg: 8, cast: false }); });
  /* wires */
  var WIRE = [];
  function catenary(a, b, sag, n) { var out = []; for (var i = 0; i <= n; i++) { var t = i / n; out.push(V(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t - sag * 4 * t * (1 - t), a.z + (b.z - a.z) * t)); } return out; }
  var spans = [-124].concat(PYX);
  for (var wi = 0; wi < 4; wi++) {
    var wpts = [];
    for (var si = 0; si < spans.length; si++) {
      var xa = spans[si], xb = si + 1 < spans.length ? spans[si + 1] : GX;
      var ya = ATT[wi][0], za = PYZ + ATT[wi][1];
      var yb = si + 1 < spans.length ? ATT[wi][0] : GATT[wi][0], zb = si + 1 < spans.length ? za : GZ + GATT[wi][1];
      var cpts = catenary(V(xa, ya, za), V(xb, yb, zb), si + 1 < spans.length ? 1.3 : 0.6, 8);
      for (var ci = 1; ci < cpts.length; ci++) seg(cpts[ci - 1], cpts[ci], 0.05, M.steelD, { seg: 4, cast: false, nopick: si === 0 });
      wpts = wpts.concat(si === 0 ? cpts : cpts.slice(1));
    }
    WIRE.push(wpts);
  }
  /* drop to transformer and bus duct into the compressor house */
  seg(V(GX, 9.4, GZ + 1), V(-49.5, 4.3, GZ), 0.06, M.steelD, { seg: 4, cast: false });
  bx(5.8, 0.8, 0.9, -45.6, 2.4, GZ, M.light, { tip: 'Bus duct: power to the compressor motor' });
  bx(0.9, 0.8, 6.6, -43, 2.4, GZ + 3.3, M.light, { tip: 'Bus duct: power to the compressor motor' });

  /* ================================================================ PLANT */
  /* air intake filter house */
  unit('intake');
  bx(5, 6, 7, -52, 0.3, 6, M.white);
  bx(5.5, 0.4, 7.5, -52, 6.3, 6, M.navy);
  for (var li = 0; li < 7; li++) bx(0.25, 0.32, 6.4, -54.62, 0.9 + li * 0.75, 6, M.navy, { cast: false });
  bx(0.12, 5.6, 6.8, -54.52, 0.5, 6, M.light, { cast: false });
  bx(3.6, 2.4, 2.4, -47.8, 2.3, 6, M.pipeL, { tip: 'Filtered air duct' });

  /* main air compressor house + big motor */
  unit('compressor');
  bx(10, 7, 11, -41, 0.3, 4, M.white);
  bx(10.3, 0.75, 11.3, -41, 6.55, 4, M.navy);
  bx(10, 0.3, 11, -41, 7.3, 4, M.pad);
  [-43.5, -40, -36.8].forEach(function (x) { bx(1.6, 0.9, 1.6, x + 0.5, 7.6, 1.5, M.light, { cast: false }); });
  bx(3.4, 4.4, 0.15, -41, 0.3, 9.55, M.light, { cast: false });
  bx(3.8, 0.35, 0.25, -41, 4.7, 9.6, M.navy, { cast: false });
  for (var wn = 0; wn < 4; wn++) bx(1.4, 0.9, 0.12, -45 + wn * 2.7 + (wn > 1 ? 2.6 : 0), 5.2, 9.56, M.glass, { cast: false });
  bx(9, 1, 3.6, -41, 0.3, 13.6, M.light);
  hcyl(-43.2, 2.95, 13.6, 1.55, 4.6, 'x', M.white, { tip: 'Big electric motor: the plant\'s main power draw' });
  for (var fn = 0; fn < 7; fn++) hcyl(-45 + fn * 0.6, 2.95, 13.6, 1.66, 0.14, 'x', M.navy, { seg: 24, cast: false, tip: 'Big electric motor: the plant\'s main power draw' });
  hcyl(-45.7, 2.95, 13.6, 1.2, 0.5, 'x', M.navy, { tip: 'Big electric motor: the plant\'s main power draw' });
  hcyl(-40.4, 2.95, 13.6, 0.5, 1.2, 'x', M.steelD, { seg: 12, cast: false });
  hcyl(-38.2, 2.7, 13.6, 1.2, 3, 'x', M.light, { tip: 'Air compressor stage' });
  vcyl(-38.2, 3.6, 13.6, 0.4, 3.2, M.pipeL, { seg: 12 });
  seg(V(-38.2, 6.6, 13.6), V(-38.2, 6.6, 9.4), 0.4, M.pipeL, { seg: 12 });
  sph(-38.2, 6.6, 13.6, 0.46, M.pipeL, { seg: 12 });

  /* adsorbers (purification) + cold box */
  unit('coldbox');
  var ADX = -30.3;
  [-0.6, 5.2].forEach(function (z) {
    var tip = 'Adsorbers: strip water and CO2 from the air';
    hcyl(ADX, 2.3, z, 1.2, 4.6, 'x', M.white, { tip: tip });
    sph(ADX - 2.3, 2.3, z, 1.2, M.white, { tip: tip, seg: 18 });
    sph(ADX + 2.3, 2.3, z, 1.2, M.white, { tip: tip, seg: 18 });
    [-1.6, 1.6].forEach(function (dx) { bx(0.5, 1.4, 2, ADX + dx, 0.3, z, M.navy, { tip: tip }); });
    vcyl(ADX, 3.4, z, 0.22, 1.9, M.pipeL, { seg: 10, cast: false });
  });
  run([[-36, 5.3, 2.3], [-24.5, 5.3, 2.3]], 0.36, M.pipeL, { tip: 'Compressed air to the cold box' });
  seg(V(ADX, 5.3, -0.6), V(ADX, 5.3, 2.3), 0.22, M.pipeL, { seg: 10, cast: false });
  seg(V(ADX, 5.3, 5.2), V(ADX, 5.3, 2.3), 0.22, M.pipeL, { seg: 10, cast: false });
  var CBX = -22, CBZ = 0.5, CBH = 24;
  bx(6.4, 0.5, 6.4, CBX, 0.3, CBZ, M.light);
  bx(5, CBH, 5, CBX, 0.8, CBZ, M.white);
  [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(function (c) { bx(0.32, CBH, 0.32, CBX + c[0] * 2.45, 0.8, CBZ + c[1] * 2.45, M.navy, { cast: false }); });
  [8.8, 16.8].forEach(function (y) { bx(5.12, 0.3, 5.12, CBX, y, CBZ, M.navy, { cast: false }); });
  bx(5.6, 0.7, 5.6, CBX, CBH + 0.8, CBZ, M.navy);
  bx(1.4, 1.2, 1.4, CBX + 1, CBH + 1.5, CBZ - 1, M.light, { cast: false });
  vcyl(CBX + 2.9, 0.8, CBZ - 1.5, 0.24, CBH - 2, M.pipeL, { seg: 10 });
  vcyl(CBX + 2.9, 0.8, CBZ + 1.6, 0.24, CBH - 5, M.pipeL, { seg: 10 });
  vcyl(CBX - 2.9, 0.8, CBZ + 1.2, 0.2, CBH - 8, M.pipeL, { seg: 10 });
  run([[CBX + 2.9, CBH - 1.2, CBZ - 1.5], [CBX + 2.9, CBH - 1.2, -6], [-12, CBH - 1.2, -6], [-12, 12.2, -6]], 0.22, M.pipeL, { tip: 'Liquid product line to storage', cast: false });

  /* storage tanks */
  unit('tanks');
  var TKX = [-12, -6, 0], TKZ = -10, TKR = 2.3, TKH = 12, TKN = ['OXYGEN', 'NITROGEN', 'ARGON'];
  TKX.forEach(function (x, i) {
    vcyl(x, 0.3, TKZ, TKR + 0.3, 0.6, M.light, { seg: 32 });
    vcyl(x, 0.9, TKZ, TKR, TKH, M.white, { seg: 32 });
    vcyl(x, TKH - 2.2, TKZ, TKR + 0.04, 1.5, M.navy, { seg: 32, cast: false });
    dome(x, TKH + 0.9, TKZ, TKR, 0.9, M.white);
    bx(0.5, TKH, 0.12, x + 1.2, 0.9, TKZ + TKR - 0.15, M.light, { cast: false });
    var tt = textTex(TKN[i], '#FFFFFF', { w: 512, h: 96, fs: 66 });
    var tg = new THREE.CylinderGeometry(TKR + 0.06, TKR + 0.06, 1.1, 24, 1, true, -0.95, 1.9);
    var tm = new THREE.Mesh(tg, new THREE.MeshBasicMaterial({ map: tt.t, transparent: true, depthWrite: false }));
    tm.position.set(x, TKH - 1.45, TKZ); root.add(tm);
  });
  run([[-12, 1.1, -7.6], [-12, 1.1, -6.6], [4.8, 1.1, -6.6], [4.8, 5.4, -6.6], [4.8, 5.4, 9], [1.6, 5.4, 9], [1.6, 3.6, 9]], 0.26, M.liquid, { tip: 'Liquid product to the loading bay', cast: false });
  [-6, 0].forEach(function (x) { seg(V(x, 1.1, -7.6), V(x, 1.1, -6.6), 0.26, M.liquid, { seg: 10, cast: false }); });
  for (var rz = -4; rz <= 6; rz += 5) { bx(0.3, 5.2, 0.3, 4.8, 0.3, rz, M.steelD, { cast: false, nopick: true }); }

  /* truck loading bay (part of trucks) */
  unit('trucks');
  [[-8, 5.6], [6, 5.6], [-8, 12.4], [6, 12.4]].forEach(function (p) { bx(0.45, 5.6, 0.45, p[0], 0.3, p[1], M.light); });
  bx(14.8, 0.6, 7.6, -1, 5.6, 9, M.navy, { tip: 'Truck loading bay' });
  bx(14.6, 0.3, 7.4, -1, 6.2, 9, M.white, { tip: 'Truck loading bay' });

  /* pipeline (company, navy) */
  unit('pipeline');
  var PLY = 1.7, PLR = 0.42;
  var PL_TRUNK = [[CBX + 2.5, PLY, -1.2], [20, PLY, -1.2]];
  var PL_STEEL = [[20, PLY, -1.2], [44, PLY, -1.2], [44, PLY, -6], [52.8, PLY, -6]];
  var PL_FAB = [[20, PLY, -1.2], [20, PLY, -13], [30, PLY, -13], [30, PLY, -17.6]];
  var PL_REF = [[31, PLY, -1.2], [31, PLY, 6.2]];
  [PL_TRUNK, PL_STEEL, PL_FAB, PL_REF].forEach(function (P) {
    run(P, PLR, M.navy, { seg: 14 });
    for (var i = 1; i < P.length; i++) {
      var a = toV(P[i - 1]), b = toV(P[i]), L = a.distanceTo(b), n = Math.floor(L / 5.5);
      for (var k = 1; k <= n; k++) {
        var t = k / (n + 1), x = a.x + (b.x - a.x) * t, z = a.z + (b.z - a.z) * t, alongX = Math.abs(b.x - a.x) > Math.abs(b.z - a.z);
        bx(0.32, PLY - PLR, 0.32, x, 0.12, z, M.steelL, { cast: false });
        bx(alongX ? 0.4 : 1.3, 0.2, alongX ? 1.3 : 0.4, x, PLY - PLR - 0.2, z, M.steelL, { cast: false });
      }
    }
  });
  bx(1.6, 1.6, 1.6, 31, 0.3, 6.6, M.navy, { tip: 'Pipeline meter station' });
  bx(1.4, 1.4, 1.4, 30, 0.3, -17.3, M.navy, { tip: 'Pipeline meter station' });

  /* ================================================================ CUSTOMERS (neutral) */
  /* semiconductor fab */
  unit('fab');
  bx(22, 6, 13, 36, 0.3, -24.5, M.wall);
  bx(22.2, 0.9, 13.2, 36, 3.1, -24.5, M.steelL, { cast: false });
  bx(22.4, 0.45, 13.4, 36, 6.3, -24.5, M.roof);
  for (var fr = 0; fr < 2; fr++) for (var fc = 0; fc < 4; fc++) bx(2.4, 1.3, 2.2, 28.5 + fc * 5, 6.75, -27.5 + fr * 5.5, M.steelL);
  for (var fs = 0; fs < 4; fs++) vcyl(29 + fs * 4.6, 6.75, -30, 0.42, 4.2, M.steelD, { seg: 12 });
  bx(8, 4, 6, 51, 0.3, -22, M.wall); bx(8.2, 0.35, 6.2, 51, 4.3, -22, M.roof);

  /* steel mill */
  unit('steel');
  vcyl(56, 0.3, -6, 3.4, 2.6, M.steelL, { seg: 28 });
  vcyl(56, 2.9, -6, 2.8, 10.5, M.wall, { seg: 28, taper: 0.7 });
  vcyl(56, 13.4, -6, 1.5, 2.2, M.steelL, { seg: 20 });
  vcyl(56, 15.6, -6, 0.7, 1.6, M.steelL, { seg: 14 });
  seg(V(56, 14.6, -6), V(51, 9.6, -12), 0.4, M.steelL, { seg: 10 });
  vcyl(51, 0.3, -12, 1.3, 7, M.steelL, { seg: 18 }); vcyl(51, 7.3, -12, 1.3, 1.6, M.steelL, { seg: 18, taper: 0.2 });
  [-10.8, -6.5, -2.2].forEach(function (z) { vcyl(62, 0.3, z, 1.45, 10, M.wall, { seg: 20 }); dome(62, 10.3, z, 1.45, 1.2, M.wall); });
  vcyl(65, 0.3, -14, 0.95, 21, M.wall, { seg: 18, taper: 0.66 });
  vcyl(65, 18, -14, 0.72, 1, M.steelD, { seg: 18, taper: 0.95 });
  bx(19, 5.5, 6.4, 56, 0.3, 5.4, M.wall); prism(6.8, 2.2, 19.2, 56, 5.8, 5.4, M.roof, { alongX: true });
  bx(7, 3.4, 5, 49, 0.3, -1.4, M.wall); bx(7.2, 0.3, 5.2, 49, 3.7, -1.4, M.roof);

  /* refinery and chemicals */
  unit('refinery');
  [[29, 10, 1.2, 18], [32.6, 10, 1.5, 14], [36.2, 10, 0.95, 12]].forEach(function (c) {
    vcyl(c[0], 0.3, c[1], c[2], c[3], M.wall, { seg: 20 });
    dome(c[0], 0.3 + c[3], c[1], c[2], c[2] * 0.6, M.wall);
    for (var y = 4; y < c[3]; y += 4.2) vcyl(c[0], y, c[1], c[2] + 0.35, 0.18, M.steelL, { seg: 20, cast: false });
  });
  [[41.5, 14.2, 2.8, 3.6], [41, 7.6, 2.2, 3], [30.5, 15.6, 2.4, 3.2]].forEach(function (t) {
    vcyl(t[0], 0.3, t[1], t[2], t[3], M.wall, { seg: 28 }); vcyl(t[0], 0.3 + t[3], t[1], t[2] + 0.05, 0.25, M.roof, { seg: 28, cast: false });
  });
  for (var px = 27; px <= 38; px += 3.6) bx(0.3, 3.6, 0.3, px, 0.3, 12.8, M.steelD, { cast: false });
  bx(11.6, 0.25, 1.4, 32.5, 3.9, 12.8, M.steelD, { cast: false });
  [-0.4, 0.4].forEach(function (dz) { hcyl(32.5, 4.4, 12.8 + dz, 0.2, 11.6, 'x', M.steelL, { seg: 8, cast: false }); });

  /* hospital (white, red cross) */
  unit('hospital');
  bx(12, 10, 8, 15, 0.3, 33, M.white);
  [3, 6, 9].forEach(function (y) { bx(12.1, 0.9, 8.1, 15, y - 0.9, 33, M.roof, { cast: false }); });
  bx(12.4, 0.35, 8.4, 15, 10.3, 33, M.light);
  bx(6.5, 5, 10, 24.2, 0.3, 33.5, M.white); bx(6.7, 0.3, 10.2, 24.2, 5.3, 33.5, M.light);
  vcyl(24.2, 5.6, 33.5, 2.2, 0.06, M.roof, { seg: 28, cast: false });
  bx(3.4, 3.4, 0.4, 15, 10.6, 36.3, M.white);
  bx(2.4, 0.75, 0.14, 15, 11.92, 36.55, M.red, { cast: false });
  bx(0.75, 2.4, 0.14, 15, 11.1, 36.55, M.red, { cast: false });
  bx(4, 0.25, 2, 15, 3.2, 28.2, M.light);

  /* food and beverage */
  unit('food');
  bx(14, 6.5, 9, 43, 0.3, 33.5, M.wall); bx(14.3, 0.4, 9.3, 43, 6.8, 33.5, M.roof);
  [[52.6, 31.2], [55.8, 31.2], [52.6, 35.4], [55.8, 35.4]].forEach(function (s) {
    vcyl(s[0], 0.3, s[1], 1.45, 9, M.wall, { seg: 20 }); vcyl(s[0], 9.3, s[1], 1.45, 1.6, M.steelL, { seg: 20, taper: 0.15 });
  });
  bx(5, 1.5, 6.2, 54.2, 10.2, 33.3, M.light);
  bx(5.2, 0.25, 6.4, 54.2, 11.7, 33.3, M.roof, { cast: false });
  bx(2.4, 1.2, 1.2, 50.6, 7.2, 33.3, M.light, { cast: false });
  bx(1.6, 0.9, 1.2, 51.6, 8.4, 33.3, M.light, { cast: false });
  bx(3.6, 3.4, 0.15, 43, 0.3, 38.05, M.steelL, { cast: false });

  /* metal fabrication workshop */
  unit('workshop');
  bx(12, 4.6, 8, 28, 0.3, 45, M.wall);
  for (var sw = 0; sw < 3; sw++) prism(4, 1.8, 8, 24 + sw * 4, 4.9, 45, M.roof, { saw: true });
  bx(0.15, 3.4, 3.6, 21.95, 0.3, 45, M.steelD, { cast: false });
  [[33.6, 49.6], [34.6, 49.6]].forEach(function (p, i) { bx(4.6, 0.35, 0.35, 30.5, 0.3 + i * 0.36, p[1], M.steelD, { cast: false }); });

  /* rocket on a launch pad */
  unit('rocket');
  vcyl(82, 0, -42, 7, 0.6, M.pad, { seg: 40, cast: false });
  bx(4, 0.8, 8, 82, 0.6, -42, M.light);
  bx(1.8, 18, 1.8, 85.4, 0.6, -42, M.steelD);
  [6, 11, 15.5].forEach(function (y) { bx(2.2, 0.3, 0.5, 84, y, -42, M.steelD, { cast: false }); });
  vcyl(82, 1.4, -42, 0.95, 12.5, M.white, { seg: 24 });
  vcyl(82, 8.4, -42, 0.98, 0.6, M.steelD, { seg: 24, cast: false });
  vcyl(82, 13.9, -42, 0.95, 2.6, M.white, { seg: 24, taper: 0 });
  [0, 1, 2, 3].forEach(function (i) { var a = i * Math.PI / 2; bx(0.12, 1.8, 1.1, 82 + Math.cos(a) * 1.1, 1.4, -42 + Math.sin(a) * 1.1, M.steelD, { rot: [0, -a, 0], cast: false }); });
  vcyl(82, 0.6, -42, 0.7, 0.8, M.steelD, { seg: 16, taper: 1.3, cast: false });

  /* company tanks at truck-served customers (navy band = company asset) */
  function custTank(x, z, r, h, u, tip) {
    unit(u);
    vcyl(x, 0.3, z, r, h, M.white, { seg: 20, tip: tip });
    vcyl(x, h - 1, z, r + 0.04, 0.7, M.navy, { seg: 20, cast: false, tip: tip });
    dome(x, h + 0.3, z, r, r * 0.45, M.white, { tip: tip });
  }
  custTank(7.2, 29.6, 0.95, 4.6, 'hospital', 'Medical oxygen tank, refilled by truck');
  custTank(34.6, 29.4, 0.9, 4.2, 'food', 'CO2 and nitrogen tank, refilled by truck');
  custTank(76, -48, 1.3, 5.4, 'rocket', 'Liquid oxygen for launches');

  /* ================================================================ CYLINDER DEPOT */
  unit('cylinders');
  bx(10, 5, 6, -24, 0.3, 30.8, M.white);
  bx(10.3, 0.6, 6.3, -24, 4.9, 30.8, M.navy);
  bx(10, 0.25, 6, -24, 5.5, 30.8, M.pad);
  [-26.4, -21.6].forEach(function (x) { bx(2.8, 3.2, 0.15, x, 0.3, 33.85, M.light, { cast: false }); });
  var CYL = [], CAP = [];
  function rack(x0, z0, nx, nz) {
    bx(nx * 0.7 + 0.4, 0.2, nz * 0.7 + 0.4, x0 + (nx - 1) * 0.35, 0.3, z0 + (nz - 1) * 0.35, M.steelD, { cast: false });
    for (var i = 0; i < nx; i++) for (var j = 0; j < nz; j++) {
      var x = x0 + i * 0.7, z = z0 + j * 0.7;
      CYL.push([x, 1.3, z, 0.27, 1.6, 0.27, 0]); CAP.push([x, 2.1, z, 0.27, 0.27, 0.27, 0]);
    }
    bx(0.12, 1.9, nz * 0.7 + 0.4, x0 - 0.45, 0.5, z0 + (nz - 1) * 0.35, M.steelD, { cast: false });
  }
  rack(-30.6, 35.2, 5, 5); rack(-20.6, 35.2, 5, 5);
  /* cylinders outside the workshop (delivered) */
  unit('workshop');
  for (var wc = 0; wc < 6; wc++) { CYL.push([34.6 + (wc % 3) * 0.7, 1.3, 41.6 + Math.floor(wc / 3) * 0.7, 0.27, 1.6, 0.27, 0]); CAP.push([34.6 + (wc % 3) * 0.7, 2.1, 41.6 + Math.floor(wc / 3) * 0.7, 0.27, 0.27, 0.27, 0]); }
  unit('cylinders');
  var cylGeo = new THREE.CylinderGeometry(1, 1, 1, 12), capGeo = new THREE.SphereGeometry(1, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2);
  instanced(cylGeo, M.light, CYL, { cast: true, tip: 'Packaged gas cylinders' });
  instanced(capGeo, M.navy, CAP, { tip: 'Packaged gas cylinders' });

  /* ================================================================ HQ */
  unit('hq');
  var HQX = -58, HQZ = -30;
  bx(13, 11, 9, HQX, 0.3, HQZ, M.white);
  [2.6, 5.6, 8.6].forEach(function (y) { bx(13.1, 1.4, 9.1, HQX, y, HQZ, M.navy, { cast: false }); });
  bx(13.5, 0.45, 9.5, HQX, 11.3, HQZ, M.light);
  bx(3, 1.2, 2.4, HQX - 2, 11.75, HQZ - 1, M.light, { cast: false });
  bx(2.2, 0.3, 4.4, HQX - 7.6, 3.2, HQZ, M.navy);
  [-1.8, 1.8].forEach(function (dz) { bx(0.25, 2.9, 0.25, HQX - 8.4, 0.3, HQZ + dz, M.light, { cast: false }); });
  vcyl(HQX - 5, 0.3, HQZ + 7.5, 0.08, 7.5, M.steelD, { seg: 6, cast: false });
  bx(2, 1.3, 0.05, HQX - 4, 6.4, HQZ + 7.5, M.navy, { cast: false });
  for (var pk = 0; pk < 5; pk++) bx(2.2, 0.02, 0.18, HQX - 4 + pk * 2.6, 0.31, HQZ + 8.2, mat(0xFFFFFF, { r: 0.9 }), { cast: false, nopick: true });

  /* ================================================================ NEW PLANT (construction) */
  unit('newplant');
  var NPX = -38, NPZ = -32;
  var colX = [-42.5, -39, -35.5, -32], colZ = [-35.5, -32, -28.5];
  colX.forEach(function (x) { colZ.forEach(function (z) { bx(0.28, 12, 0.28, x, 0.3, z, M.steelL, { cast: false }); }); });
  [4.3, 8.3, 12.3].forEach(function (y) {
    colZ.forEach(function (z) { bx(10.8, 0.24, 0.24, -37.25, y - 0.12, z, M.steelL, { cast: false }); });
    colX.forEach(function (x) { bx(0.24, 0.24, 7.3, x, y - 0.12, -32, M.steelL, { cast: false }); });
  });
  bx(10.6, 0.2, 7, -37.25, 4.2, -32, M.pad, { cast: false });
  /* partial cold box */
  var NCX = -23.5;
  bx(6.4, 0.5, 6.4, NCX, 0.3, NPZ, M.light);
  bx(5, 10, 5, NCX, 0.8, NPZ, M.white);
  [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(function (c) { bx(0.32, 18.5, 0.32, NCX + c[0] * 2.45, 0.8, NPZ + c[1] * 2.45, M.navy, { cast: false }); });
  bx(5.12, 0.3, 5.12, NCX, 8.8, NPZ, M.navy, { cast: false });
  [14.2, 19.1].forEach(function (y) {
    [-1, 1].forEach(function (s) { bx(5.2, 0.24, 0.3, NCX, y, NPZ + s * 2.45, M.navy, { cast: false }); bx(0.3, 0.24, 5.2, NCX + s * 2.45, y, NPZ, M.navy, { cast: false }); });
  });
  /* tower crane */
  var KX = -30, KZ = -25, KH = 19;
  bx(3, 0.8, 3, KX, 0.3, KZ, M.light);
  [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(function (c) { bx(0.2, KH, 0.2, KX + c[0] * 0.6, 1.1, KZ + c[1] * 0.6, M.navy, { cast: false }); });
  for (var ky = 1.1; ky < KH; ky += 2.2) {
    seg(V(KX - 0.6, ky, KZ + 0.6), V(KX + 0.6, ky + 2.2, KZ + 0.6), 0.06, M.navy, { seg: 4, cast: false });
    seg(V(KX - 0.6, ky, KZ - 0.6), V(KX - 0.6, ky + 2.2, KZ + 0.6), 0.06, M.navy, { seg: 4, cast: false });
  }
  var JY = KH + 1.1;
  bx(1.6, 1.2, 1.6, KX, JY, KZ, M.white);
  bx(1.3, 1, 1.3, KX + 1.2, JY - 1.1, KZ + 0.9, M.white, { cast: false });
  bx(23, 0.22, 0.22, KX + 11.5, JY + 0.2, KZ - 0.45, M.navy);
  bx(23, 0.22, 0.22, KX + 11.5, JY + 0.2, KZ + 0.45, M.navy);
  bx(23, 0.2, 0.2, KX + 11.5, JY + 1.25, KZ, M.navy, { cast: false });
  for (var jx = 0; jx < 22; jx += 2) { seg(V(KX + 1 + jx, JY + 0.3, KZ), V(KX + 2 + jx, JY + 1.3, KZ), 0.05, M.navy, { seg: 4, cast: false }); seg(V(KX + 2 + jx, JY + 1.3, KZ), V(KX + 3 + jx, JY + 0.3, KZ), 0.05, M.navy, { seg: 4, cast: false }); }
  bx(8, 0.3, 1, KX - 4.6, JY + 0.2, KZ, M.navy);
  bx(2.2, 1.8, 1.6, KX - 7.4, JY - 1.2, KZ, M.light);
  seg(V(KX, JY + 1.5, KZ), V(KX, JY + 4.2, KZ), 0.14, M.navy, { seg: 6 });
  seg(V(KX, JY + 4.2, KZ), V(KX + 16, JY + 1.3, KZ), 0.04, M.steelD, { seg: 4, cast: false });
  seg(V(KX, JY + 4.2, KZ), V(KX - 8, JY + 0.6, KZ), 0.04, M.steelD, { seg: 4, cast: false });
  seg(V(KX + 15, JY + 0.2, KZ), V(KX + 15, 10.6, KZ), 0.035, M.steelD, { seg: 4, cast: false });
  bx(4.5, 0.4, 0.4, KX + 15, 10.2, KZ, M.steelL);
  /* materials laydown */
  for (var bi = 0; bi < 4; bi++) bx(6, 0.35, 0.35, -44, 0.3 + bi * 0.36, -39 + (bi % 2) * 0.4, M.steelL, { cast: false });

  /* ================================================================ RING (trucking radius) */
  unit('ring');
  var RCX = -22, RCZ = 0, RR = 90;
  var RD = [], nd = Math.round(2 * Math.PI * RR / 5.4);
  for (var di = 0; di < nd; di++) { var a = di / nd * Math.PI * 2; RD.push([RCX + Math.cos(a) * RR, 0.16, RCZ + Math.sin(a) * RR, 0.5, 0.06, 2.9, -a]); }
  instanced(gBox(), M.ring, RD, { tip: 'Trucking radius: liquid deliveries pay within about 150 miles' });

  /* ================================================================ TREES (model style) */
  CUR = null;
  var BLOCK = [[-60, 10, -19, 20], [-52, -10, -45, -20], [-68, -48, -43, -17], [-33, -15, 26, 42], [5, 30, 26, 41], [32, 60, 26, 41], [19, 37, 38, 52],
    [22, 50, 2, 21], [21, 56, -35, -14], [43, 70, -19, 11], [66, 92, -52, -30], [-112, -50, -13, -3], [-76, 75, 17.5, 26.5], [-27, 22, 42, 50], [68, 77, -40, 30], [-74, -66, -34, 26]];
  function free(x, z) { for (var i = 0; i < BLOCK.length; i++) { var b = BLOCK[i]; if (x > b[0] && x < b[1] && z > b[2] && z < b[3]) return false; } return true; }
  var TREE = [], TRK = [], seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  function tree(x, z, s) { if (!free(x, z)) return; s = s || (0.8 + rnd() * 0.35); TREE.push([x, 1.25 * s + 1, z, 1.1 * s, 1.15 * s, 1.1 * s, 0]); TRK.push([x, 0.6, z, 0.14, 1.2, 0.14, 0]); }
  for (var tx = -66; tx <= 64; tx += 9) { tree(tx + rnd() * 2, 15.6); tree(tx + 4 + rnd() * 2, 28.6); }
  for (var tz = -44; tz <= 12; tz += 8) { tree(-77 + rnd() * 1.5, tz); }
  for (var tx2 = -26; tx2 <= 14; tx2 += 8) tree(tx2 + rnd(), 51.6);
  [[-56, 32], [-50, 38], [-44, 32], [-38, 38], [-62, 38], [-12, 32], [-6, 37], [0, 32], [58, 38], [60, 31], [40, 44], [47, 44], [-46, -46], [-38, -46], [-30, -46], [-20, -46]].forEach(function (p) { tree(p[0], p[1]); });
  instanced(gSph(10), M.tree, TREE, { cast: true, nopick: true, unit: null });
  instanced(gCyl(6), M.trunk, TRK, { nopick: true, unit: null });

  /* ================================================================ FLOWS */
  var TEXC = {};
  function dotTex(hex) {
    if (TEXC[hex]) return TEXC[hex];
    var c = document.createElement('canvas'); c.width = c.height = 64; var x = c.getContext('2d');
    x.beginPath(); x.arc(32, 32, 31, 0, Math.PI * 2); x.fillStyle = 'rgba(60,40,25,0.22)'; x.fill();
    x.beginPath(); x.arc(32, 32, 28, 0, Math.PI * 2); x.fillStyle = '#FFFFFF'; x.fill();
    x.beginPath(); x.arc(32, 32, 19.5, 0, Math.PI * 2); x.fillStyle = hex; x.fill();
    var t = new THREE.CanvasTexture(c); TEXC[hex] = t; return t;
  }
  var KMAT = {};
  Object.keys(FL).forEach(function (k) {
    KMAT[k] = new THREE.PointsMaterial({ size: 2, map: dotTex(FL[k].c), transparent: true, depthWrite: false, alphaTest: 0.04, sizeAttenuation: true });
  });
  var FLOWS = [], NPART = 0, MAXPART = 460, EXTRA = { air: [], gas: [], energy: [], cash: [], passthru: [], liquid: [] };
  var ON = { air: true, gas: true, energy: true, cash: false, passthru: false, liquid: true };
  var tv = new THREE.Vector3(), tw = new THREE.Vector3();
  function Flow(P, kind, o) {
    o = o || {};
    this.kind = kind; this.r = o.r || 0.25; this.vm = o.vm || 1;
    this.P = P.map(function (p) { return toV(p).clone(); });
    this.cum = [0];
    for (var i = 1; i < this.P.length; i++) this.cum.push(this.cum[i - 1] + this.P[i].distanceTo(this.P[i - 1]));
    this.L = Math.max(0.01, this.cum[this.cum.length - 1]);
    var n = o.n || Math.max(2, Math.round(this.L * (o.dens || 0.2)));
    n = Math.max(1, Math.min(n, MAXPART - NPART)); NPART += n;
    this.n = n; this.t = new Float32Array(n);
    for (var j = 0; j < n; j++) this.t[j] = (j + 0.35 * ((j * 7919) % 13) / 13) / n;
    this.pos = new Float32Array(n * 3);
    var g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    this.pts = new THREE.Points(g, KMAT[kind]); this.pts.frustumCulled = false; this.pts.renderOrder = 3;
    root.add(this.pts);
    this.v = FL[kind].v * this.vm / this.L;
    FLOWS.push(this);
  }
  Flow.prototype.place = function () {
    var cp = camera.position;
    for (var i = 0; i < this.n; i++) {
      var d = this.t[i] * this.L, k = 1;
      while (k < this.cum.length - 1 && this.cum[k] < d) k++;
      var a = this.P[k - 1], b = this.P[k], sl = (this.cum[k] - this.cum[k - 1]) || 1, u = (d - this.cum[k - 1]) / sl;
      tv.set(a.x + (b.x - a.x) * u, a.y + (b.y - a.y) * u, a.z + (b.z - a.z) * u);
      tw.set(b.x - a.x, b.y - a.y, b.z - a.z).normalize();
      var ox = cp.x - tv.x, oy = cp.y - tv.y, oz = cp.z - tv.z, dp = ox * tw.x + oy * tw.y + oz * tw.z;
      var fx = ox - dp * tw.x, fy = oy - dp * tw.y, fz = oz - dp * tw.z, fl = Math.sqrt(fx * fx + fy * fy + fz * fz) || 1, s = (this.r + 0.08) / fl;
      this.pos[i * 3] = tv.x + fx * s; this.pos[i * 3 + 1] = tv.y + fy * s; this.pos[i * 3 + 2] = tv.z + fz * s;
    }
    this.pts.geometry.attributes.position.needsUpdate = true;
  };
  Flow.prototype.step = function (dt) { for (var i = 0; i < this.n; i++) { this.t[i] += dt * this.v; if (this.t[i] >= 1) this.t[i] -= 1; } };

  /* air: outside air into the intake, then compressed air to the cold box */
  [[3.2, 3.6], [4.8, 6], [3.2, 8.4], [1.8, 6]].forEach(function (yz, i) {
    new Flow([[-70, yz[0] + 1.5, yz[1] + (i - 1.5) * 1.2], [-62, yz[0] + 0.6, yz[1]], [-55.2, yz[0], yz[1]]], 'air', { r: 0.1, dens: 0.24, vm: 0.9 + i * 0.07 });
  });
  new Flow([[-49.5, 3.5, 6], [-46, 3.5, 6]], 'air', { r: 1.25, n: 2 });
  new Flow([[-36, 5.3, 2.3], [-24.5, 5.3, 2.3]], 'air', { r: 0.36, n: 3 });
  /* energy: grid wire into the substation and along the bus into the compressor house */
  new Flow(WIRE[0].concat([V(GX, 9.4, GZ + 1), V(-49.5, 4.3, GZ), V(-48.5, 2.8, GZ), V(-43, 2.8, GZ), V(-43, 2.8, -1.5)]), 'energy', { r: 0.06, dens: 0.16 });
  new Flow(WIRE[3].slice(0, WIRE[3].length - 9), 'energy', { r: 0.06, dens: 0.1, vm: 1.05 });
  /* gas: pipeline to each on-site customer */
  new Flow(PL_TRUNK, 'gas', { r: PLR, dens: 0.2 });
  new Flow(PL_STEEL, 'gas', { r: PLR, dens: 0.2 });
  new Flow(PL_FAB, 'gas', { r: PLR, dens: 0.2 });
  new Flow(PL_REF, 'gas', { r: PLR, dens: 0.3 });
  /* liquid: storage tanks to the loading bay */
  new Flow([[-12, 1.1, -6.6], [4.8, 1.1, -6.6], [4.8, 5.4, -6.6], [4.8, 5.4, 9], [1.6, 5.4, 9], [1.6, 3.6, 9]], 'liquid', { r: 0.26, dens: 0.2 });
  new Flow([[CBX + 2.9, CBH - 1.2, -6], [-12, CBH - 1.2, -6], [-12, 12.2, -6]], 'liquid', { r: 0.22, dens: 0.18 });

  /* raised arcs: cash back to HQ, energy cost passed through to customers */
  function arcPath(a, b, H, n) {
    var A = toV(a), B = toV(b), cy = 2 * H - (A.y + B.y) / 2, C = V((A.x + B.x) / 2, cy, (A.z + B.z) / 2), out = [];
    for (var i = 0; i <= n; i++) { var t = i / n, u = 1 - t; out.push(V(u * u * A.x + 2 * u * t * C.x + t * t * B.x, u * u * A.y + 2 * u * t * C.y + t * t * B.y, u * u * A.z + 2 * u * t * C.z + t * t * B.z)); }
    return out;
  }
  var tubeCache = {};
  function arcTube(P, color, kind, unitKey, tip) {
    var curve = new THREE.CatmullRomCurve3(P);
    var mtl = tubeCache[kind] || (tubeCache[kind] = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.32, depthWrite: false }));
    var me = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.16, 6, false), mtl);
    me.renderOrder = 2; root.add(me); EXTRA[kind].push(me);
    if (unitKey) { ensureUnit(unitKey); me.userData.unit = unitKey; me.userData.tip = tip; PICK.push(me); UN[unitKey].meshes.push(me); }
    return me;
  }
  var HQTOP = V(-58, 12.2, -30);
  var CUST_TOPS = {
    fab: V(36, 6.8, -24.5), steel: V(56, 15.8, -6), refinery: V(32.6, 14.5, 10), hospital: V(15, 10.8, 33),
    food: V(43, 7.3, 33.5), workshop: V(28, 6.8, 45), rocket: V(82, 16.6, -42)
  };
  var PASS_FROM = V(-41, 7.7, 4), PASS_APEX = null;
  Object.keys(CUST_TOPS).forEach(function (k) {
    var P = arcPath(CUST_TOPS[k], HQTOP, 26 + CUST_TOPS[k].distanceTo(HQTOP) * 0.1, 34);
    arcTube(P, 0x2E7D4F, 'cash', 'hq', 'Cash from ' + NAMES[k].toLowerCase() + ' back to the company');
    EXTRA.cash.push(new Flow(P, 'cash', { r: 0.18, dens: 0.085 }).pts);
  });
  ['fab', 'steel', 'refinery', 'hospital', 'food'].forEach(function (k) {
    var P = arcPath(PASS_FROM, CUST_TOPS[k], 17 + PASS_FROM.distanceTo(CUST_TOPS[k]) * 0.04, 30);
    arcTube(P, 0x1A1A1A, 'passthru', 'passthru', 'Energy cost passed through to ' + NAMES[k].toLowerCase());
    new Flow(P, 'passthru', { r: 0.18, dens: 0.075 });
    if (k === 'refinery') PASS_APEX = P[15].clone();
  });
  FLOWS.forEach(function (f) { f.place(); });

  /* ================================================================ TRUCKS */
  var MOVERS = [];
  var glassDark = mat(0x3E3229, { r: 0.3, m: 0.3 });
  function wheels(g, xs, u) { xs.forEach(function (x) { hcyl(x, 0.55, 0, 0.55, 2.3, 'z', M.dark, { parent: g, unit: u, seg: 14, cast: false, dyn: false }); }); }
  function makeTanker() {
    var g = new THREE.Group(); root.add(g);
    var u = 'trucks', tip = 'Bulk liquid tanker truck';
    bx(2.3, 2.5, 2.4, 3.55, 0.6, 0, M.navy, { parent: g, unit: u, tip: tip });
    bx(0.12, 1, 2.0, 4.72, 1.85, 0, glassDark, { parent: g, unit: u, tip: tip, cast: false });
    bx(9.2, 0.4, 1.8, -0.1, 0.5, 0, M.steelD, { parent: g, unit: u, tip: tip, cast: false });
    hcyl(-1.1, 2.05, 0, 1.08, 5.6, 'x', M.white, { parent: g, unit: u, tip: tip, seg: 20 });
    sph(-3.9, 2.05, 0, 1.08, M.white, { parent: g, unit: u, tip: tip, sy: 1, seg: 16 });
    sph(1.7, 2.05, 0, 1.08, M.white, { parent: g, unit: u, tip: tip, seg: 16 });
    hcyl(-1.1, 2.05, 0, 1.11, 0.5, 'x', M.liquid, { parent: g, unit: u, tip: tip, seg: 20, cast: false });
    wheels(g, [3.5, -2.2, -3.4], u);
    return g;
  }
  function makeFlatbed() {
    var g = new THREE.Group(); root.add(g);
    var u = 'cylinders', tip = 'Flatbed delivering gas cylinders';
    bx(2, 2.3, 2.2, 2.6, 0.6, 0, M.navy, { parent: g, unit: u, tip: tip });
    bx(0.12, 0.9, 1.8, 3.62, 1.7, 0, glassDark, { parent: g, unit: u, tip: tip, cast: false });
    bx(5, 0.35, 2.2, -1.2, 0.9, 0, M.steelD, { parent: g, unit: u, tip: tip });
    for (var i = 0; i < 4; i++) for (var j = 0; j < 2; j++) {
      vcyl(-3 + i * 1.1, 1.25, -0.5 + j * 1, 0.3, 1.5, M.light, { parent: g, unit: u, tip: tip, seg: 10, cast: false });
      dome(-3 + i * 1.1, 2.75, -0.5 + j * 1, 0.3, 0.3, M.navy, { parent: g, unit: u, tip: tip, cast: false });
    }
    wheels(g, [2.4, -2.4], u);
    return g;
  }
  function Mover(obj, loop, speed, phase) {
    this.o = obj; this.P = loop.map(function (p) { return V(p[0], 0.12, p[1]); });
    this.P.push(this.P[0].clone());
    this.cum = [0]; for (var i = 1; i < this.P.length; i++) this.cum.push(this.cum[i - 1] + this.P[i].distanceTo(this.P[i - 1]));
    this.L = this.cum[this.cum.length - 1]; this.v = speed; this.d = phase * this.L;
    MOVERS.push(this); this.update(0);
  }
  Mover.prototype.at = function (d, out) {
    d = ((d % this.L) + this.L) % this.L; var k = 1;
    while (k < this.cum.length - 1 && this.cum[k] < d) k++;
    var a = this.P[k - 1], b = this.P[k], u = (d - this.cum[k - 1]) / ((this.cum[k] - this.cum[k - 1]) || 1);
    return out.set(a.x + (b.x - a.x) * u, 0.12, a.z + (b.z - a.z) * u);
  };
  var mA = new THREE.Vector3(), mB = new THREE.Vector3(), mC = new THREE.Vector3();
  Mover.prototype.update = function (dt) {
    this.d = (this.d + dt * this.v) % this.L;
    this.at(this.d, mC); this.at(this.d - 2.2, mA); this.at(this.d + 2.2, mB);
    this.o.position.copy(mC);
    this.o.rotation.y = Math.atan2(-(mB.z - mA.z), mB.x - mA.x);
  };
  function arcXZ(cx, cz, r, a0, a1, n) { var out = []; for (var i = 0; i <= n; i++) { var a = a0 + (a1 - a0) * i / n; out.push([cx + r * Math.cos(a), cz + r * Math.sin(a)]); } return out; }
  var TLOOP = [[-6, 12.5], [-5.2, 9.9], [-3.5, 9.1], [2.5, 9.1], [4, 9.8], [4.4, 11.5], [4.4, 19.5], [5.2, 22.3], [7, 23.4],
    [8.4, 23.6], [9.4, 24.8], [10.8, 26.3], [19.2, 26.3], [20.6, 24.8], [21.6, 23.6], [23, 23.4],
    [35.4, 23.4], [36.8, 23.6], [37.6, 24.8], [39, 26.3], [47, 26.3], [48.4, 24.8], [49.2, 23.6], [50.6, 23.4],
    [65.5, 23.4], [67.6, 24.6]].concat(arcXZ(72, 22, 4.2, 2.6, -2.6, 16)).concat([[67.6, 19.4], [65.5, 20.6],
    [-2.5, 20.6], [-4.8, 20], [-6, 18.2]]);
  for (var ti2 = 0; ti2 < 4; ti2++) new Mover(makeTanker(), TLOOP, 9, ti2 / 4 + 0.03);
  function outBack(C, lane, rt) {
    var off = function (P) {
      return P.map(function (p, i) {
        var a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)], dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz) || 1;
        return [p[0] - dz / l * lane, p[1] + dx / l * lane];
      });
    };
    var turn = function (E, D) {
      var ang = Math.atan2(D[1], D[0]), out = [];
      for (var i = 0; i <= 10; i++) { var a = ang + Math.PI / 2 - i / 10 * Math.PI; out.push([E[0] + Math.cos(a) * rt + D[0] * rt * 0.4 * Math.sin(i / 10 * Math.PI), E[1] + Math.sin(a) * rt + D[1] * rt * 0.4 * Math.sin(i / 10 * Math.PI)]); }
      return out;
    };
    var R = C.slice().reverse(), n = C.length;
    var d1 = [C[n - 1][0] - C[n - 2][0], C[n - 1][1] - C[n - 2][1]], l1 = Math.hypot(d1[0], d1[1]); d1 = [d1[0] / l1, d1[1] / l1];
    var d0 = [C[0][0] - C[1][0], C[0][1] - C[1][1]], l0 = Math.hypot(d0[0], d0[1]); d0 = [d0[0] / l0, d0[1] / l0];
    return off(C).concat(turn(C[n - 1], d1)).concat(off(R)).concat(turn(C[0], d0));
  }
  new Mover(makeFlatbed(), outBack([[-24, 39.6], [-24, 44.8], [-22.8, 46], [19, 46]], 1.2, 2.6), 6, 0.2);


  /* ================================================================ MERGE STATIC MESHES
     Bake static meshes that share unit + material + tooltip into one geometry each,
     cutting draw calls by ~5x. Picking, tooltips and highlight keep working per unit. */
  (function mergeStatic() {
    var NI = {}, groups = {}, order = [];
    root.children.slice().forEach(function (me) {
      if (!me.isMesh || me.isInstancedMesh || me === ground) return;
      var m = me.material; if (!m || m.transparent || m.map) return;
      var key = (me.userData.unit || '_') + '|' + m.uuid + '|' + (me.userData.tip || '') + '|' + (me.castShadow ? 1 : 0) + (me.receiveShadow ? 1 : 0);
      if (!groups[key]) { groups[key] = []; order.push(key); }
      groups[key].push(me);
    });
    var nm = new THREE.Matrix3(), pv = new THREE.Vector3(), nv = new THREE.Vector3();
    order.forEach(function (key) {
      var list = groups[key]; if (list.length < 2) return;
      var parts = list.map(function (me) {
        var g = me.geometry, u = g.uuid;
        if (!NI[u]) NI[u] = g.index ? g.toNonIndexed() : g;
        return NI[u];
      });
      var total = 0; parts.forEach(function (g) { total += g.attributes.position.count; });
      var pos = new Float32Array(total * 3), nor = new Float32Array(total * 3), off = 0;
      list.forEach(function (me, i) {
        var g = parts[i], P = g.attributes.position, N = g.attributes.normal;
        me.updateMatrix(); nm.getNormalMatrix(me.matrix);
        for (var j = 0; j < P.count; j++) {
          pv.fromBufferAttribute(P, j).applyMatrix4(me.matrix);
          nv.fromBufferAttribute(N, j).applyMatrix3(nm).normalize();
          pos[off] = pv.x; pos[off + 1] = pv.y; pos[off + 2] = pv.z;
          nor[off] = nv.x; nor[off + 1] = nv.y; nor[off + 2] = nv.z; off += 3;
        }
      });
      var mg = new THREE.BufferGeometry();
      mg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      mg.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
      mg.computeBoundingSphere(); mg.computeBoundingBox();
      var f = list[0], mm = new THREE.Mesh(mg, f.material);
      mm.castShadow = f.castShadow; mm.receiveShadow = f.receiveShadow;
      mm.matrixAutoUpdate = false; mm.updateMatrix();
      root.add(mm);
      var u = f.userData.unit;
      if (u) {
        mm.userData.unit = u; if (f.userData.tip) mm.userData.tip = f.userData.tip;
        PICK.push(mm);
        UN[u].meshes = UN[u].meshes.filter(function (x) { return list.indexOf(x) < 0; }); UN[u].meshes.push(mm);
      }
      list.forEach(function (me) { root.remove(me); var pi = PICK.indexOf(me); if (pi >= 0) PICK.splice(pi, 1); });
    });
  })();

  /* ================================================================ LABELS */
  var ANCH = {
    intake: V(-52, 7, 6), compressor: V(-41, 7.8, 4), coldbox: V(CBX, CBH + 1.6, CBZ), tanks: V(-6, TKH + 1.9, TKZ),
    pylons: V(-76, 16.6, PYZ), pipeline: V(8, PLY + 0.5, -1.2), trucks: V(13, 3.4, 22), cylinders: V(-24, 5.8, 30.8),
    ring: V(RCX + RR * Math.cos(0.42), 0.3, RCZ + RR * Math.sin(0.42)), fab: V(36, 6.9, -24.5), steel: V(56, 15.8, -6), refinery: V(29, 19.1, 10),
    hospital: V(15, 14.3, 36.3), food: V(54.2, 12.1, 33.3), rocket: V(82, 16.6, -42), workshop: V(28, 6.8, 45),
    hq: V(-58, 12, -30), newplant: V(NCX, 19.4, NPZ), passthru: PASS_APEX || V(0, 20, 0)
  };
  var layer = document.createElement('div'); layer.className = 'gs-layer';
  var tip = document.createElement('div'); tip.className = 'gs-tip';
  var LBL = {};
  ORDER.forEach(function (k) {
    var el = document.createElement('div'); el.className = 'gs-pill'; el.textContent = TEXT[k]; el.style.display = 'none';
    var st = document.createElement('div'); st.className = 'gs-stem'; st.style.display = 'none';
    var dt = document.createElement('div'); dt.className = 'gs-dot'; dt.style.display = 'none';
    layer.appendChild(st); layer.appendChild(dt); layer.appendChild(el);
    LBL[k] = { k: k, el: el, stem: st, dot: dt, w: 0, h: 0, a: ANCH[k], shown: false };
    el.setAttribute('role', 'button'); el.setAttribute('tabindex', '0');
    el.addEventListener('click', function (e) { e.stopPropagation(); pick(k); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(k); } });
  });

  /* ================================================================ STATE */
  var host = null, W = 0, H = 0, running = false, curStop = 'site', activeLabels = STOPS.site.labels.slice();
  var fly = null, userMoved = false, hiKey = null, lastT = 0, ro = null;
  var CAM = {};
  function camC(t, az, el, d) { return { t: t, p: V(t.x + d * Math.sin(az) * Math.cos(el), t.y + d * Math.sin(el), t.z + d * Math.cos(az) * Math.cos(el)) }; }
  CAM.site = camC(V(-8, 0, 5), -0.04, 0.98, 226);
  CAM.make = camC(V(-42, 7, -3), -0.33, 0.45, 96);
  CAM.deliver = camC(V(4, 0, 18), -0.06, 0.78, 150);
  CAM.buyers = camC(V(46, 4, 6), -0.14, 0.64, 128);
  CAM.money = camC(V(-12, 10, -6), -0.1, 0.64, 178);
  var BASE_ASPECT = 1020 / 690;
  function camFor(k) {
    var c = CAM[k] || CAM.site, a = camera.aspect || BASE_ASPECT, f = a < BASE_ASPECT ? Math.pow(BASE_ASPECT / a, 0.92) : 1;
    return { p: c.t.clone().add(c.p.clone().sub(c.t).multiplyScalar(f)), t: c.t.clone() };
  }
  function setCam(c) { camera.position.copy(c.p); controls.target.copy(c.t); controls.update(); }

  function applyFlows() {
    FLOWS.forEach(function (f) { f.pts.visible = !!ON[f.kind]; });
    Object.keys(EXTRA).forEach(function (k) { EXTRA[k].forEach(function (o) { o.visible = !!ON[k]; }); });
  }
  function setFlows(o) {
    if (!o) return;
    ['air', 'gas', 'energy', 'cash', 'passthru'].forEach(function (k) { if (o[k] !== undefined) ON[k] = !!o[k]; });
    ON.liquid = ON.gas;
    applyFlows();
  }

  /* highlight */
  var HIM = {};
  var GOLD = new THREE.Color(COL.gold);
  function hiMat(m) {
    var c = HIM[m.uuid]; if (c) return c;
    c = m.clone();
    if (c.emissive) { c.color = c.color.clone().lerp(GOLD, 0.42); c.emissive = GOLD.clone(); c.emissiveIntensity = 0.3; }
    else { c.color = GOLD.clone(); if (c.transparent) c.opacity = 0.75; }
    HIM[m.uuid] = c; return c;
  }
  function highlight(k) {
    if (k != null && !UN[k]) k = null;
    if (hiKey === k) return;
    if (hiKey) {
      UN[hiKey].meshes.forEach(function (me) { if (me.userData.m0) { me.material = me.userData.m0; me.userData.m0 = null; } });
      if (LBL[hiKey]) LBL[hiKey].el.classList.remove('gs-sel');
    }
    hiKey = k;
    if (k) {
      UN[k].meshes.forEach(function (me) { if (!me.userData.m0) { me.userData.m0 = me.material; me.material = hiMat(me.material); } });
      if (LBL[k]) LBL[k].el.classList.add('gs-sel');
    }
  }
  function pick(k) {
    highlight(k);
    if (opts.onPick) { try { opts.onPick(k); } catch (e) { setTimeout(function () { throw e; }); } }
  }

  /* ================================================================ LABEL PLACEMENT */
  var tmp = new THREE.Vector3();
  function measure(o) {
    var d = o.el.style.display; o.el.style.visibility = 'hidden'; o.el.style.display = '';
    o.w = o.el.offsetWidth; o.h = o.el.offsetHeight;
    o.el.style.display = d; o.el.style.visibility = '';
  }
  function measureAll() { Object.keys(LBL).forEach(function (k) { measure(LBL[k]); }); }
  function hideL(o) { if (o.shown) { o.el.style.display = 'none'; o.stem.style.display = 'none'; o.dot.style.display = 'none'; o.shown = false; } }
  function overlap(a, b, m) {
    var x = Math.min(a.x + a.w + m, b.x + b.w) - Math.max(a.x - m, b.x), y = Math.min(a.y + a.h + m, b.y + b.h) - Math.max(a.y - m, b.y);
    return x > 0 && y > 0 ? x * y : 0;
  }
  function labelKeys() { var ks = activeLabels.slice(); if (hiKey && LBL[hiKey] && ks.indexOf(hiKey) < 0) ks.push(hiKey); return ks; }
  function placeLabels() {
    var keys = labelKeys(), want = {};
    keys.forEach(function (k) { want[k] = 1; });
    Object.keys(LBL).forEach(function (k) { if (!want[k]) hideL(LBL[k]); });
    var anchors = [], placed = [];
    keys.forEach(function (k) {
      var o = LBL[k]; tmp.copy(o.a).project(camera);
      o.vis = tmp.z < 1 && tmp.z > -1 && Math.abs(tmp.x) < 1.02 && Math.abs(tmp.y) < 1.02;
      o.sx = (tmp.x * 0.5 + 0.5) * W; o.sy = (-tmp.y * 0.5 + 0.5) * H;
      if (o.vis) anchors.push({ x: o.sx - 7, y: o.sy - 7, w: 14, h: 14, k: k });
    });
    keys.forEach(function (k) {
      var o = LBL[k];
      if (!o.vis) { hideL(o); return; }
      if (!o.w) measure(o);
      if (!o.w) { hideL(o); return; }
      var w = o.w, h = o.h, best = null, bestScore = 1e18;
      var CAND = [[0, -1], [0, -2], [-1, -1], [1, -1], [0, 1], [-1, -2], [1, -2], [0, -3], [-1, 1], [1, 1], [0, 2], [-1, 0], [1, 0], [0, -4], [0, 3]];
      for (var ci = 0; ci < CAND.length; ci++) {
        var cx = CAND[ci][0], cy = CAND[ci][1], x, y;
        if (cy === 0) { x = cx < 0 ? o.sx - 18 - w : o.sx + 18; y = o.sy - h / 2; }
        else {
          x = o.sx - w / 2 + cx * (w / 2 + 16);
          y = cy < 0 ? o.sy - 22 - h - (-cy - 1) * (h + 12) : o.sy + 22 + (cy - 1) * (h + 12);
        }
        var cl = 0;
        if (x < 8) { cl += 8 - x; x = 8; } if (x + w > W - 8) { cl += x + w - (W - 8); x = W - 8 - w; }
        if (y < 8 || y + h > H - 8) continue;
        var r = { x: x, y: y, w: w, h: h }, ov = 0;
        for (var pi = 0; pi < placed.length; pi++) ov += overlap(r, placed[pi], 6);
        for (var ai = 0; ai < anchors.length; ai++) if (anchors[ai].k !== k) ov += overlap(r, anchors[ai], 2) * 4;
        var score = ov * 100 + ci * 30 + cl * 2;
        if (score < bestScore) { bestScore = score; best = r; best.cy = cy; }
        if (ov === 0 && cl < w / 2) break;
      }
      if (!best) {
        var yy = Math.max(8, Math.min(H - 8 - h, o.sy - 22 - h));
        best = { x: Math.max(8, Math.min(W - 8 - w, o.sx - w / 2)), y: yy, w: w, h: h };
      }
      placed.push(best);
      var ex = Math.max(best.x + 8, Math.min(best.x + w - 8, o.sx)), ey;
      if (best.y + h <= o.sy) ey = best.y + h; else if (best.y >= o.sy) ey = best.y; else { ey = Math.max(best.y + 6, Math.min(best.y + h - 6, o.sy)); ex = best.x + w <= o.sx ? best.x + w : best.x; }
      var dx = ex - o.sx, dy = ey - o.sy, len = Math.sqrt(dx * dx + dy * dy);
      if (!o.shown) { o.el.style.display = ''; o.stem.style.display = ''; o.dot.style.display = ''; o.shown = true; }
      o.el.style.transform = 'translate(' + best.x.toFixed(1) + 'px,' + best.y.toFixed(1) + 'px)';
      o.stem.style.height = Math.max(0, len - 1).toFixed(1) + 'px';
      o.stem.style.transform = 'translate(' + o.sx.toFixed(1) + 'px,' + o.sy.toFixed(1) + 'px) rotate(' + Math.atan2(-dx, dy).toFixed(4) + 'rad)';
      o.dot.style.transform = 'translate(' + o.sx.toFixed(1) + 'px,' + o.sy.toFixed(1) + 'px)';
    });
  }

  /* ================================================================ PICKING / HOVER */
  var ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), down = null, pending = null, hoverKey = null;
  function visibleChain(o) { while (o) { if (!o.visible) return false; o = o.parent; } return true; }
  function hitTest(e) {
    var r = canvas.getBoundingClientRect(); if (!r.width || !r.height) return null;
    ndc.x = (e.clientX - r.left) / r.width * 2 - 1; ndc.y = -(e.clientY - r.top) / r.height * 2 + 1;
    ray.setFromCamera(ndc, camera);
    var hs = ray.intersectObjects(PICK, false);
    for (var i = 0; i < hs.length; i++) if (hs[i].object.userData.unit && visibleChain(hs[i].object)) return hs[i];
    return null;
  }
  function onDown(e) { down = { x: e.clientX, y: e.clientY }; tip.style.display = 'none'; }
  function onUp(e) {
    if (!down) return;
    var mv = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null;
    if (mv >= 6) return;
    var h = hitTest(e); if (h) pick(h.object.userData.unit);
  }
  function onMove(e) { pending = e; }
  function onLeave() { pending = null; tip.style.display = 'none'; canvas.style.cursor = ''; setHover(null); }
  function setHover(k) {
    if (k === hoverKey) return; hoverKey = k;
    if (opts.onHover) { try { opts.onHover(k); } catch (e) { setTimeout(function () { throw e; }); } }
  }
  function doHover() {
    if (!pending || !host) return;
    var e = pending; pending = null;
    if (e.buttons) { tip.style.display = 'none'; return; }
    var h = hitTest(e);
    if (!h) { tip.style.display = 'none'; canvas.style.cursor = ''; setHover(null); return; }
    var k = h.object.userData.unit, nm = h.object.userData.tip || NAMES[k] || k;
    if (tip.textContent !== nm) tip.textContent = nm;
    tip.style.display = 'block'; canvas.style.cursor = 'pointer';
    var r = host.getBoundingClientRect(), s = (r.width / (host.clientWidth || 1)) || 1;
    var lx = (e.clientX - r.left) / s, ly = (e.clientY - r.top) / s, tw2 = tip.offsetWidth, th = tip.offsetHeight;
    var x = lx + 14, y = ly + 16;
    if (x + tw2 > W - 6) x = lx - tw2 - 12; if (y + th > H - 6) y = ly - th - 12;
    tip.style.transform = 'translate(' + Math.max(4, x).toFixed(0) + 'px,' + Math.max(4, y).toFixed(0) + 'px)';
    setHover(k);
  }
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerleave', onLeave);
  controls.addEventListener('start', function () { fly = null; userMoved = true; });

  /* ================================================================ SIZE / LOOP */
  function resize() {
    if (!host) return;
    var w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    var r = host.getBoundingClientRect(), s = r.width / w || 1;
    var pr = Math.max(0.75, Math.min(2, (window.devicePixelRatio || 1) * s));
    if (Math.abs(renderer.getPixelRatio() - pr) > 1e-3) renderer.setPixelRatio(pr);
    var changed = w !== W || h !== H;
    W = w; H = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    if (changed && !userMoved && !fly) setCam(camFor(curStop));
    measureAll();
  }
  function frame(time) {
    if (!host) return;
    var w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    if (w !== W || h !== H) resize();
    var now = (typeof time === 'number' && time > 0) ? time : performance.now();
    var rdt = lastT ? Math.min(0.25, (now - lastT) / 1000) : 0; lastT = now;
    var dt = Math.min(0.05, rdt);
    if (!RM) {
      FLOWS.forEach(function (f) { if (f.pts.visible) f.step(dt); });
      MOVERS.forEach(function (m) { m.update(dt); });
    }
    if (fly) {
      fly.k = Math.min(1, fly.k + rdt / fly.d);
      var k = fly.k, e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      camera.position.lerpVectors(fly.p0, fly.p1, e); controls.target.lerpVectors(fly.t0, fly.t1, e);
      if (fly.k >= 1) fly = null;
    }
    controls.update();
    var ksz = camera.position.distanceTo(controls.target) / (H * 0.5);
    Object.keys(KMAT).forEach(function (kk) { KMAT[kk].size = FL[kk].px * ksz; });
    FLOWS.forEach(function (f) { if (f.pts.visible) f.place(); });
    renderer.render(scene, camera);
    placeLabels();
    doHover();
  }
  function onWinResize() { if (host) resize(); }
  window.addEventListener('resize', onWinResize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { TXT.forEach(function (t) { t.redraw(); }); measureAll(); });

  /* ================================================================ API */
  function mount(el) {
    if (!el || !el.appendChild) return;
    try { if (window.getComputedStyle(el).position === 'static') el.style.position = 'relative'; } catch (e) {}
    host = el;
    el.appendChild(canvas); el.appendChild(layer); el.appendChild(tip);
    tip.style.display = 'none';
    if (window.ResizeObserver) {
      if (!ro) ro = new ResizeObserver(function () { resize(); });
      ro.disconnect(); ro.observe(el);
    }
    W = 0; H = 0; resize();
  }
  function go(k, o) {
    if (!STOPS[k]) return;
    curStop = k; activeLabels = STOPS[k].labels.slice();
    var f = STOPS[k].flows; Object.keys(f).forEach(function (kk) { ON[kk] = f[kk]; }); ON.liquid = ON.gas; applyFlows();
    userMoved = false;
    var c = camFor(k);
    if ((o && o.instant) || RM) { fly = null; setCam(c); }
    else fly = { p0: camera.position.clone(), t0: controls.target.clone(), p1: c.p, t1: c.t, k: 0, d: 1.6 };
  }
  function start() { if (running) return; running = true; lastT = 0; renderer.setAnimationLoop(frame); }
  function stop() { running = false; renderer.setAnimationLoop(null); }
  function setLabel(k, text) { var o = LBL[k]; if (!o) return; o.el.textContent = String(text == null ? '' : text); measure(o); }

  applyFlows();
  setCam(camFor('site'));
  MOVERS.forEach(function (m) { m.update(0); });

  var inst = {
    mount: mount, go: go, start: start, stop: stop, resize: resize, setFlows: setFlows, setLabel: setLabel, highlight: highlight,
    units: ORDER.filter(function (k) { return UN[k]; }).map(function (k) { return { key: k, name: NAMES[k] }; }),
    stopKeys: STOP_KEYS.slice()
  };
  Object.defineProperty(inst, '_debug', { value: { camera: camera, controls: controls, scene: scene, renderer: renderer, labels: LBL, particles: function () { return NPART; } }, enumerable: false });
  return inst;
}

window.GasScene = { create: create, __v: 1 };
})();

