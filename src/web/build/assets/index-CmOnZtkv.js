import {
  c as sn,
  r as A,
  j as r,
  D as ve,
  a as Se,
  T as v,
  b as ke,
  d as qr,
  e as Gt,
  L as hr,
  f as fr,
  A as V,
  B as j,
  g as W,
  I as nn,
  h as Q,
  V as on,
  i as xt,
  F as ce,
  k as de,
  S as ue,
  M as U,
  l as Ce,
  m as L,
  n as xr,
  C as ee,
  o as Vr,
  p as an,
  q as Me,
  s as Ye,
  t as At,
  u as ln,
  v as mt,
  w as cn,
  x as Ne,
  y as sr,
  z as dn,
  E as Gr,
  G as un,
  H as nr,
  J as Ie,
  K as or,
  N as pn,
  O as hn,
  P as Jr,
  Q as gt,
  U as bt,
  W as zt,
  X as yt,
  Y as mr,
  Z as fn,
  _ as xn,
  $ as mn,
  a0 as gn,
  a1 as bn,
  a2 as Kr,
  a3 as yn,
  a4 as jn,
  a5 as ar,
  a6 as wn,
  a7 as et,
  a8 as pe,
  a9 as he,
  aa as Et,
  ab as vn,
  ac as Xr,
  ad as F,
  ae as re,
  af as Sn,
  ag as kn,
  ah as Pe,
  ai as Cn,
  aj as Yr,
  ak as An,
  al as En,
  am as Qr,
  an as gr,
  ao as Qe,
  ap as Le,
  aq as Rn,
  ar as Jt,
  as as In,
  at as Tn,
  au as Pn,
  av as On,
  aw as br,
  ax as ne,
  ay as Dn,
  az as Bt,
  aA as Nn,
  aB as zn,
  aC as Bn,
  aD as Mn,
} from './mui-B1piuFcP.js';
import { a as Ln, g as Fn } from './vendor-DRGAkOw0.js';
import {
  u as Zr,
  N as es,
  B as Wn,
  R as Un,
  a as ye,
} from './router-DtQFgy1d.js';
import {
  c as $,
  a as ze,
  b as $n,
  u as fe,
  d as te,
  P as _n,
} from './redux-Cxu7m8hk.js';
(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) n(o);
  new MutationObserver(o => {
    for (const a of o)
      if (a.type === 'childList')
        for (const i of a.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(o) {
    const a = {};
    return (
      o.integrity && (a.integrity = o.integrity),
      o.referrerPolicy && (a.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (a.credentials = 'include')
        : o.crossOrigin === 'anonymous'
          ? (a.credentials = 'omit')
          : (a.credentials = 'same-origin'),
      a
    );
  }
  function n(o) {
    if (o.ep) return;
    o.ep = !0;
    const a = s(o);
    fetch(o.href, a);
  }
})();
var ct = {},
  yr;
function Hn() {
  if (yr) return ct;
  yr = 1;
  var t = Ln();
  return ((ct.createRoot = t.createRoot), (ct.hydrateRoot = t.hydrateRoot), ct);
}
var qn = Hn();
const Vn = Fn(qn);
function ts(t, e) {
  return function () {
    return t.apply(e, arguments);
  };
}
const { toString: Gn } = Object.prototype,
  { getPrototypeOf: ir } = Object,
  { iterator: Rt, toStringTag: rs } = Symbol,
  It = (t => e => {
    const s = Gn.call(e);
    return t[s] || (t[s] = s.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  me = t => ((t = t.toLowerCase()), e => It(e) === t),
  Tt = t => e => typeof e === t,
  { isArray: Ue } = Array,
  We = Tt('undefined');
function tt(t) {
  return (
    t !== null &&
    !We(t) &&
    t.constructor !== null &&
    !We(t.constructor) &&
    oe(t.constructor.isBuffer) &&
    t.constructor.isBuffer(t)
  );
}
const ss = me('ArrayBuffer');
function Jn(t) {
  let e;
  return (
    typeof ArrayBuffer < 'u' && ArrayBuffer.isView
      ? (e = ArrayBuffer.isView(t))
      : (e = t && t.buffer && ss(t.buffer)),
    e
  );
}
const Kn = Tt('string'),
  oe = Tt('function'),
  ns = Tt('number'),
  rt = t => t !== null && typeof t == 'object',
  Xn = t => t === !0 || t === !1,
  jt = t => {
    if (It(t) !== 'object') return !1;
    const e = ir(t);
    return (
      (e === null ||
        e === Object.prototype ||
        Object.getPrototypeOf(e) === null) &&
      !(rs in t) &&
      !(Rt in t)
    );
  },
  Yn = t => {
    if (!rt(t) || tt(t)) return !1;
    try {
      return (
        Object.keys(t).length === 0 &&
        Object.getPrototypeOf(t) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  Qn = me('Date'),
  Zn = me('File'),
  eo = me('Blob'),
  to = me('FileList'),
  ro = t => rt(t) && oe(t.pipe),
  so = t => {
    let e;
    return (
      t &&
      ((typeof FormData == 'function' && t instanceof FormData) ||
        (oe(t.append) &&
          ((e = It(t)) === 'formdata' ||
            (e === 'object' &&
              oe(t.toString) &&
              t.toString() === '[object FormData]'))))
    );
  },
  no = me('URLSearchParams'),
  [oo, ao, io, lo] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(
    me
  ),
  co = t =>
    t.trim
      ? t.trim()
      : t.replaceAll(/^[\s\uFEFF\u00A0]+|[\s\uFEFF\u00A0]+$/g, '');
function st(t, e, { allOwnKeys: s = !1 } = {}) {
  if (t === null || typeof t > 'u') return;
  let n, o;
  if ((typeof t != 'object' && (t = [t]), Ue(t)))
    for (n = 0, o = t.length; n < o; n++) e.call(null, t[n], n, t);
  else {
    if (tt(t)) return;
    const a = s ? Object.getOwnPropertyNames(t) : Object.keys(t),
      i = a.length;
    let l;
    for (n = 0; n < i; n++) ((l = a[n]), e.call(null, t[l], l, t));
  }
}
function os(t, e) {
  if (tt(t)) return null;
  e = e.toLowerCase();
  const s = Object.keys(t);
  let n = s.length,
    o;
  for (; n-- > 0; ) if (((o = s[n]), e === o.toLowerCase())) return o;
  return null;
}
const Te =
    typeof globalThis < 'u'
      ? globalThis
      : typeof globalThis.self < 'u'
        ? globalThis
        : typeof globalThis.window < 'u'
          ? globalThis
          : globalThis,
  as = t => !We(t) && t !== Te;
function Kt() {
  const { caseless: t, skipUndefined: e } = (as(this) && this) || {},
    s = {},
    n = (o, a) => {
      const i = (t && os(s, a)) || a;
      jt(s[i]) && jt(o)
        ? (s[i] = Kt(s[i], o))
        : jt(o)
          ? (s[i] = Kt({}, o))
          : Ue(o)
            ? (s[i] = [...o])
            : (!e || !We(o)) && (s[i] = o);
    };
  for (let o = 0, a = arguments.length; o < a; o++)
    arguments[o] && st(arguments[o], n);
  return s;
}
const uo = (t, e, s, { allOwnKeys: n } = {}) => (
    st(
      e,
      (o, a) => {
        s && oe(o) ? (t[a] = ts(o, s)) : (t[a] = o);
      },
      { allOwnKeys: n }
    ),
    t
  ),
  po = t => (t.charCodeAt(0) === 65_279 && (t = t.slice(1)), t),
  ho = (t, e, s, n) => {
    ((t.prototype = Object.create(e.prototype, n)),
      (t.prototype.constructor = t),
      Object.defineProperty(t, 'super', { value: e.prototype }),
      s && Object.assign(t.prototype, s));
  },
  fo = (t, e, s, n) => {
    let o, a, i;
    const l = {};
    if (((e = e || {}), t == null)) return e;
    do {
      for (o = Object.getOwnPropertyNames(t), a = o.length; a-- > 0; )
        ((i = o[a]),
          (!n || n(i, t, e)) && !l[i] && ((e[i] = t[i]), (l[i] = !0)));
      t = s !== !1 && ir(t);
    } while (t && (!s || s(t, e)) && t !== Object.prototype);
    return e;
  },
  xo = (t, e, s) => {
    ((t = String(t)),
      (s === void 0 || s > t.length) && (s = t.length),
      (s -= e.length));
    const n = t.indexOf(e, s);
    return n !== -1 && n === s;
  },
  mo = t => {
    if (!t) return null;
    if (Ue(t)) return t;
    let e = t.length;
    if (!ns(e)) return null;
    const s = new Array(e);
    for (; e-- > 0; ) s[e] = t[e];
    return s;
  },
  go = (
    t => e =>
      t && e instanceof t
  )(typeof Uint8Array < 'u' && ir(Uint8Array)),
  bo = (t, e) => {
    const n = (t && t[Rt]).call(t);
    let o;
    for (; (o = n.next()) && !o.done; ) {
      const a = o.value;
      e.call(t, a[0], a[1]);
    }
  },
  yo = (t, e) => {
    let s;
    const n = [];
    for (; (s = t.exec(e)) !== null; ) n.push(s);
    return n;
  },
  jo = me('HTMLFormElement'),
  wo = t =>
    t.toLowerCase().replaceAll(/[-_\s]([a-z\d])(\w*)/g, function (s, n, o) {
      return n.toUpperCase() + o;
    }),
  jr = (
    ({ hasOwnProperty: t }) =>
    (e, s) =>
      t.call(e, s)
  )(Object.prototype),
  vo = me('RegExp'),
  is = (t, e) => {
    const s = Object.getOwnPropertyDescriptors(t),
      n = {};
    (st(s, (o, a) => {
      let i;
      (i = e(o, a, t)) !== !1 && (n[a] = i || o);
    }),
      Object.defineProperties(t, n));
  },
  So = t => {
    is(t, (e, s) => {
      if (oe(t) && ['arguments', 'caller', 'callee'].includes(s)) return !1;
      const n = t[s];
      if (oe(n)) {
        if (((e.enumerable = !1), 'writable' in e)) {
          e.writable = !1;
          return;
        }
        e.set ||
          (e.set = () => {
            throw new Error("Can not rewrite read-only method '" + s + "'");
          });
      }
    });
  },
  ko = (t, e) => {
    const s = {},
      n = o => {
        for (const a of o) {
          s[a] = !0;
        }
      };
    return (Ue(t) ? n(t) : n(String(t).split(e)), s);
  },
  Co = () => {},
  Ao = (t, e) => (t != null && Number.isFinite((t = +t)) ? t : e);
function Eo(t) {
  return !!(t && oe(t.append) && t[rs] === 'FormData' && t[Rt]);
}
const Ro = t => {
    const e = Array.from({ length: 10 }),
      s = (n, o) => {
        if (rt(n)) {
          if (e.includes(n)) return;
          if (tt(n)) return n;
          if (!('toJSON' in n)) {
            e[o] = n;
            const a = Ue(n) ? [] : {};
            return (
              st(n, (i, l) => {
                const p = s(i, o + 1);
                !We(p) && (a[l] = p);
              }),
              (e[o] = void 0),
              a
            );
          }
        }
        return n;
      };
    return s(t, 0);
  },
  Io = me('AsyncFunction'),
  To = t => t && (rt(t) || oe(t)) && oe(t.then) && oe(t.catch),
  ls = ((t, e) =>
    t
      ? setImmediate
      : e
        ? ((s, n) => (
            Te.addEventListener(
              'message',
              ({ source: o, data: a }) => {
                o === Te && a === s && n.length && n.shift()();
              },
              !1
            ),
            o => {
              (n.push(o), Te.postMessage(s, '*'));
            }
          ))(`axios@${Math.random()}`, [])
        : s => setTimeout(s))(
    typeof setImmediate == 'function',
    oe(Te.postMessage)
  ),
  Po =
    typeof queueMicrotask < 'u'
      ? queueMicrotask.bind(Te)
      : (typeof process < 'u' && process.nextTick) || ls,
  Oo = t => t != null && oe(t[Rt]),
  x = {
    isArray: Ue,
    isArrayBuffer: ss,
    isBuffer: tt,
    isFormData: so,
    isArrayBufferView: Jn,
    isString: Kn,
    isNumber: ns,
    isBoolean: Xn,
    isObject: rt,
    isPlainObject: jt,
    isEmptyObject: Yn,
    isReadableStream: oo,
    isRequest: ao,
    isResponse: io,
    isHeaders: lo,
    isUndefined: We,
    isDate: Qn,
    isFile: Zn,
    isBlob: eo,
    isRegExp: vo,
    isFunction: oe,
    isStream: ro,
    isURLSearchParams: no,
    isTypedArray: go,
    isFileList: to,
    forEach: st,
    merge: Kt,
    extend: uo,
    trim: co,
    stripBOM: po,
    inherits: ho,
    toFlatObject: fo,
    kindOf: It,
    kindOfTest: me,
    endsWith: xo,
    toArray: mo,
    forEachEntry: bo,
    matchAll: yo,
    isHTMLForm: jo,
    hasOwnProperty: jr,
    hasOwnProp: jr,
    reduceDescriptors: is,
    freezeMethods: So,
    toObjectSet: ko,
    toCamelCase: wo,
    noop: Co,
    toFiniteNumber: Ao,
    findKey: os,
    global: Te,
    isContextDefined: as,
    isSpecCompliantForm: Eo,
    toJSONObject: Ro,
    isAsyncFn: Io,
    isThenable: To,
    setImmediate: ls,
    asap: Po,
    isIterable: Oo,
  };
function D(t, e, s, n, o) {
  (Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = t),
    (this.name = 'AxiosError'),
    e && (this.code = e),
    s && (this.config = s),
    n && (this.request = n),
    o && ((this.response = o), (this.status = o.status ? o.status : null)));
}
x.inherits(D, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: x.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const cs = D.prototype,
  ds = {};
for (const t of [
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL',
]) {
  ds[t] = { value: t };
}
Object.defineProperties(D, ds);
Object.defineProperty(cs, 'isAxiosError', { value: !0 });
D.from = (t, e, s, n, o, a) => {
  const i = Object.create(cs);
  x.toFlatObject(
    t,
    i,
    function (d) {
      return d !== Error.prototype;
    },
    f => f !== 'isAxiosError'
  );
  const l = t && t.message ? t.message : 'Error',
    p = e == null && t ? t.code : e;
  return (
    D.call(i, l, p, s, n, o),
    t &&
      i.cause == null &&
      Object.defineProperty(i, 'cause', { value: t, configurable: !0 }),
    (i.name = (t && t.name) || 'Error'),
    a && Object.assign(i, a),
    i
  );
};
const Do = null;
function Xt(t) {
  return x.isPlainObject(t) || x.isArray(t);
}
function us(t) {
  return x.endsWith(t, '[]') ? t.slice(0, -2) : t;
}
function wr(t, e, s) {
  return t
    ? t
        .concat(e)
        .map(function (o, a) {
          return ((o = us(o)), !s && a ? '[' + o + ']' : o);
        })
        .join(s ? '.' : '')
    : e;
}
function No(t) {
  return x.isArray(t) && !t.some(Xt);
}
const zo = x.toFlatObject(x, {}, null, function (e) {
  return /^is[A-Z]/.test(e);
});
function Pt(t, e, s) {
  if (!x.isObject(t)) throw new TypeError('target must be an object');
  ((e = e || new FormData()),
    (s = x.toFlatObject(
      s,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (g, b) {
        return !x.isUndefined(b[g]);
      }
    )));
  const n = s.metaTokens,
    o = s.visitor || d,
    a = s.dots,
    i = s.indexes,
    p = (s.Blob || (typeof Blob < 'u' && Blob)) && x.isSpecCompliantForm(e);
  if (!x.isFunction(o)) throw new TypeError('visitor must be a function');
  function f(c) {
    if (c === null) return '';
    if (x.isDate(c)) return c.toISOString();
    if (x.isBoolean(c)) return c.toString();
    if (!p && x.isBlob(c))
      throw new D('Blob is not supported. Use a Buffer instead.');
    return x.isArrayBuffer(c) || x.isTypedArray(c)
      ? p && typeof Blob == 'function'
        ? new Blob([c])
        : Buffer.from(c)
      : c;
  }
  function d(c, g, b) {
    let E = c;
    if (c && !b && typeof c == 'object') {
      if (x.endsWith(g, '{}'))
        ((g = n ? g : g.slice(0, -2)), (c = JSON.stringify(c)));
      else if (
        (x.isArray(c) && No(c)) ||
        ((x.isFileList(c) || x.endsWith(g, '[]')) && (E = x.toArray(c)))
      )
        return (
          (g = us(g)),
          E.forEach(function (R, P) {
            !(x.isUndefined(R) || R === null) &&
              e.append(
                i === !0 ? wr([g], P, a) : i === null ? g : g + '[]',
                f(R)
              );
          }),
          !1
        );
    }
    return Xt(c) ? !0 : (e.append(wr(b, g, a), f(c)), !1);
  }
  const y = [],
    S = Object.assign(zo, {
      defaultVisitor: d,
      convertValue: f,
      isVisitable: Xt,
    });
  function w(c, g) {
    if (!x.isUndefined(c)) {
      if (y.includes(c))
        throw new Error('Circular reference detected in ' + g.join('.'));
      (y.push(c),
        x.forEach(c, function (E, _) {
          (!(x.isUndefined(E) || E === null) &&
            o.call(e, E, x.isString(_) ? _.trim() : _, g, S)) === !0 &&
            w(E, g ? g.concat(_) : [_]);
        }),
        y.pop());
    }
  }
  if (!x.isObject(t)) throw new TypeError('data must be an object');
  return (w(t), e);
}
function vr(t) {
  const e = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\0',
  };
  return encodeURIComponent(t).replaceAll(/[!'()~]|%20|%00/g, function (n) {
    return e[n];
  });
}
function lr(t, e) {
  ((this._pairs = []), t && Pt(t, this, e));
}
const ps = lr.prototype;
ps.append = function (e, s) {
  this._pairs.push([e, s]);
};
ps.toString = function (e) {
  const s = e
    ? function (n) {
        return e.call(this, n, vr);
      }
    : vr;
  return this._pairs
    .map(function (o) {
      return s(o[0]) + '=' + s(o[1]);
    }, '')
    .join('&');
};
function Bo(t) {
  return encodeURIComponent(t)
    .replaceAll(/%3A/gi, ':')
    .replaceAll('%24', '$')
    .replaceAll(/%2C/gi, ',')
    .replaceAll('%20', '+');
}
function hs(t, e, s) {
  if (!e) return t;
  const n = (s && s.encode) || Bo;
  x.isFunction(s) && (s = { serialize: s });
  const o = s && s.serialize;
  let a;
  if (
    (o
      ? (a = o(e, s))
      : (a = x.isURLSearchParams(e) ? e.toString() : new lr(e, s).toString(n)),
    a)
  ) {
    const i = t.indexOf('#');
    (i !== -1 && (t = t.slice(0, i)), (t += (t.includes('?') ? '&' : '?') + a));
  }
  return t;
}
class Sr {
  constructor() {
    this.handlers = [];
  }
  use(e, s, n) {
    return (
      this.handlers.push({
        fulfilled: e,
        rejected: s,
        synchronous: n ? n.synchronous : !1,
        runWhen: n ? n.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(e) {
    x.forEach(this.handlers, function (n) {
      n !== null && e(n);
    });
  }
}
const fs = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  Mo = typeof URLSearchParams < 'u' ? URLSearchParams : lr,
  Lo = typeof FormData < 'u' ? FormData : null,
  Fo = typeof Blob < 'u' ? Blob : null,
  Wo = {
    isBrowser: !0,
    classes: { URLSearchParams: Mo, FormData: Lo, Blob: Fo },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
  },
  cr = typeof globalThis.window < 'u' && typeof document < 'u',
  Yt = (typeof navigator == 'object' && navigator) || void 0,
  Uo =
    cr && (!Yt || !['ReactNative', 'NativeScript', 'NS'].includes(Yt.product)),
  $o =
    typeof WorkerGlobalScope < 'u' &&
    globalThis instanceof WorkerGlobalScope &&
    typeof globalThis.importScripts == 'function',
  _o = (cr && globalThis.location.href) || 'http://localhost',
  Ho = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: cr,
        hasStandardBrowserEnv: Uo,
        hasStandardBrowserWebWorkerEnv: $o,
        navigator: Yt,
        origin: _o,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  Z = { ...Ho, ...Wo };
function qo(t, e) {
  return Pt(t, new Z.classes.URLSearchParams(), {
    visitor: function (s, n, o, a) {
      return Z.isNode && x.isBuffer(s)
        ? (this.append(n, s.toString('base64')), !1)
        : Reflect.apply(a.defaultVisitor, this, arguments);
    },
    ...e,
  });
}
function Vo(t) {
  return x
    .matchAll(/\w+|\[(\w*)]/g, t)
    .map(e => (e[0] === '[]' ? '' : e[1] || e[0]));
}
function Go(t) {
  const e = {},
    s = Object.keys(t);
  let n;
  const o = s.length;
  let a;
  for (n = 0; n < o; n++) ((a = s[n]), (e[a] = t[a]));
  return e;
}
function xs(t) {
  function e(s, n, o, a) {
    let i = s[a++];
    if (i === '__proto__') return !0;
    const l = Number.isFinite(+i),
      p = a >= s.length;
    return (
      (i = !i && x.isArray(o) ? o.length : i),
      p
        ? (x.hasOwnProp(o, i) ? (o[i] = [o[i], n]) : (o[i] = n), !l)
        : ((!o[i] || !x.isObject(o[i])) && (o[i] = []),
          e(s, n, o[i], a) && x.isArray(o[i]) && (o[i] = Go(o[i])),
          !l)
    );
  }
  if (x.isFormData(t) && x.isFunction(t.entries)) {
    const s = {};
    return (
      x.forEachEntry(t, (n, o) => {
        e(Vo(n), o, s, 0);
      }),
      s
    );
  }
  return null;
}
function Jo(t, e, s) {
  if (x.isString(t))
    try {
      return ((e || JSON.parse)(t), x.trim(t));
    } catch (error) {
      if (error.name !== 'SyntaxError') throw error;
    }
  return (s || JSON.stringify)(t);
}
const nt = {
  transitional: fs,
  adapter: ['xhr', 'http', 'fetch'],
  transformRequest: [
    function (e, s) {
      const n = s.getContentType() || '',
        o = n.includes('application/json'),
        a = x.isObject(e);
      if ((a && x.isHTMLForm(e) && (e = new FormData(e)), x.isFormData(e)))
        return o ? JSON.stringify(xs(e)) : e;
      if (
        x.isArrayBuffer(e) ||
        x.isBuffer(e) ||
        x.isStream(e) ||
        x.isFile(e) ||
        x.isBlob(e) ||
        x.isReadableStream(e)
      )
        return e;
      if (x.isArrayBufferView(e)) return e.buffer;
      if (x.isURLSearchParams(e))
        return (
          s.setContentType(
            'application/x-www-form-urlencoded;charset=utf-8',
            !1
          ),
          e.toString()
        );
      let l;
      if (a) {
        if (n.includes('application/x-www-form-urlencoded'))
          return qo(e, this.formSerializer).toString();
        if ((l = x.isFileList(e)) || n.includes('multipart/form-data')) {
          const p = this.env && this.env.FormData;
          return Pt(
            l ? { 'files[]': e } : e,
            p && new p(),
            this.formSerializer
          );
        }
      }
      return a || o ? (s.setContentType('application/json', !1), Jo(e)) : e;
    },
  ],
  transformResponse: [
    function (e) {
      const s = this.transitional || nt.transitional,
        n = s && s.forcedJSONParsing,
        o = this.responseType === 'json';
      if (x.isResponse(e) || x.isReadableStream(e)) return e;
      if (e && x.isString(e) && ((n && !this.responseType) || o)) {
        const i = !(s && s.silentJSONParsing) && o;
        try {
          return JSON.parse(e, this.parseReviver);
        } catch (error) {
          if (i)
            throw error.name === 'SyntaxError'
              ? D.from(error, D.ERR_BAD_RESPONSE, this, null, this.response)
              : error;
        }
      }
      return e;
    },
  ],
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Z.classes.FormData, Blob: Z.classes.Blob },
  validateStatus: function (e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': void 0,
    },
  },
};
x.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], t => {
  nt.headers[t] = {};
});
const Ko = x.toObjectSet([
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent',
  ]),
  Xo = t => {
    const e = {};
    let s, n, o;
    return (
      t &&
        t
          .split(
            `
`
          )
          .forEach(function (i) {
            ((o = i.indexOf(':')),
              (s = i.slice(0, Math.max(0, o)).trim().toLowerCase()),
              (n = i.slice(Math.max(0, o + 1)).trim()),
              !(!s || (e[s] && Ko[s])) &&
                (s === 'set-cookie'
                  ? e[s]
                    ? e[s].push(n)
                    : (e[s] = [n])
                  : (e[s] = e[s] ? e[s] + ', ' + n : n)));
          }),
      e
    );
  },
  kr = Symbol('internals');
function Ge(t) {
  return t && String(t).trim().toLowerCase();
}
function wt(t) {
  return t === !1 || t == null ? t : x.isArray(t) ? t.map(wt) : String(t);
}
function Yo(t) {
  const e = Object.create(null),
    s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; (n = s.exec(t)); ) e[n[1]] = n[2];
  return e;
}
const Qo = t => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function Mt(t, e, s, n, o) {
  if (x.isFunction(n)) return n.call(this, e, s);
  if ((o && (e = s), !!x.isString(e))) {
    if (x.isString(n)) return e.includes(n);
    if (x.isRegExp(n)) return n.test(e);
  }
}
function Zo(t) {
  return t
    .trim()
    .toLowerCase()
    .replaceAll(/([a-z\d])(\w*)/g, (e, s, n) => s.toUpperCase() + n);
}
function ea(t, e) {
  const s = x.toCamelCase(' ' + e);
  for (const n of ['get', 'set', 'has']) {
    Object.defineProperty(t, n + s, {
      value: function (o, a, i) {
        return this[n].call(this, e, o, a, i);
      },
      configurable: !0,
    });
  }
}
let ae = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, s, n) {
    const o = this;
    function a(l, p, f) {
      const d = Ge(p);
      if (!d) throw new Error('header name must be a non-empty string');
      const y = x.findKey(o, d);
      (!y || o[y] === void 0 || f === !0 || (f === void 0 && o[y] !== !1)) &&
        (o[y || p] = wt(l));
    }
    const i = (l, p) => x.forEach(l, (f, d) => a(f, d, p));
    if (x.isPlainObject(e) || e instanceof this.constructor) i(e, s);
    else if (x.isString(e) && (e = e.trim()) && !Qo(e)) i(Xo(e), s);
    else if (x.isObject(e) && x.isIterable(e)) {
      let l = {},
        p,
        f;
      for (const d of e) {
        if (!x.isArray(d))
          throw new TypeError('Object iterator must return a key-value pair');
        l[(f = d[0])] = (p = l[f])
          ? x.isArray(p)
            ? [...p, d[1]]
            : [p, d[1]]
          : d[1];
      }
      i(l, s);
    } else e != null && a(s, e, n);
    return this;
  }
  get(e, s) {
    if (((e = Ge(e)), e)) {
      const n = x.findKey(this, e);
      if (n) {
        const o = this[n];
        if (!s) return o;
        if (s === !0) return Yo(o);
        if (x.isFunction(s)) return s.call(this, o, n);
        if (x.isRegExp(s)) return s.exec(o);
        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }
  has(e, s) {
    if (((e = Ge(e)), e)) {
      const n = x.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!s || Mt(this, this[n], n, s)));
    }
    return !1;
  }
  delete(e, s) {
    const n = this;
    let o = !1;
    function a(i) {
      if (((i = Ge(i)), i)) {
        const l = x.findKey(n, i);
        l && (!s || Mt(n, n[l], l, s)) && (delete n[l], (o = !0));
      }
    }
    return (x.isArray(e) ? e.forEach(a) : a(e), o);
  }
  clear(e) {
    const s = Object.keys(this);
    let n = s.length,
      o = !1;
    for (; n--; ) {
      const a = s[n];
      (!e || Mt(this, this[a], a, e, !0)) && (delete this[a], (o = !0));
    }
    return o;
  }
  normalize(e) {
    const s = this,
      n = {};
    return (
      x.forEach(this, (o, a) => {
        const i = x.findKey(n, a);
        if (i) {
          ((s[i] = wt(o)), delete s[a]);
          return;
        }
        const l = e ? Zo(a) : String(a).trim();
        (l !== a && delete s[a], (s[l] = wt(o)), (n[l] = !0));
      }),
      this
    );
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const s = Object.create(null);
    return (
      x.forEach(this, (n, o) => {
        n != null && n !== !1 && (s[o] = e && x.isArray(n) ? n.join(', ') : n);
      }),
      s
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, s]) => e + ': ' + s).join(`
`);
  }
  getSetCookie() {
    return this.get('set-cookie') || [];
  }
  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...s) {
    const n = new this(e);
    return (s.forEach(o => n.set(o)), n);
  }
  static accessor(e) {
    const n = (this[kr] = this[kr] = { accessors: {} }).accessors,
      o = this.prototype;
    function a(i) {
      const l = Ge(i);
      n[l] || (ea(o, i), (n[l] = !0));
    }
    return (x.isArray(e) ? e.forEach(a) : a(e), this);
  }
};
ae.accessor([
  'Content-Type',
  'Content-Length',
  'Accept',
  'Accept-Encoding',
  'User-Agent',
  'Authorization',
]);
x.reduceDescriptors(ae.prototype, ({ value: t }, e) => {
  let s = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => t,
    set(n) {
      this[s] = n;
    },
  };
});
x.freezeMethods(ae);
function Lt(t, e) {
  const s = this || nt,
    n = e || s,
    o = ae.from(n.headers);
  let a = n.data;
  return (
    x.forEach(t, function (l) {
      a = l.call(s, a, o.normalize(), e ? e.status : void 0);
    }),
    o.normalize(),
    a
  );
}
function ms(t) {
  return !!(t && t.__CANCEL__);
}
function $e(t, e, s) {
  (D.call(this, t ?? 'canceled', D.ERR_CANCELED, e, s),
    (this.name = 'CanceledError'));
}
x.inherits($e, D, { __CANCEL__: !0 });
function gs(t, e, s) {
  const n = s.config.validateStatus;
  !s.status || !n || n(s.status)
    ? t(s)
    : e(
        new D(
          'Request failed with status code ' + s.status,
          [D.ERR_BAD_REQUEST, D.ERR_BAD_RESPONSE][
            Math.floor(s.status / 100) - 4
          ],
          s.config,
          s.request,
          s
        )
      );
}
function ta(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return (e && e[1]) || '';
}
function ra(t, e) {
  t = t || 10;
  const s = new Array(t),
    n = new Array(t);
  let o = 0,
    a = 0,
    i;
  return (
    (e = e === void 0 ? 1e3 : e),
    function (p) {
      const f = Date.now(),
        d = n[a];
      (i || (i = f), (s[o] = p), (n[o] = f));
      let y = a,
        S = 0;
      for (; y !== o; ) ((S += s[y++]), (y = y % t));
      if (((o = (o + 1) % t), o === a && (a = (a + 1) % t), f - i < e)) return;
      const w = d && f - d;
      return w ? Math.round((S * 1e3) / w) : void 0;
    }
  );
}
function sa(t, e) {
  let s = 0,
    n = 1e3 / e,
    o,
    a;
  const i = (f, d = Date.now()) => {
    ((s = d), (o = null), a && (clearTimeout(a), (a = null)), t(...f));
  };
  return [
    (...f) => {
      const d = Date.now(),
        y = d - s;
      y >= n
        ? i(f, d)
        : ((o = f),
          a ||
            (a = setTimeout(() => {
              ((a = null), i(o));
            }, n - y)));
    },
    () => o && i(o),
  ];
}
const Ct = (t, e, s = 3) => {
    let n = 0;
    const o = ra(50, 250);
    return sa(a => {
      const i = a.loaded,
        l = a.lengthComputable ? a.total : void 0,
        p = i - n,
        f = o(p),
        d = i <= l;
      n = i;
      const y = {
        loaded: i,
        total: l,
        progress: l ? i / l : void 0,
        bytes: p,
        rate: f || void 0,
        estimated: f && l && d ? (l - i) / f : void 0,
        event: a,
        lengthComputable: l != null,
        [e ? 'download' : 'upload']: !0,
      };
      t(y);
    }, s);
  },
  Cr = (t, e) => {
    const s = t != null;
    return [n => e[0]({ lengthComputable: s, total: t, loaded: n }), e[1]];
  },
  Ar =
    t =>
    (...e) =>
      x.asap(() => t(...e)),
  na = Z.hasStandardBrowserEnv
    ? ((t, e) => s => (
        (s = new URL(s, Z.origin)),
        t.protocol === s.protocol &&
          t.host === s.host &&
          (e || t.port === s.port)
      ))(
        new URL(Z.origin),
        Z.navigator && /(msie|trident)/i.test(Z.navigator.userAgent)
      )
    : () => !0,
  oa = Z.hasStandardBrowserEnv
    ? {
        write(t, e, s, n, o, a) {
          const i = [t + '=' + encodeURIComponent(e)];
          (x.isNumber(s) && i.push('expires=' + new Date(s).toGMTString()),
            x.isString(n) && i.push('path=' + n),
            x.isString(o) && i.push('domain=' + o),
            a === !0 && i.push('secure'),
            (document.cookie = i.join('; ')));
        },
        read(t) {
          const e = document.cookie.match(
            new RegExp(String.raw`(^|;\s*)(` + t + ')=([^;]*)')
          );
          return e ? decodeURIComponent(e[3]) : null;
        },
        remove(t) {
          this.write(t, '', Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function aa(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function ia(t, e) {
  return e ? t.replace(/\/?\/$/, '') + '/' + e.replace(/^\/+/, '') : t;
}
function bs(t, e, s) {
  let n = !aa(e);
  return t && (n || s == !1) ? ia(t, e) : e;
}
const Er = t => (t instanceof ae ? { ...t } : t);
function De(t, e) {
  e = e || {};
  const s = {};
  function n(f, d, y, S) {
    return x.isPlainObject(f) && x.isPlainObject(d)
      ? x.merge.call({ caseless: S }, f, d)
      : x.isPlainObject(d)
        ? x.merge({}, d)
        : x.isArray(d)
          ? [...d]
          : d;
  }
  function o(f, d, y, S) {
    if (x.isUndefined(d)) {
      if (!x.isUndefined(f)) return n(void 0, f, y, S);
    } else return n(f, d, y, S);
  }
  function a(f, d) {
    if (!x.isUndefined(d)) return n(void 0, d);
  }
  function i(f, d) {
    if (x.isUndefined(d)) {
      if (!x.isUndefined(f)) return n(void 0, f);
    } else return n(void 0, d);
  }
  function l(f, d, y) {
    if (y in e) return n(f, d);
    if (y in t) return n(void 0, f);
  }
  const p = {
    url: a,
    method: a,
    data: a,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: l,
    headers: (f, d, y) => o(Er(f), Er(d), y, !0),
  };
  return (
    x.forEach(Object.keys({ ...t, ...e }), function (d) {
      const y = p[d] || o,
        S = y(t[d], e[d], d);
      (x.isUndefined(S) && y !== l) || (s[d] = S);
    }),
    s
  );
}
const ys = t => {
    const e = De({}, t);
    let {
      data: s,
      withXSRFToken: n,
      xsrfHeaderName: o,
      xsrfCookieName: a,
      headers: i,
      auth: l,
    } = e;
    if (
      ((e.headers = i = ae.from(i)),
      (e.url = hs(
        bs(e.baseURL, e.url, e.allowAbsoluteUrls),
        t.params,
        t.paramsSerializer
      )),
      l &&
        i.set(
          'Authorization',
          'Basic ' +
            btoa(
              (l.username || '') +
                ':' +
                (l.password ? unescape(encodeURIComponent(l.password)) : '')
            )
        ),
      x.isFormData(s))
    ) {
      if (Z.hasStandardBrowserEnv || Z.hasStandardBrowserWebWorkerEnv)
        i.setContentType(void 0);
      else if (x.isFunction(s.getHeaders)) {
        const p = s.getHeaders(),
          f = new Set(['content-type', 'content-length']);
        for (const [d, y] of Object.entries(p)) {
          f.has(d.toLowerCase()) && i.set(d, y);
        }
      }
    }
    if (
      Z.hasStandardBrowserEnv &&
      (n && x.isFunction(n) && (n = n(e)), n || (n !== !1 && na(e.url)))
    ) {
      const p = o && a && oa.read(a);
      p && i.set(o, p);
    }
    return e;
  },
  la = typeof XMLHttpRequest < 'u',
  ca =
    la &&
    function (t) {
      return new Promise(function (s, n) {
        const o = ys(t);
        let a = o.data;
        const i = ae.from(o.headers).normalize();
        let { responseType: l, onUploadProgress: p, onDownloadProgress: f } = o,
          d,
          y,
          S,
          w,
          c;
        function g() {
          (w && w(),
            c && c(),
            o.cancelToken && o.cancelToken.unsubscribe(d),
            o.signal && o.signal.removeEventListener('abort', d));
        }
        let b = new XMLHttpRequest();
        (b.open(o.method.toUpperCase(), o.url, !0), (b.timeout = o.timeout));
        function E() {
          if (!b) return;
          const R = ae.from(
              'getAllResponseHeaders' in b && b.getAllResponseHeaders()
            ),
            M = {
              data:
                !l || l === 'text' || l === 'json'
                  ? b.responseText
                  : b.response,
              status: b.status,
              statusText: b.statusText,
              headers: R,
              config: t,
              request: b,
            };
          (gs(
            function (H) {
              (s(H), g());
            },
            function (H) {
              (n(H), g());
            },
            M
          ),
            (b = null));
        }
        ('onloadend' in b
          ? (b.onloadend = E)
          : (b.onreadystatechange = function () {
              !b ||
                b.readyState !== 4 ||
                (b.status === 0 &&
                  !(b.responseURL && b.responseURL.indexOf('file:') === 0)) ||
                setTimeout(E);
            }),
          (b.onabort = function () {
            b &&
              (n(new D('Request aborted', D.ECONNABORTED, t, b)), (b = null));
          }),
          (b.onerror = function (P) {
            const M = P && P.message ? P.message : 'Network Error',
              q = new D(M, D.ERR_NETWORK, t, b);
            ((q.event = P || null), n(q), (b = null));
          }),
          (b.ontimeout = function () {
            let P = o.timeout
              ? 'timeout of ' + o.timeout + 'ms exceeded'
              : 'timeout exceeded';
            const M = o.transitional || fs;
            (o.timeoutErrorMessage && (P = o.timeoutErrorMessage),
              n(
                new D(
                  P,
                  M.clarifyTimeoutError ? D.ETIMEDOUT : D.ECONNABORTED,
                  t,
                  b
                )
              ),
              (b = null));
          }),
          a === void 0 && i.setContentType(null),
          'setRequestHeader' in b &&
            x.forEach(i.toJSON(), function (P, M) {
              b.setRequestHeader(M, P);
            }),
          x.isUndefined(o.withCredentials) ||
            (b.withCredentials = !!o.withCredentials),
          l && l !== 'json' && (b.responseType = o.responseType),
          f && (([S, c] = Ct(f, !0)), b.addEventListener('progress', S)),
          p &&
            b.upload &&
            (([y, w] = Ct(p)),
            b.upload.addEventListener('progress', y),
            b.upload.addEventListener('loadend', w)),
          (o.cancelToken || o.signal) &&
            ((d = R => {
              b &&
                (n(!R || R.type ? new $e(null, t, b) : R),
                b.abort(),
                (b = null));
            }),
            o.cancelToken && o.cancelToken.subscribe(d),
            o.signal &&
              (o.signal.aborted
                ? d()
                : o.signal.addEventListener('abort', d))));
        const _ = ta(o.url);
        if (_ && !Z.protocols.includes(_)) {
          n(new D('Unsupported protocol ' + _ + ':', D.ERR_BAD_REQUEST, t));
          return;
        }
        b.send(a || null);
      });
    },
  da = (t, e) => {
    const { length: s } = (t = t ? t.filter(Boolean) : []);
    if (e || s) {
      let n = new AbortController(),
        o;
      const a = function (f) {
        if (!o) {
          ((o = !0), l());
          const d = f instanceof Error ? f : this.reason;
          n.abort(
            d instanceof D ? d : new $e(d instanceof Error ? d.message : d)
          );
        }
      };
      let i =
        e &&
        setTimeout(() => {
          ((i = null), a(new D(`timeout ${e} of ms exceeded`, D.ETIMEDOUT)));
        }, e);
      const l = () => {
        t &&
          (i && clearTimeout(i),
          (i = null),
          t.forEach(f => {
            f.unsubscribe
              ? f.unsubscribe(a)
              : f.removeEventListener('abort', a);
          }),
          (t = null));
      };
      for (const f of t) f.addEventListener('abort', a);
      const { signal: p } = n;
      return ((p.unsubscribe = () => x.asap(l)), p);
    }
  },
  ua = function* (t, e) {
    let s = t.byteLength;
    if (s < e) {
      yield t;
      return;
    }
    let n = 0,
      o;
    for (; n < s; ) ((o = n + e), yield t.slice(n, o), (n = o));
  },
  pa = async function* (t, e) {
    for await (const s of ha(t)) yield* ua(s, e);
  },
  ha = async function* (t) {
    if (t[Symbol.asyncIterator]) {
      yield* t;
      return;
    }
    const e = t.getReader();
    try {
      for (;;) {
        const { done: s, value: n } = await e.read();
        if (s) break;
        yield n;
      }
    } finally {
      await e.cancel();
    }
  },
  Rr = (t, e, s, n) => {
    const o = pa(t, e);
    let a = 0,
      i,
      l = p => {
        i || ((i = !0), n && n(p));
      };
    return new ReadableStream(
      {
        async pull(p) {
          try {
            const { done: f, value: d } = await o.next();
            if (f) {
              (l(), p.close());
              return;
            }
            let y = d.byteLength;
            if (s) {
              let S = (a += y);
              s(S);
            }
            p.enqueue(new Uint8Array(d));
          } catch (error) {
            throw (l(error), error);
          }
        },
        cancel(p) {
          return (l(p), o.return());
        },
      },
      { highWaterMark: 2 }
    );
  },
  Ir = 64 * 1024,
  { isFunction: dt } = x,
  fa = (({ Request: t, Response: e }) => ({ Request: t, Response: e }))(
    x.global
  ),
  { ReadableStream: Tr, TextEncoder: Pr } = x.global,
  Or = (t, ...e) => {
    try {
      return !!t(...e);
    } catch {
      return !1;
    }
  },
  xa = t => {
    t = x.merge.call({ skipUndefined: !0 }, fa, t);
    const { fetch: e, Request: s, Response: n } = t,
      o = e ? dt(e) : typeof fetch == 'function',
      a = dt(s),
      i = dt(n);
    if (!o) return !1;
    const l = o && dt(Tr),
      p =
        o &&
        (typeof Pr == 'function'
          ? (
              c => g =>
                c.encode(g)
            )(new Pr())
          : async c => new Uint8Array(await new s(c).arrayBuffer())),
      f =
        a &&
        l &&
        Or(() => {
          let c = !1;
          const g = new s(Z.origin, {
            body: new Tr(),
            method: 'POST',
            get duplex() {
              return ((c = !0), 'half');
            },
          }).headers.has('Content-Type');
          return c && !g;
        }),
      d = i && l && Or(() => x.isReadableStream(new n('').body)),
      y = { stream: d && (c => c.body) };
    o &&
      ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(c => {
        !y[c] &&
          (y[c] = (g, b) => {
            let E = g && g[c];
            if (E) return E.call(g);
            throw new D(
              `Response type '${c}' is not supported`,
              D.ERR_NOT_SUPPORT,
              b
            );
          });
      });
    const S = async c => {
        if (c == null) return 0;
        if (x.isBlob(c)) return c.size;
        if (x.isSpecCompliantForm(c))
          return (
            await new s(Z.origin, { method: 'POST', body: c }).arrayBuffer()
          ).byteLength;
        if (x.isArrayBufferView(c) || x.isArrayBuffer(c)) return c.byteLength;
        if ((x.isURLSearchParams(c) && (c = c + ''), x.isString(c)))
          return (await p(c)).byteLength;
      },
      w = async (c, g) => {
        const b = x.toFiniteNumber(c.getContentLength());
        return b ?? S(g);
      };
    return async c => {
      let {
          url: g,
          method: b,
          data: E,
          signal: _,
          cancelToken: R,
          timeout: P,
          onDownloadProgress: M,
          onUploadProgress: q,
          responseType: H,
          headers: m,
          withCredentials: h = 'same-origin',
          fetchOptions: u,
        } = ys(c),
        T = e || fetch;
      H = H ? (H + '').toLowerCase() : 'text';
      let N = da([_, R && R.toAbortSignal()], P),
        ie = null;
      const se =
        N &&
        N.unsubscribe &&
        (() => {
          N.unsubscribe();
        });
      let le;
      try {
        if (
          q &&
          f &&
          b !== 'get' &&
          b !== 'head' &&
          (le = await w(m, E)) !== 0
        ) {
          let xe = new s(g, { method: 'POST', body: E, duplex: 'half' }),
            be;
          if (
            (x.isFormData(E) &&
              (be = xe.headers.get('content-type')) &&
              m.setContentType(be),
            xe.body)
          ) {
            const [J, X] = Cr(le, Ct(Ar(q)));
            E = Rr(xe.body, Ir, J, X);
          }
        }
        x.isString(h) || (h = h ? 'include' : 'omit');
        const G = a && 'credentials' in s.prototype,
          ge = {
            ...u,
            signal: N,
            method: b.toUpperCase(),
            headers: m.normalize().toJSON(),
            body: E,
            duplex: 'half',
            credentials: G ? h : void 0,
          };
        ie = a && new s(g, ge);
        let I = await (a ? T(ie, u) : T(g, ge));
        const Ve = d && (H === 'stream' || H === 'response');
        if (d && (M || (Ve && se))) {
          const xe = {};
          for (const Ee of ['status', 'statusText', 'headers']) {
            xe[Ee] = I[Ee];
          }
          const be = x.toFiniteNumber(I.headers.get('content-length')),
            [J, X] = (M && Cr(be, Ct(Ar(M), !0))) || [];
          I = new n(
            Rr(I.body, Ir, J, () => {
              (X && X(), se && se());
            }),
            xe
          );
        }
        H = H || 'text';
        let ot = await y[x.findKey(y, H) || 'text'](I, c);
        return (
          !Ve && se && se(),
          await new Promise((xe, be) => {
            gs(xe, be, {
              data: ot,
              headers: ae.from(I.headers),
              status: I.status,
              statusText: I.statusText,
              config: c,
              request: ie,
            });
          })
        );
      } catch (error) {
        throw (
          se && se(),
          error &&
          error.name === 'TypeError' &&
          /Load failed|fetch/i.test(error.message)
            ? Object.assign(new D('Network Error', D.ERR_NETWORK, c, ie), {
                cause: error.cause || error,
              })
            : D.from(error, error && error.code, c, ie)
        );
      }
    };
  },
  ma = new Map(),
  js = t => {
    let e = t ? t.env : {};
    const { fetch: s, Request: n, Response: o } = e,
      a = [n, o, s];
    let i = a.length,
      l = i,
      p,
      f,
      d = ma;
    for (; l--; )
      ((p = a[l]),
        (f = d.get(p)),
        f === void 0 && d.set(p, (f = l ? new Map() : xa(e))),
        (d = f));
    return f;
  };
js();
const Qt = { http: Do, xhr: ca, fetch: { get: js } };
x.forEach(Qt, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, 'name', { value: e });
    } catch {}
    Object.defineProperty(t, 'adapterName', { value: e });
  }
});
const Dr = t => `- ${t}`,
  ga = t => x.isFunction(t) || t === null || t === !1,
  ws = {
    getAdapter: (t, e) => {
      t = x.isArray(t) ? t : [t];
      const { length: s } = t;
      let n, o;
      const a = {};
      for (let i = 0; i < s; i++) {
        n = t[i];
        let l;
        if (
          ((o = n),
          !ga(n) && ((o = Qt[(l = String(n)).toLowerCase()]), o === void 0))
        )
          throw new D(`Unknown adapter '${l}'`);
        if (o && (x.isFunction(o) || (o = o.get(e)))) break;
        a[l || '#' + i] = o;
      }
      if (!o) {
        const i = Object.entries(a).map(
          ([p, f]) =>
            `adapter ${p} ` +
            (f === !1
              ? 'is not supported by the environment'
              : 'is not available in the build')
        );
        let l = s
          ? i.length > 1
            ? `since :
` +
              i.map(Dr).join(`
`)
            : ' ' + Dr(i[0])
          : 'as no adapter specified';
        throw new D(
          'There is no suitable adapter to dispatch the request ' + l,
          'ERR_NOT_SUPPORT'
        );
      }
      return o;
    },
    adapters: Qt,
  };
function Ft(t) {
  if (
    (t.cancelToken && t.cancelToken.throwIfRequested(),
    t.signal && t.signal.aborted)
  )
    throw new $e(null, t);
}
function Nr(t) {
  return (
    Ft(t),
    (t.headers = ae.from(t.headers)),
    (t.data = Lt.call(t, t.transformRequest)),
    ['post', 'put', 'patch'].includes(t.method) &&
      t.headers.setContentType('application/x-www-form-urlencoded', !1),
    ws
      .getAdapter(
        t.adapter || nt.adapter,
        t
      )(t)
      .then(
        function (n) {
          return (
            Ft(t),
            (n.data = Lt.call(t, t.transformResponse, n)),
            (n.headers = ae.from(n.headers)),
            n
          );
        },
        function (error) {
          return (
            ms(error) ||
              (Ft(t),
              error &&
                error.response &&
                ((error.response.data = Lt.call(
                  t,
                  t.transformResponse,
                  error.response
                )),
                (error.response.headers = ae.from(error.response.headers)))),
            Promise.reject(error)
          );
        }
      )
  );
}
const vs = '1.12.2',
  Ot = {};
for (const [e, t] of [
  'object',
  'boolean',
  'number',
  'function',
  'string',
  'symbol',
].entries()) {
  Ot[t] = function (n) {
    return typeof n === t || 'a' + (e < 1 ? 'n ' : ' ') + t;
  };
}
const zr = {};
Ot.transitional = function (e, s, n) {
  function o(a, i) {
    return (
      '[Axios v' +
      vs +
      "] Transitional option '" +
      a +
      "'" +
      i +
      (n ? '. ' + n : '')
    );
  }
  return (a, i, l) => {
    if (e === !1)
      throw new D(
        o(i, ' has been removed' + (s ? ' in ' + s : '')),
        D.ERR_DEPRECATED
      );
    return (
      s &&
        !zr[i] &&
        ((zr[i] = !0),
        console.warn(
          o(
            i,
            ' has been deprecated since v' +
              s +
              ' and will be removed in the near future'
          )
        )),
      e ? e(a, i, l) : !0
    );
  };
};
Ot.spelling = function (e) {
  return (s, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
};
function ba(t, e, s) {
  if (typeof t != 'object')
    throw new D('options must be an object', D.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t);
  let o = n.length;
  for (; o-- > 0; ) {
    const a = n[o],
      i = e[a];
    if (i) {
      const l = t[a],
        p = l === void 0 || i(l, a, t);
      if (p !== !0)
        throw new D('option ' + a + ' must be ' + p, D.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (s !== !0) throw new D('Unknown option ' + a, D.ERR_BAD_OPTION);
  }
}
const vt = { assertOptions: ba, validators: Ot },
  je = vt.validators;
let Oe = class {
  constructor(e) {
    ((this.defaults = e || {}),
      (this.interceptors = { request: new Sr(), response: new Sr() }));
  }
  async request(e, s) {
    try {
      return await this._request(e, s);
    } catch (error) {
      if (error instanceof Error) {
        let o = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(o)
          : (o = new Error());
        const a = o.stack ? o.stack.replace(/^.+\n/, '') : '';
        try {
          error.stack
            ? a &&
              !String(error.stack).endsWith(a.replace(/^.+\n.+\n/, '')) &&
              (error.stack +=
                `
` + a)
            : (error.stack = a);
        } catch {}
      }
      throw error;
    }
  }
  _request(e, s) {
    (typeof e == 'string' ? ((s = s || {}), (s.url = e)) : (s = e || {}),
      (s = De(this.defaults, s)));
    const { transitional: n, paramsSerializer: o, headers: a } = s;
    (n !== void 0 &&
      vt.assertOptions(
        n,
        {
          silentJSONParsing: je.transitional(je.boolean),
          forcedJSONParsing: je.transitional(je.boolean),
          clarifyTimeoutError: je.transitional(je.boolean),
        },
        !1
      ),
      o != null &&
        (x.isFunction(o)
          ? (s.paramsSerializer = { serialize: o })
          : vt.assertOptions(
              o,
              { encode: je.function, serialize: je.function },
              !0
            )),
      s.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls === void 0
          ? (s.allowAbsoluteUrls = !0)
          : (s.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)),
      vt.assertOptions(
        s,
        {
          baseUrl: je.spelling('baseURL'),
          withXsrfToken: je.spelling('withXSRFToken'),
        },
        !0
      ),
      (s.method = (s.method || this.defaults.method || 'get').toLowerCase()));
    let i = a && x.merge(a.common, a[s.method]);
    (a &&
      x.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        c => {
          delete a[c];
        }
      ),
      (s.headers = ae.concat(i, a)));
    const l = [];
    let p = !0;
    for (const g of this.interceptors.request) {
      (typeof g.runWhen == 'function' && g.runWhen(s) === !1) ||
        ((p = p && g.synchronous), l.unshift(g.fulfilled, g.rejected));
    }
    const f = [];
    for (const g of this.interceptors.response) {
      f.push(g.fulfilled, g.rejected);
    }
    let d,
      y = 0,
      S;
    if (!p) {
      const c = [Nr.bind(this), void 0];
      for (
        c.unshift(...l), c.push(...f), S = c.length, d = Promise.resolve(s);
        y < S;

      )
        d = d.then(c[y++], c[y++]);
      return d;
    }
    S = l.length;
    let w = s;
    for (; y < S; ) {
      const c = l[y++],
        g = l[y++];
      try {
        w = c(w);
      } catch (error) {
        g.call(this, error);
        break;
      }
    }
    try {
      d = Nr.call(this, w);
    } catch (error) {
      return Promise.reject(error);
    }
    for (y = 0, S = f.length; y < S; ) d = d.then(f[y++], f[y++]);
    return d;
  }
  getUri(e) {
    e = De(this.defaults, e);
    const s = bs(e.baseURL, e.url, e.allowAbsoluteUrls);
    return hs(s, e.params, e.paramsSerializer);
  }
};
x.forEach(['delete', 'get', 'head', 'options'], function (e) {
  Oe.prototype[e] = function (s, n) {
    return this.request(
      De(n || {}, { method: e, url: s, data: (n || {}).data })
    );
  };
});
x.forEach(['post', 'put', 'patch'], function (e) {
  function s(n) {
    return function (a, i, l) {
      return this.request(
        De(l || {}, {
          method: e,
          headers: n ? { 'Content-Type': 'multipart/form-data' } : {},
          url: a,
          data: i,
        })
      );
    };
  }
  ((Oe.prototype[e] = s()), (Oe.prototype[e + 'Form'] = s(!0)));
});
let ya = class Ss {
  constructor(e) {
    if (typeof e != 'function')
      throw new TypeError('executor must be a function.');
    let s;
    this.promise = new Promise(function (a) {
      s = a;
    });
    const n = this;
    (this.promise.then(o => {
      if (!n._listeners) return;
      let a = n._listeners.length;
      for (; a-- > 0; ) n._listeners[a](o);
      n._listeners = null;
    }),
      (this.promise.then = o => {
        let a;
        const i = new Promise(l => {
          (n.subscribe(l), (a = l));
        }).then(o);
        return (
          (i.cancel = function () {
            n.unsubscribe(a);
          }),
          i
        );
      }),
      e(function (a, i, l) {
        n.reason || ((n.reason = new $e(a, i, l)), s(n.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
  }
  unsubscribe(e) {
    if (!this._listeners) return;
    const s = this._listeners.indexOf(e);
    s !== -1 && this._listeners.splice(s, 1);
  }
  toAbortSignal() {
    const e = new AbortController(),
      s = n => {
        e.abort(n);
      };
    return (
      this.subscribe(s),
      (e.signal.unsubscribe = () => this.unsubscribe(s)),
      e.signal
    );
  }
  static source() {
    let e;
    return {
      token: new Ss(function (o) {
        e = o;
      }),
      cancel: e,
    };
  }
};
function ja(t) {
  return function (s) {
    return t.apply(null, s);
  };
}
function wa(t) {
  return x.isObject(t) && t.isAxiosError === !0;
}
const Zt = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
for (const [t, e] of Object.entries(Zt)) {
  Zt[e] = t;
}
function ks(t) {
  const e = new Oe(t),
    s = ts(Oe.prototype.request, e);
  return (
    x.extend(s, Oe.prototype, e, { allOwnKeys: !0 }),
    x.extend(s, e, null, { allOwnKeys: !0 }),
    (s.create = function (o) {
      return ks(De(t, o));
    }),
    s
  );
}
const O = ks(nt);
O.Axios = Oe;
O.CanceledError = $e;
O.CancelToken = ya;
O.isCancel = ms;
O.VERSION = vs;
O.toFormData = Pt;
O.AxiosError = D;
O.Cancel = O.CanceledError;
O.all = function (e) {
  return Promise.all(e);
};
O.spread = ja;
O.isAxiosError = wa;
O.mergeConfig = De;
O.AxiosHeaders = ae;
O.formToJSON = t => xs(x.isHTMLForm(t) ? new FormData(t) : t);
O.getAdapter = ws.getAdapter;
O.HttpStatusCode = Zt;
O.default = O;
const {
    Axios: kl,
    AxiosError: Cl,
    CanceledError: Al,
    isCancel: El,
    CancelToken: Rl,
    VERSION: Il,
    all: Tl,
    Cancel: Pl,
    isAxiosError: Ol,
    spread: Dl,
    toFormData: Nl,
    AxiosHeaders: zl,
    HttpStatusCode: Bl,
    formToJSON: Ml,
    getAdapter: Ll,
    mergeConfig: Fl,
  } = O,
  va = { projects: [], currentProject: null, loading: !1, error: null },
  Fe = $('projects/fetchProjects', async (t, { rejectWithValue: e }) => {
    var s, n;
    try {
      return (await O.get('/api/projects')).data;
    } catch (error) {
      return e(
        ((n = (s = error.response) == null ? void 0 : s.data) == null
          ? void 0
          : n.error) || 'Failed to fetch projects'
      );
    }
  }),
  Ze = $('projects/scanProjects', async (t, { rejectWithValue: e }) => {
    var s, n;
    try {
      return (await O.get('/api/projects/scan', { params: { path: t } })).data;
    } catch (error) {
      return e(
        ((n = (s = error.response) == null ? void 0 : s.data) == null
          ? void 0
          : n.error) || 'Failed to scan projects'
      );
    }
  }),
  Cs = $('projects/selectProject', async (t, { rejectWithValue: e }) => {
    var s, n;
    try {
      return (await O.get(`/api/projects/${t}`)).data;
    } catch (error) {
      return e(
        ((n = (s = error.response) == null ? void 0 : s.data) == null
          ? void 0
          : n.error) || 'Failed to select project'
      );
    }
  }),
  As = $('projects/createProject', async (t, { rejectWithValue: e }) => {
    var s, n;
    try {
      return (await O.post('/api/projects', t)).data;
    } catch (error) {
      return e(
        ((n = (s = error.response) == null ? void 0 : s.data) == null
          ? void 0
          : n.error) || 'Failed to create project'
      );
    }
  }),
  Sa = $(
    'projects/updateProject',
    async ({ id: t, data: e }, { rejectWithValue: s }) => {
      var n, o;
      try {
        return (await O.put(`/api/projects/${t}`, e)).data;
      } catch (error) {
        return s(
          ((o = (n = error.response) == null ? void 0 : n.data) == null
            ? void 0
            : o.error) || 'Failed to update project'
        );
      }
    }
  ),
  ka = $('projects/deleteProject', async (t, { rejectWithValue: e }) => {
    var s, n;
    try {
      return (await O.delete(`/api/projects/${t}`), t);
    } catch (error) {
      return e(
        ((n = (s = error.response) == null ? void 0 : s.data) == null
          ? void 0
          : n.error) || 'Failed to delete project'
      );
    }
  }),
  Es = $('projects/setActiveProject', async (t, { rejectWithValue: e }) => {
    var s, n;
    try {
      return (await O.post(`/api/projects/${t}/set-active`)).data;
    } catch (error) {
      return e(
        ((n = (s = error.response) == null ? void 0 : s.data) == null
          ? void 0
          : n.error) || 'Failed to set active project'
      );
    }
  }),
  Rs = $('projects/getActiveProject', async (t, { rejectWithValue: e }) => {
    var s, n;
    try {
      return (await O.get('/api/projects/active')).data;
    } catch (error) {
      return e(
        ((n = (s = error.response) == null ? void 0 : s.data) == null
          ? void 0
          : n.error) || 'Failed to get active project'
      );
    }
  }),
  Is = $('projects/clearActiveProject', async (t, { rejectWithValue: e }) => {
    var s, n;
    try {
      return (await O.delete('/api/projects/active'), !0);
    } catch (error) {
      return e(
        ((n = (s = error.response) == null ? void 0 : s.data) == null
          ? void 0
          : n.error) || 'Failed to clear active project'
      );
    }
  }),
  Ts = $('projects/switchToProject', async (t, { rejectWithValue: e }) => {
    var s, n;
    try {
      return (await O.post(`/api/projects/${t}/switch`)).data;
    } catch (error) {
      return e(
        ((n = (s = error.response) == null ? void 0 : s.data) == null
          ? void 0
          : n.error) || 'Failed to switch project'
      );
    }
  }),
  Ca = $(
    'projects/getNavigationHistory',
    async (t = 10, { rejectWithValue: e }) => {
      var s, n;
      try {
        return (await O.get('/api/projects/history', { params: { limit: t } }))
          .data;
      } catch (error) {
        return e(
          ((n = (s = error.response) == null ? void 0 : s.data) == null
            ? void 0
            : n.error) || 'Failed to get navigation history'
        );
      }
    }
  ),
  Ps = ze({
    name: 'projects',
    initialState: va,
    reducers: {
      clearError: t => {
        t.error = null;
      },
      setCurrentProject: (t, e) => {
        t.currentProject = e.payload;
      },
    },
    extraReducers: t => {
      t.addCase(Fe.pending, e => {
        ((e.loading = !0), (e.error = null));
      })
        .addCase(Fe.fulfilled, (e, s) => {
          ((e.loading = !1), (e.projects = s.payload));
        })
        .addCase(Fe.rejected, (e, s) => {
          ((e.loading = !1), (e.error = s.payload));
        })
        .addCase(Ze.pending, e => {
          ((e.loading = !0), (e.error = null));
        })
        .addCase(Ze.fulfilled, (e, s) => {
          e.loading = !1;
          const n = s.payload.filter(o => !e.projects.some(a => a.id === o.id));
          e.projects = [...e.projects, ...n];
        })
        .addCase(Ze.rejected, (e, s) => {
          ((e.loading = !1), (e.error = s.payload));
        })
        .addCase(Cs.fulfilled, (e, s) => {
          e.currentProject = s.payload;
        })
        .addCase(As.fulfilled, (e, s) => {
          e.projects.unshift(s.payload);
        })
        .addCase(Sa.fulfilled, (e, s) => {
          var o;
          const n = e.projects.findIndex(a => a.id === s.payload.id);
          (n !== -1 && (e.projects[n] = s.payload),
            ((o = e.currentProject) == null ? void 0 : o.id) === s.payload.id &&
              (e.currentProject = s.payload));
        })
        .addCase(ka.fulfilled, (e, s) => {
          var n;
          ((e.projects = e.projects.filter(o => o.id !== s.payload)),
            ((n = e.currentProject) == null ? void 0 : n.id) === s.payload &&
              (e.currentProject = null));
        })
        .addCase(Es.fulfilled, (e, s) => {
          const n = s.payload;
          ((e.currentProject = n),
            Array.isArray(e.projects) &&
              (e.projects = e.projects.map(o =>
                o.id === n.id ? { ...o, isActive: !0 } : { ...o, isActive: !1 }
              )));
        })
        .addCase(Rs.fulfilled, (e, s) => {
          ((e.currentProject = s.payload),
            Array.isArray(e.projects) &&
              (e.projects = e.projects.map(n => {
                var o;
                return n.id === ((o = s.payload) == null ? void 0 : o.id)
                  ? { ...n, isActive: !0 }
                  : { ...n, isActive: !1 };
              })));
        })
        .addCase(Is.fulfilled, e => {
          ((e.currentProject = null),
            Array.isArray(e.projects) &&
              (e.projects = e.projects.map(s => ({ ...s, isActive: !1 }))));
        })
        .addCase(Ts.fulfilled, (e, s) => {
          ((e.currentProject = s.payload),
            Array.isArray(e.projects) &&
              (e.projects = e.projects.map(n =>
                n.id === s.payload.id
                  ? { ...n, isActive: !0 }
                  : { ...n, isActive: !1 }
              )));
        });
    },
  }),
  { clearError: Wl, setCurrentProject: Ul } = Ps.actions,
  Aa = Ps.reducer,
  Ea = { workflows: [], executions: [], loading: !1, error: null },
  St = $(
    'workflows/fetchWorkflows',
    async ({ projectId: t, projectPath: e }, { rejectWithValue: s }) => {
      var n, o;
      try {
        return (await O.get(`/api/workflows/${t}`, { params: { path: e } }))
          .data;
      } catch (error) {
        return s(
          ((o = (n = error.response) == null ? void 0 : n.data) == null
            ? void 0
            : o.error) || 'Failed to fetch workflows'
        );
      }
    }
  ),
  Os = $(
    'workflows/executeWorkflow',
    async (
      { projectId: t, workflowId: e, params: s },
      { rejectWithValue: n }
    ) => {
      var o, a;
      try {
        return (
          await O.post(`/api/workflows/${t}/execute`, {
            workflowId: e,
            params: s,
          })
        ).data;
      } catch (error) {
        return n(
          ((a = (o = error.response) == null ? void 0 : o.data) == null
            ? void 0
            : a.error) || 'Failed to execute workflow'
        );
      }
    }
  ),
  Ra = $('workflows/fetchExecutions', async (t, { rejectWithValue: e }) => {
    var s, n;
    try {
      return (await O.get(`/api/workflows/${t}/executions`)).data;
    } catch (error) {
      return e(
        ((n = (s = error.response) == null ? void 0 : s.data) == null
          ? void 0
          : n.error) || 'Failed to fetch executions'
      );
    }
  }),
  Ds = ze({
    name: 'workflows',
    initialState: Ea,
    reducers: {
      clearError: t => {
        t.error = null;
      },
      updateExecution: (t, e) => {
        const s = t.executions.findIndex(n => n.id === e.payload.id);
        s === -1
          ? t.executions.unshift(e.payload)
          : (t.executions[s] = { ...t.executions[s], ...e.payload });
      },
      updateExecutionProgress: (t, e) => {
        const {
            executionId: s,
            progress: n,
            currentStep: o,
            output: a,
          } = e.payload,
          i = t.executions.findIndex(l => l.id === s);
        i !== -1 &&
          (t.executions[i] = {
            ...t.executions[i],
            progress: n,
            currentStep: o,
            lastOutput: a,
            lastUpdate: new Date().toISOString(),
          });
      },
    },
    extraReducers: t => {
      t.addCase(St.pending, e => {
        ((e.loading = !0), (e.error = null));
      })
        .addCase(St.fulfilled, (e, s) => {
          ((e.loading = !1), (e.workflows = s.payload));
        })
        .addCase(St.rejected, (e, s) => {
          ((e.loading = !1), (e.error = s.payload));
        })
        .addCase(Os.fulfilled, (e, s) => {
          e.executions.unshift(s.payload);
        })
        .addCase(Ra.fulfilled, (e, s) => {
          e.executions = s.payload;
        });
    },
  }),
  {
    clearError: $l,
    updateExecution: Br,
    updateExecutionProgress: Ia,
  } = Ds.actions,
  Ta = Ds.reducer,
  Pa = {
    agents: [],
    activeAgents: [],
    sessions: [],
    configurations: [],
    loading: !1,
    error: null,
  },
  kt = $(
    'agents/fetchAgents',
    async ({ projectId: t, projectPath: e }, { rejectWithValue: s }) => {
      var n, o;
      try {
        return (await O.get(`/api/agents/${t}`, { params: { path: e } })).data;
      } catch (error) {
        return s(
          ((o = (n = error.response) == null ? void 0 : n.data) == null
            ? void 0
            : o.error) || 'Failed to fetch agents'
        );
      }
    }
  ),
  Oa = $('agents/fetchActiveAgents', async (t, { rejectWithValue: e }) => {
    var s, n;
    try {
      return (await O.get(`/api/agents/${t}/active`)).data;
    } catch (error) {
      return e(
        ((n = (s = error.response) == null ? void 0 : s.data) == null
          ? void 0
          : n.error) || 'Failed to fetch active agents'
      );
    }
  }),
  Ns = $(
    'agents/activateAgent',
    async (
      { projectId: t, agentId: e, context: s },
      { rejectWithValue: n }
    ) => {
      var o, a;
      try {
        return (
          await O.post(`/api/agents/${t}/activate`, { agentId: e, context: s })
        ).data;
      } catch (error) {
        return n(
          ((a = (o = error.response) == null ? void 0 : o.data) == null
            ? void 0
            : a.error) || 'Failed to activate agent'
        );
      }
    }
  ),
  Da = $('agents/deactivateAgent', async (t, { rejectWithValue: e }) => {
    var s, n;
    try {
      return (await O.post(`/api/agents/deactivate/${t}`), t);
    } catch (error) {
      return e(
        ((n = (s = error.response) == null ? void 0 : s.data) == null
          ? void 0
          : n.error) || 'Failed to deactivate agent'
      );
    }
  }),
  Na = $('agents/fetchAgentSessions', async (t, { rejectWithValue: e }) => {
    var s, n;
    try {
      return (await O.get(`/api/agents/${t}/sessions`)).data;
    } catch (error) {
      return e(
        ((n = (s = error.response) == null ? void 0 : s.data) == null
          ? void 0
          : n.error) || 'Failed to fetch agent sessions'
      );
    }
  }),
  za = $(
    'agents/configureAgent',
    async (
      { projectId: t, agentId: e, settings: s, preferences: n, userId: o },
      { rejectWithValue: a }
    ) => {
      var i, l;
      try {
        return (
          await O.post(`/api/agents/${t}/agent/${e}/configure`, {
            settings: s,
            preferences: n,
            userId: o,
          })
        ).data;
      } catch (error) {
        return a(
          ((l = (i = error.response) == null ? void 0 : i.data) == null
            ? void 0
            : l.error) || 'Failed to configure agent'
        );
      }
    }
  ),
  Ba = $(
    'agents/reloadAgent',
    async ({ projectId: t, agentId: e }, { rejectWithValue: s }) => {
      var n, o;
      try {
        return (await O.post(`/api/agents/${t}/agent/${e}/reload`), e);
      } catch (error) {
        return s(
          ((o = (n = error.response) == null ? void 0 : n.data) == null
            ? void 0
            : o.error) || 'Failed to reload agent'
        );
      }
    }
  );
$(
  'agents/validateAgent',
  async (
    { projectId: t, agentId: e, projectPath: s },
    { rejectWithValue: n }
  ) => {
    var o, a;
    try {
      return (
        await O.post(
          `/api/agents/${t}/agent/${e}/validate`,
          {},
          { params: { path: s } }
        )
      ).data;
    } catch (error) {
      return n(
        ((a = (o = error.response) == null ? void 0 : o.data) == null
          ? void 0
          : a.error) || 'Failed to validate agent'
      );
    }
  }
);
$('agents/fetchAgentStatistics', async (t, { rejectWithValue: e }) => {
  var s, n;
  try {
    return (await O.get(`/api/agents/${t}/statistics`)).data;
  } catch (error) {
    return e(
      ((n = (s = error.response) == null ? void 0 : s.data) == null
        ? void 0
        : n.error) || 'Failed to fetch agent statistics'
    );
  }
});
const zs = ze({
    name: 'agents',
    initialState: Pa,
    reducers: {
      clearError: t => {
        t.error = null;
      },
      updateAgentStatus: (t, e) => {
        const { agentId: s, status: n } = e.payload,
          o = t.agents.findIndex(a => a.id === s);
        o !== -1 && (t.agents[o].status = { ...t.agents[o].status, ...n });
      },
      addSession: (t, e) => {
        t.sessions.unshift(e.payload);
      },
      updateSession: (t, e) => {
        const s = t.sessions.findIndex(n => n.id === e.payload.id);
        s !== -1 && (t.sessions[s] = { ...t.sessions[s], ...e.payload });
      },
      removeSession: (t, e) => {
        t.sessions = t.sessions.filter(s => s.id !== e.payload);
      },
      addConfiguration: (t, e) => {
        t.configurations.push(e.payload);
      },
      updateConfiguration: (t, e) => {
        const s = t.configurations.findIndex(n => n.id === e.payload.id);
        s !== -1 && (t.configurations[s] = e.payload);
      },
    },
    extraReducers: t => {
      t.addCase(kt.pending, e => {
        ((e.loading = !0), (e.error = null));
      })
        .addCase(kt.fulfilled, (e, s) => {
          ((e.loading = !1), (e.agents = s.payload));
        })
        .addCase(kt.rejected, (e, s) => {
          ((e.loading = !1), (e.error = s.payload));
        })
        .addCase(Oa.fulfilled, (e, s) => {
          e.activeAgents = s.payload.map(n => n.id);
        })
        .addCase(Ns.fulfilled, (e, s) => {
          const n = s.payload;
          (e.sessions.unshift(n),
            e.activeAgents.includes(n.agentId) ||
              e.activeAgents.push(n.agentId));
        })
        .addCase(Da.fulfilled, (e, s) => {
          e.sessions = e.sessions.filter(n => n.id !== s.payload);
        })
        .addCase(Na.fulfilled, (e, s) => {
          ((e.sessions = s.payload),
            (e.activeAgents = s.payload
              .filter(n => n.status === 'active')
              .map(n => n.agentId)));
        })
        .addCase(za.fulfilled, (e, s) => {
          const n = s.payload,
            o = e.configurations.findIndex(a => a.id === n.id);
          o === -1 ? e.configurations.push(n) : (e.configurations[o] = n);
        })
        .addCase(Ba.fulfilled, (e, s) => {
          const n = e.agents.findIndex(o => o.id === s.payload);
          n !== -1 &&
            (e.agents[n].status = { ...e.agents[n].status, state: 'loading' });
        });
    },
  }),
  {
    clearError: _l,
    updateAgentStatus: Hl,
    addSession: ql,
    updateSession: Vl,
    removeSession: Gl,
    addConfiguration: Jl,
    updateConfiguration: Kl,
  } = zs.actions,
  Ma = zs.reducer,
  La = {
    connectedIDEs: {},
    availableIDEs: [
      {
        type: 'cursor',
        name: 'Cursor AI',
        description: 'Integrated development environment with AI assistance',
        capabilities: {
          agents: !0,
          workflows: !0,
          contextSync: !0,
          fileSync: !0,
          realTime: !0,
        },
      },
      {
        type: 'claude-code',
        name: 'Claude Code',
        description: 'AI-powered coding assistant',
        capabilities: {
          agents: !0,
          workflows: !1,
          contextSync: !0,
          fileSync: !1,
          realTime: !1,
        },
      },
      {
        type: 'gemini',
        name: 'Gemini CLI',
        description: "Google's AI assistant for coding",
        capabilities: {
          agents: !1,
          workflows: !1,
          contextSync: !0,
          fileSync: !1,
          realTime: !1,
        },
      },
    ],
    loading: !1,
    error: null,
  },
  Fa = $('ideHub/connectIDE', async (t, { rejectWithValue: e }) => {
    try {
      return t;
    } catch (error) {
      return e(error.message || 'Failed to connect IDE');
    }
  }),
  Wa = $('ideHub/disconnectIDE', async (t, { rejectWithValue: e }) => {
    try {
      return t;
    } catch (error) {
      return e(error.message || 'Failed to disconnect IDE');
    }
  }),
  Bs = ze({
    name: 'ideHub',
    initialState: La,
    reducers: {
      toggleIDE: (t, e) => {
        const s = e.payload,
          n = t.connectedIDEs[s] || !1;
        t.connectedIDEs[s] = !n;
      },
      setIDEStatus: (t, e) => {
        const { ideType: s, status: n } = e.payload;
        t.connectedIDEs[s] = n;
      },
    },
    extraReducers: t => {
      t.addCase(Fa.fulfilled, (e, s) => {
        e.connectedIDEs[s.payload] = !0;
      }).addCase(Wa.fulfilled, (e, s) => {
        e.connectedIDEs[s.payload] = !1;
      });
    },
  }),
  { toggleIDE: Ua, setIDEStatus: Xl } = Bs.actions,
  $a = Bs.reducer,
  _a = {
    currentProject: null,
    metrics: {
      activeWorkflows: 0,
      activeStories: 0,
      completedTasks: 0,
      healthScore: 100,
      lastUpdated: new Date().toISOString(),
    },
    activityFeed: [],
  },
  Ms = ze({
    name: 'dashboard',
    initialState: _a,
    reducers: {
      setCurrentProject: (t, e) => {
        t.currentProject = e.payload;
      },
      updateMetrics: (t, e) => {
        t.metrics = { ...t.metrics, ...e.payload };
      },
      addActivityItem: (t, e) => {
        (t.activityFeed.unshift(e.payload),
          t.activityFeed.length > 50 &&
            (t.activityFeed = t.activityFeed.slice(0, 50)));
      },
      clearActivityFeed: t => {
        t.activityFeed = [];
      },
    },
  }),
  {
    setCurrentProject: Yl,
    updateMetrics: Ha,
    addActivityItem: Ql,
    clearActivityFeed: Zl,
  } = Ms.actions,
  qa = Ms.reducer,
  Va = { theme: 'dark', sidebarOpen: !0, notifications: [] },
  Ls = ze({
    name: 'ui',
    initialState: Va,
    reducers: {
      toggleTheme: t => {
        t.theme = t.theme === 'light' ? 'dark' : 'light';
      },
      toggleSidebar: t => {
        t.sidebarOpen = !t.sidebarOpen;
      },
      addNotification: (t, e) => {
        const s = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          read: !1,
          ...e.payload,
        };
        (t.notifications.unshift(s),
          t.notifications.length > 20 &&
            (t.notifications = t.notifications.slice(0, 20)));
      },
      markNotificationAsRead: (t, e) => {
        const s = t.notifications.find(n => n.id === e.payload);
        s && (s.read = !0);
      },
      removeNotification: (t, e) => {
        t.notifications = t.notifications.filter(s => s.id !== e.payload);
      },
      clearAllNotifications: t => {
        t.notifications = [];
      },
    },
  }),
  {
    toggleTheme: ec,
    toggleSidebar: tc,
    addNotification: rc,
    markNotificationAsRead: sc,
    removeNotification: nc,
    clearAllNotifications: oc,
  } = Ls.actions,
  Ga = Ls.reducer,
  Ja = {
    user: null,
    token: null,
    isAuthenticated: !1,
    isLoading: !0,
    error: null,
  },
  Wt = $(
    'auth/loginUser',
    async ({ username: t, password: e }, { rejectWithValue: s }) => {
      try {
        const n = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: t, password: e }),
        });
        if (!n.ok) {
          const a = await n.json();
          throw new Error(a.error || 'Login failed');
        }
        const o = await n.json();
        return (
          localStorage.setItem('accessToken', o.accessToken),
          { user: o.user, token: o.accessToken }
        );
      } catch (error) {
        return s(error.message);
      }
    }
  ),
  Ut = $(
    'auth/registerUser',
    async (
      { username: t, email: e, password: s, role: n },
      { rejectWithValue: o }
    ) => {
      try {
        const a = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: t, email: e, password: s, role: n }),
        });
        if (!a.ok) {
          const f = await a.json();
          throw new Error(f.error || 'Registration failed');
        }
        const i = await a.json(),
          l = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: t, password: s }),
          });
        if (!l.ok) throw new Error('Registration successful but login failed');
        const p = await l.json();
        return (
          localStorage.setItem('accessToken', p.accessToken),
          { user: p.user, token: p.accessToken }
        );
      } catch (error) {
        return o(error.message);
      }
    }
  ),
  Fs = $('auth/logoutUser', async (t, { rejectWithValue: e }) => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {}
    return (localStorage.removeItem('accessToken'), !0);
  }),
  $t = $('auth/verifyAuth', async (t, { rejectWithValue: e }) => {
    try {
      const s = localStorage.getItem('accessToken');
      if (!s) throw new Error('No token found');
      const n = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${s}` },
      });
      if (!n.ok)
        throw (
          localStorage.removeItem('accessToken'),
          new Error('Token verification failed')
        );
      return { user: (await n.json()).user, token: s };
    } catch (error) {
      return e(error.message);
    }
  }),
  Ws = ze({
    name: 'auth',
    initialState: Ja,
    reducers: {
      clearError: t => {
        t.error = null;
      },
      setLoading: (t, e) => {
        t.isLoading = e.payload;
      },
    },
    extraReducers: t => {
      t.addCase(Wt.pending, e => {
        ((e.isLoading = !0), (e.error = null));
      })
        .addCase(Wt.fulfilled, (e, s) => {
          ((e.isLoading = !1),
            (e.isAuthenticated = !0),
            (e.user = s.payload.user),
            (e.token = s.payload.token),
            (e.error = null));
        })
        .addCase(Wt.rejected, (e, s) => {
          ((e.isLoading = !1), (e.error = s.payload));
        })
        .addCase(Ut.pending, e => {
          ((e.isLoading = !0), (e.error = null));
        })
        .addCase(Ut.fulfilled, (e, s) => {
          ((e.isLoading = !1),
            (e.isAuthenticated = !0),
            (e.user = s.payload.user),
            (e.token = s.payload.token),
            (e.error = null));
        })
        .addCase(Ut.rejected, (e, s) => {
          ((e.isLoading = !1), (e.error = s.payload));
        })
        .addCase(Fs.fulfilled, e => {
          ((e.user = null),
            (e.token = null),
            (e.isAuthenticated = !1),
            (e.isLoading = !1),
            (e.error = null));
        })
        .addCase($t.pending, e => {
          e.isLoading = !0;
        })
        .addCase($t.fulfilled, (e, s) => {
          ((e.isLoading = !1),
            (e.isAuthenticated = !0),
            (e.user = s.payload.user),
            (e.token = s.payload.token),
            (e.error = null));
        })
        .addCase($t.rejected, e => {
          ((e.isLoading = !1),
            (e.isAuthenticated = !1),
            (e.user = null),
            (e.token = null),
            (e.error = null));
        });
    },
  }),
  { clearError: ac, setLoading: ic } = Ws.actions,
  Ka = Ws.reducer,
  Xa = $n({
    reducer: {
      projects: Aa,
      workflows: Ta,
      agents: Ma,
      ideHub: $a,
      dashboard: qa,
      ui: Ga,
      auth: Ka,
    },
    middleware: t =>
      t({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
  }),
  z = {
    colors: {
      primary: { 400: '#42a5f5', 600: '#1e88e5', 800: '#1565c0' },
      secondary: { 300: '#f06292', 500: '#e91e63', 700: '#c2185b' },
      success: { 300: '#81c784', 500: '#4caf50', 700: '#388e3c' },
      warning: { 300: '#ffd54f', 500: '#ffc107', 700: '#ffa000' },
      error: { 300: '#e57373', 500: '#f44336', 700: '#d32f2f' },
      grey: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
      },
      background: { default: '#0a0a0a', paper: '#1a1a1a', elevated: '#2d2d2d' },
    },
    spacing: { xs: 4, sm: 8, lg: 24 },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
    borderRadius: { md: 8 },
    shadows: [
      'none',
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
      '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
      '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
      '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
      '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
      '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
      '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
      '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
      '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
      '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
      '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
      '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
      '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
      '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
      '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
      '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
      '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
      '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
      '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
      '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
      '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
      '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
      '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
    ],
  },
  Ya = sn({
    palette: {
      mode: 'dark',
      primary: {
        main: z.colors.primary[600],
        light: z.colors.primary[400],
        dark: z.colors.primary[800],
        contrastText: '#ffffff',
      },
      secondary: {
        main: z.colors.secondary[500],
        light: z.colors.secondary[300],
        dark: z.colors.secondary[700],
        contrastText: '#ffffff',
      },
      success: {
        main: z.colors.success[500],
        light: z.colors.success[300],
        dark: z.colors.success[700],
      },
      warning: {
        main: z.colors.warning[500],
        light: z.colors.warning[300],
        dark: z.colors.warning[700],
      },
      error: {
        main: z.colors.error[500],
        light: z.colors.error[300],
        dark: z.colors.error[700],
      },
      background: {
        default: z.colors.background.default,
        paper: z.colors.background.paper,
      },
      grey: z.colors.grey,
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)',
      },
      divider: 'rgba(255, 255, 255, 0.12)',
    },
    typography: {
      fontFamily: z.typography.fontFamily,
      fontSize: z.typography.fontSize,
      fontWeightLight: z.typography.fontWeightLight,
      fontWeightRegular: z.typography.fontWeightRegular,
      fontWeightMedium: z.typography.fontWeightMedium,
      fontWeightBold: z.typography.fontWeightBold,
      h1: { fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.2 },
      h2: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.2 },
      h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.2 },
      h4: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.2 },
      h5: { fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.2 },
      h6: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.2 },
      body1: { fontSize: '1rem', lineHeight: 1.5 },
      body2: { fontSize: '0.875rem', lineHeight: 1.5 },
      button: { textTransform: 'none', fontWeight: 500 },
    },
    spacing: z.spacing.xs,
    shape: { borderRadius: z.borderRadius.md },
    shadows: z.shadows,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: `${z.colors.grey[600]} ${z.colors.background.default}`,
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              backgroundColor: z.colors.background.default,
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: z.colors.grey[600],
              minHeight: 24,
            },
            '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
              { backgroundColor: z.colors.grey[500] },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: z.borderRadius.md,
            textTransform: 'none',
            fontWeight: 500,
            padding: `${z.spacing.sm}px ${z.spacing.lg}px`,
          },
          contained: {
            boxShadow:
              '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
            '&:hover': {
              boxShadow:
                '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
          elevation1: {
            boxShadow:
              '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
          },
          elevation2: {
            boxShadow:
              '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
          },
          elevation3: {
            boxShadow:
              '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: z.colors.background.elevated,
            borderBottom: `1px solid ${z.colors.grey[800]}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: z.colors.background.elevated,
            borderRight: `1px solid ${z.colors.grey[800]}`,
          },
        },
      },
    },
  });
function Mr(t) {
  const { children: e, value: s, index: n, ...o } = t;
  return r.jsx('div', {
    role: 'tabpanel',
    hidden: s !== n,
    id: `auth-tabpanel-${n}`,
    'aria-labelledby': `auth-tab-${n}`,
    ...o,
    children: s === n && r.jsx(j, { sx: { p: 3 }, children: e }),
  });
}
function Lr({ open: t, onClose: e, onLoginSuccess: s }) {
  const [n, o] = A.useState(0),
    [a, i] = A.useState(!1),
    [l, p] = A.useState(!1),
    [f, d] = A.useState(''),
    [y, S] = A.useState({ username: '', password: '' }),
    [w, c] = A.useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user',
    }),
    g = (R, P) => {
      (o(P), d(''));
    },
    b = async () => {
      var R, P;
      if (!y.username || !y.password) {
        d('Veuillez remplir tous les champs');
        return;
      }
      (p(!0), d(''));
      try {
        const M = await O.post('/api/auth/login', y);
        (localStorage.setItem('accessToken', M.data.accessToken),
          s(M.data.user, M.data.accessToken),
          e());
      } catch (error) {
        d(
          ((P = (R = error.response) == null ? void 0 : R.data) == null
            ? void 0
            : P.error) || 'Erreur de connexion'
        );
      } finally {
        p(!1);
      }
    },
    E = async () => {
      var R, P;
      if (!w.username || !w.email || !w.password) {
        d('Veuillez remplir tous les champs');
        return;
      }
      if (w.password !== w.confirmPassword) {
        d('Les mots de passe ne correspondent pas');
        return;
      }
      if (w.password.length < 6) {
        d('Le mot de passe doit contenir au moins 6 caractères');
        return;
      }
      (p(!0), d(''));
      try {
        await O.post('/api/auth/register', {
          username: w.username,
          email: w.email,
          password: w.password,
          role: w.role,
        });
        const M = await O.post('/api/auth/login', {
          username: w.username,
          password: w.password,
        });
        (localStorage.setItem('accessToken', M.data.accessToken),
          s(M.data.user, M.data.accessToken),
          e());
      } catch (error) {
        d(
          ((P = (R = error.response) == null ? void 0 : R.data) == null
            ? void 0
            : P.error) || "Erreur lors de l'inscription"
        );
      } finally {
        p(!1);
      }
    },
    _ = (R, P) => {
      R.key === 'Enter' && P();
    };
  return r.jsxs(ve, {
    open: t,
    onClose: e,
    maxWidth: 'sm',
    fullWidth: !0,
    children: [
      r.jsx(Se, {
        children: r.jsx(v, {
          variant: 'h5',
          component: 'div',
          gutterBottom: !0,
          children: '🔐 Connexion à BMad Visual Studio',
        }),
      }),
      r.jsxs(ke, {
        children: [
          r.jsxs(qr, {
            value: n,
            onChange: g,
            'aria-label': 'auth tabs',
            children: [
              r.jsx(Gt, {
                icon: r.jsx(hr, {}),
                label: 'Se connecter',
                id: 'auth-tab-0',
                'aria-controls': 'auth-tabpanel-0',
              }),
              r.jsx(Gt, {
                icon: r.jsx(fr, {}),
                label: "S'inscrire",
                id: 'auth-tab-1',
                'aria-controls': 'auth-tabpanel-1',
              }),
            ],
          }),
          f && r.jsx(V, { severity: 'error', sx: { mt: 2 }, children: f }),
          r.jsx(Mr, {
            value: n,
            index: 0,
            children: r.jsxs(j, {
              children: [
                r.jsx(v, {
                  variant: 'body2',
                  color: 'textSecondary',
                  gutterBottom: !0,
                  children:
                    'Connectez-vous avec votre compte BMad Visual Studio',
                }),
                r.jsx(W, {
                  fullWidth: !0,
                  label: "Nom d'utilisateur",
                  value: y.username,
                  onChange: R => S(P => ({ ...P, username: R.target.value })),
                  onKeyPress: R => _(R, b),
                  sx: { mb: 2, mt: 2 },
                }),
                r.jsx(W, {
                  fullWidth: !0,
                  label: 'Mot de passe',
                  type: a ? 'text' : 'password',
                  value: y.password,
                  onChange: R => S(P => ({ ...P, password: R.target.value })),
                  onKeyPress: R => _(R, b),
                  InputProps: {
                    endAdornment: r.jsx(nn, {
                      position: 'end',
                      children: r.jsx(Q, {
                        'aria-label': 'toggle password visibility',
                        onClick: () => i(!a),
                        edge: 'end',
                        children: a ? r.jsx(on, {}) : r.jsx(xt, {}),
                      }),
                    }),
                  },
                  sx: { mb: 2 },
                }),
                r.jsx(v, {
                  variant: 'caption',
                  color: 'textSecondary',
                  children: '💡 Compte admin par défaut : admin / admin123',
                }),
              ],
            }),
          }),
          r.jsx(Mr, {
            value: n,
            index: 1,
            children: r.jsxs(j, {
              children: [
                r.jsx(v, {
                  variant: 'body2',
                  color: 'textSecondary',
                  gutterBottom: !0,
                  children: 'Créez votre compte BMad Visual Studio',
                }),
                r.jsx(W, {
                  fullWidth: !0,
                  label: "Nom d'utilisateur",
                  value: w.username,
                  onChange: R => c(P => ({ ...P, username: R.target.value })),
                  sx: { mb: 2, mt: 2 },
                }),
                r.jsx(W, {
                  fullWidth: !0,
                  label: 'Email',
                  type: 'email',
                  value: w.email,
                  onChange: R => c(P => ({ ...P, email: R.target.value })),
                  sx: { mb: 2 },
                }),
                r.jsxs(ce, {
                  fullWidth: !0,
                  sx: { mb: 2 },
                  children: [
                    r.jsx(de, { children: 'Rôle' }),
                    r.jsxs(ue, {
                      value: w.role,
                      onChange: R => c(P => ({ ...P, role: R.target.value })),
                      children: [
                        r.jsx(U, { value: 'user', children: 'Utilisateur' }),
                        r.jsx(U, { value: 'viewer', children: 'Observateur' }),
                      ],
                    }),
                  ],
                }),
                r.jsx(W, {
                  fullWidth: !0,
                  label: 'Mot de passe',
                  type: a ? 'text' : 'password',
                  value: w.password,
                  onChange: R => c(P => ({ ...P, password: R.target.value })),
                  sx: { mb: 2 },
                }),
                r.jsx(W, {
                  fullWidth: !0,
                  label: 'Confirmer le mot de passe',
                  type: a ? 'text' : 'password',
                  value: w.confirmPassword,
                  onChange: R =>
                    c(P => ({ ...P, confirmPassword: R.target.value })),
                  onKeyPress: R => _(R, E),
                }),
              ],
            }),
          }),
        ],
      }),
      r.jsxs(Ce, {
        children: [
          r.jsx(L, { onClick: e, children: 'Annuler' }),
          r.jsx(L, {
            variant: 'contained',
            onClick: n === 0 ? b : E,
            disabled: l,
            startIcon: n === 0 ? r.jsx(hr, {}) : r.jsx(fr, {}),
            children: l
              ? 'Chargement...'
              : n === 0
                ? 'Se connecter'
                : "S'inscrire",
          }),
        ],
      }),
    ],
  });
}
function Qa({ onLoginSuccess: t }) {
  const e = fe(),
    { user: s, isAuthenticated: n } = te(c => c.auth),
    [o, a] = A.useState(null),
    [i, l] = A.useState(!1),
    p = c => {
      a(c.currentTarget);
    },
    f = () => {
      a(null);
    },
    d = async () => {
      (await e(Fs()), f());
    },
    y = (c, g) => {
      t && t(c, g);
    },
    S = c => {
      switch (c) {
        case 'admin': {
          return 'error';
        }
        case 'user': {
          return 'primary';
        }
        case 'viewer': {
          return 'secondary';
        }
        default: {
          return 'default';
        }
      }
    },
    w = c => {
      switch (c) {
        case 'admin': {
          return r.jsx(mt, { fontSize: 'small' });
        }
        default: {
          return r.jsx(xr, { fontSize: 'small' });
        }
      }
    };
  return !n || !s
    ? r.jsxs(r.Fragment, {
        children: [
          r.jsx(Q, {
            color: 'inherit',
            onClick: () => l(!0),
            sx: {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
            },
            children: r.jsx(xr, {}),
          }),
          r.jsx(Lr, { open: i, onClose: () => l(!1), onLoginSuccess: y }),
        ],
      })
    : r.jsxs(r.Fragment, {
        children: [
          r.jsxs(j, {
            sx: { display: 'flex', alignItems: 'center', gap: 1 },
            children: [
              r.jsx(ee, {
                label: s.role,
                size: 'small',
                color: S(s.role),
                icon: w(s.role),
                variant: 'outlined',
              }),
              r.jsx(Q, {
                onClick: p,
                sx: {
                  p: 0.5,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                },
                children: r.jsx(Vr, {
                  sx: {
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    fontSize: '0.875rem',
                  },
                  children: s.username.charAt(0).toUpperCase(),
                }),
              }),
            ],
          }),
          r.jsxs(an, {
            anchorEl: o,
            open: !!o,
            onClose: f,
            onClick: f,
            transformOrigin: { horizontal: 'right', vertical: 'top' },
            anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
            children: [
              r.jsxs(j, {
                sx: { px: 2, py: 1, minWidth: 200 },
                children: [
                  r.jsx(v, {
                    variant: 'subtitle1',
                    gutterBottom: !0,
                    children: s.username,
                  }),
                  r.jsx(v, {
                    variant: 'body2',
                    color: 'textSecondary',
                    children: s.email,
                  }),
                ],
              }),
              r.jsx(Me, {}),
              r.jsxs(U, {
                children: [
                  r.jsx(Ye, { children: r.jsx(At, { fontSize: 'small' }) }),
                  'Paramètres',
                ],
              }),
              r.jsxs(U, {
                onClick: d,
                children: [
                  r.jsx(Ye, { children: r.jsx(ln, { fontSize: 'small' }) }),
                  'Se déconnecter',
                ],
              }),
            ],
          }),
          r.jsx(Lr, { open: i, onClose: () => l(!1), onLoginSuccess: y }),
        ],
      });
}
const dr = '-',
  Za = t => {
    const e = ti(t),
      { conflictingClassGroups: s, conflictingClassGroupModifiers: n } = t;
    return {
      getClassGroupId: i => {
        const l = i.split(dr);
        return (l[0] === '' && l.length !== 1 && l.shift(), Us(l, e) || ei(i));
      },
      getConflictingClassGroupIds: (i, l) => {
        const p = s[i] || [];
        return l && n[i] ? [...p, ...n[i]] : p;
      },
    };
  },
  Us = (t, e) => {
    var i;
    if (t.length === 0) return e.classGroupId;
    const s = t[0],
      n = e.nextPart.get(s),
      o = n ? Us(t.slice(1), n) : void 0;
    if (o) return o;
    if (e.validators.length === 0) return;
    const a = t.join(dr);
    return (i = e.validators.find(({ validator: l }) => l(a))) == null
      ? void 0
      : i.classGroupId;
  },
  Fr = /^\[(.+)\]$/,
  ei = t => {
    if (Fr.test(t)) {
      const e = Fr.exec(t)[1],
        s = e == null ? void 0 : e.slice(0, Math.max(0, e.indexOf(':')));
      if (s) return 'arbitrary..' + s;
    }
  },
  ti = t => {
    const { theme: e, classGroups: s } = t,
      n = { nextPart: new Map(), validators: [] };
    for (const o in s) er(s[o], n, o, e);
    return n;
  },
  er = (t, e, s, n) => {
    for (const o of t) {
      if (typeof o == 'string') {
        const a = o === '' ? e : Wr(e, o);
        a.classGroupId = s;
        continue;
      }
      if (typeof o == 'function') {
        if (ri(o)) {
          er(o(n), e, s, n);
          continue;
        }
        e.validators.push({ validator: o, classGroupId: s });
        continue;
      }
      for (const [a, i] of Object.entries(o)) {
        er(i, Wr(e, a), s, n);
      }
    }
  },
  Wr = (t, e) => {
    let s = t;
    return (
      e.split(dr).forEach(n => {
        (s.nextPart.has(n) ||
          s.nextPart.set(n, { nextPart: new Map(), validators: [] }),
          (s = s.nextPart.get(n)));
      }),
      s
    );
  },
  ri = t => t.isThemeGetter,
  si = t => {
    if (t < 1) return { get: () => {}, set: () => {} };
    let e = 0,
      s = new Map(),
      n = new Map();
    const o = (a, i) => {
      (s.set(a, i), e++, e > t && ((e = 0), (n = s), (s = new Map())));
    };
    return {
      get(a) {
        let i = s.get(a);
        if (i !== void 0) return i;
        if ((i = n.get(a)) !== void 0) return (o(a, i), i);
      },
      set(a, i) {
        s.has(a) ? s.set(a, i) : o(a, i);
      },
    };
  },
  tr = '!',
  rr = ':',
  ni = rr.length,
  oi = t => {
    const { prefix: e, experimentalParseClassName: s } = t;
    let n = o => {
      const a = [];
      let i = 0,
        l = 0,
        p = 0,
        f;
      for (let c = 0; c < o.length; c++) {
        let g = o[c];
        if (i === 0 && l === 0) {
          if (g === rr) {
            (a.push(o.slice(p, c)), (p = c + ni));
            continue;
          }
          if (g === '/') {
            f = c;
            continue;
          }
        }
        g === '[' ? i++ : g === ']' ? i-- : g === '(' ? l++ : g === ')' && l--;
      }
      const d = a.length === 0 ? o : o.slice(Math.max(0, p)),
        y = ai(d),
        S = y !== d,
        w = f && f > p ? f - p : void 0;
      return {
        modifiers: a,
        hasImportantModifier: S,
        baseClassName: y,
        maybePostfixModifierPosition: w,
      };
    };
    if (e) {
      const o = e + rr,
        a = n;
      n = i =>
        i.startsWith(o)
          ? a(i.slice(o.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: i,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (s) {
      const o = n;
      n = a => s({ className: a, parseClassName: o });
    }
    return n;
  },
  ai = t =>
    t.endsWith(tr)
      ? t.slice(0, Math.max(0, t.length - 1))
      : t.startsWith(tr)
        ? t.slice(1)
        : t,
  ii = t => {
    const e = Object.fromEntries(t.orderSensitiveModifiers.map(n => [n, !0]));
    return n => {
      if (n.length <= 1) return n;
      const o = [];
      let a = [];
      return (
        n.forEach(i => {
          i[0] === '[' || e[i] ? (o.push(...a.sort(), i), (a = [])) : a.push(i);
        }),
        o.push(...a.sort()),
        o
      );
    };
  },
  li = t => ({
    cache: si(t.cacheSize),
    parseClassName: oi(t),
    sortModifiers: ii(t),
    ...Za(t),
  }),
  ci = /\s+/,
  di = (t, e) => {
    const {
        parseClassName: s,
        getClassGroupId: n,
        getConflictingClassGroupIds: o,
        sortModifiers: a,
      } = e,
      i = [],
      l = t.trim().split(ci);
    let p = '';
    for (let f = l.length - 1; f >= 0; f -= 1) {
      const d = l[f],
        {
          isExternal: y,
          modifiers: S,
          hasImportantModifier: w,
          baseClassName: c,
          maybePostfixModifierPosition: g,
        } = s(d);
      if (y) {
        p = d + (p.length > 0 ? ' ' + p : p);
        continue;
      }
      let b = !!g,
        E = n(b ? c.slice(0, Math.max(0, g)) : c);
      if (!E) {
        if (!b) {
          p = d + (p.length > 0 ? ' ' + p : p);
          continue;
        }
        if (((E = n(c)), !E)) {
          p = d + (p.length > 0 ? ' ' + p : p);
          continue;
        }
        b = !1;
      }
      const _ = a(S).join(':'),
        R = w ? _ + tr : _,
        P = R + E;
      if (i.includes(P)) continue;
      i.push(P);
      const M = o(E, b);
      for (const H of M) {
        i.push(R + H);
      }
      p = d + (p.length > 0 ? ' ' + p : p);
    }
    return p;
  };
function ui() {
  let t = 0,
    e,
    s,
    n = '';
  for (; t < arguments.length; )
    (e = arguments[t++]) && (s = $s(e)) && (n && (n += ' '), (n += s));
  return n;
}
const $s = t => {
  if (typeof t == 'string') return t;
  let e,
    s = '';
  for (let n = 0; n < t.length; n++)
    t[n] && (e = $s(t[n])) && (s && (s += ' '), (s += e));
  return s;
};
function pi(t, ...e) {
  let s,
    n,
    o,
    a = i;
  function i(p) {
    const f = e.reduce((d, y) => y(d), t());
    return ((s = li(f)), (n = s.cache.get), (o = s.cache.set), (a = l), l(p));
  }
  function l(p) {
    const f = n(p);
    if (f) return f;
    const d = di(p, s);
    return (o(p, d), d);
  }
  return function () {
    return a(Reflect.apply(ui, null, arguments));
  };
}
const K = t => {
    const e = s => s[t] || [];
    return ((e.isThemeGetter = !0), e);
  },
  _s = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Hs = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  hi = /^\d+\/\d+$/,
  fi = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  xi =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  mi = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  gi = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  bi =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Be = t => hi.test(t),
  B = t => !!t && !Number.isNaN(Number(t)),
  Ae = t => !!t && Number.isInteger(Number(t)),
  _t = t => t.endsWith('%') && B(t.slice(0, -1)),
  we = t => fi.test(t),
  yi = () => !0,
  ji = t => xi.test(t) && !mi.test(t),
  qs = () => !1,
  wi = t => gi.test(t),
  vi = t => bi.test(t),
  Si = t => !k(t) && !C(t),
  ki = t => _e(t, Js, qs),
  k = t => _s.test(t),
  Re = t => _e(t, Ks, ji),
  Ht = t => _e(t, Ii, B),
  Ur = t => _e(t, Vs, qs),
  Ci = t => _e(t, Gs, vi),
  ut = t => _e(t, Xs, wi),
  C = t => Hs.test(t),
  Je = t => He(t, Ks),
  Ai = t => He(t, Ti),
  $r = t => He(t, Vs),
  Ei = t => He(t, Js),
  Ri = t => He(t, Gs),
  pt = t => He(t, Xs, !0),
  _e = (t, e, s) => {
    const n = _s.exec(t);
    return n ? (n[1] ? e(n[1]) : s(n[2])) : !1;
  },
  He = (t, e, s = !1) => {
    const n = Hs.exec(t);
    return n ? (n[1] ? e(n[1]) : s) : !1;
  },
  Vs = t => t === 'position' || t === 'percentage',
  Gs = t => t === 'image' || t === 'url',
  Js = t => t === 'length' || t === 'size' || t === 'bg-size',
  Ks = t => t === 'length',
  Ii = t => t === 'number',
  Ti = t => t === 'family-name',
  Xs = t => t === 'shadow',
  Pi = () => {
    const t = K('color'),
      e = K('font'),
      s = K('text'),
      n = K('font-weight'),
      o = K('tracking'),
      a = K('leading'),
      i = K('breakpoint'),
      l = K('container'),
      p = K('spacing'),
      f = K('radius'),
      d = K('shadow'),
      y = K('inset-shadow'),
      S = K('text-shadow'),
      w = K('drop-shadow'),
      c = K('blur'),
      g = K('perspective'),
      b = K('aspect'),
      E = K('ease'),
      _ = K('animate'),
      R = () => [
        'auto',
        'avoid',
        'all',
        'avoid-page',
        'page',
        'left',
        'right',
        'column',
      ],
      P = () => [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'left-top',
        'top-right',
        'right-top',
        'bottom-right',
        'right-bottom',
        'bottom-left',
        'left-bottom',
      ],
      M = () => [...P(), C, k],
      q = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      H = () => ['auto', 'contain', 'none'],
      m = () => [C, k, p],
      h = () => [Be, 'full', 'auto', ...m()],
      u = () => [Ae, 'none', 'subgrid', C, k],
      T = () => ['auto', { span: ['full', Ae, C, k] }, Ae, C, k],
      N = () => [Ae, 'auto', C, k],
      ie = () => ['auto', 'min', 'max', 'fr', C, k],
      se = () => [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch',
        'baseline',
        'center-safe',
        'end-safe',
      ],
      le = () => [
        'start',
        'end',
        'center',
        'stretch',
        'center-safe',
        'end-safe',
      ],
      G = () => ['auto', ...m()],
      ge = () => [
        Be,
        'auto',
        'full',
        'dvw',
        'dvh',
        'lvw',
        'lvh',
        'svw',
        'svh',
        'min',
        'max',
        'fit',
        ...m(),
      ],
      I = () => [t, C, k],
      Ve = () => [...P(), $r, Ur, { position: [C, k] }],
      ot = () => ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }],
      xe = () => ['auto', 'cover', 'contain', Ei, ki, { size: [C, k] }],
      be = () => [_t, Je, Re],
      J = () => ['', 'none', 'full', f, C, k],
      X = () => ['', B, Je, Re],
      Ee = () => ['solid', 'dashed', 'dotted', 'double'],
      ur = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      Y = () => [B, _t, $r, Ur],
      pr = () => ['', 'none', c, C, k],
      at = () => ['none', B, C, k],
      it = () => ['none', B, C, k],
      Nt = () => [B, C, k],
      lt = () => [Be, 'full', ...m()];
    return {
      cacheSize: 500,
      theme: {
        animate: ['spin', 'ping', 'pulse', 'bounce'],
        aspect: ['video'],
        blur: [we],
        breakpoint: [we],
        color: [yi],
        container: [we],
        'drop-shadow': [we],
        ease: ['in', 'out', 'in-out'],
        font: [Si],
        'font-weight': [
          'thin',
          'extralight',
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ],
        'inset-shadow': [we],
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
        perspective: [
          'dramatic',
          'near',
          'normal',
          'midrange',
          'distant',
          'none',
        ],
        radius: [we],
        shadow: [we],
        spacing: ['px', B],
        text: [we],
        'text-shadow': [we],
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', Be, k, C, b] }],
        container: ['container'],
        columns: [{ columns: [B, k, C, l] }],
        'break-after': [{ 'break-after': R() }],
        'break-before': [{ 'break-before': R() }],
        'break-inside': [
          { 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] },
        ],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        sr: ['sr-only', 'not-sr-only'],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [
          { object: ['contain', 'cover', 'fill', 'none', 'scale-down'] },
        ],
        'object-position': [{ object: M() }],
        overflow: [{ overflow: q() }],
        'overflow-x': [{ 'overflow-x': q() }],
        'overflow-y': [{ 'overflow-y': q() }],
        overscroll: [{ overscroll: H() }],
        'overscroll-x': [{ 'overscroll-x': H() }],
        'overscroll-y': [{ 'overscroll-y': H() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: h() }],
        'inset-x': [{ 'inset-x': h() }],
        'inset-y': [{ 'inset-y': h() }],
        start: [{ start: h() }],
        end: [{ end: h() }],
        top: [{ top: h() }],
        right: [{ right: h() }],
        bottom: [{ bottom: h() }],
        left: [{ left: h() }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: [Ae, 'auto', C, k] }],
        basis: [{ basis: [Be, 'full', 'auto', l, ...m()] }],
        'flex-direction': [
          { flex: ['row', 'row-reverse', 'col', 'col-reverse'] },
        ],
        'flex-wrap': [{ flex: ['nowrap', 'wrap', 'wrap-reverse'] }],
        flex: [{ flex: [B, Be, 'auto', 'initial', 'none', k] }],
        grow: [{ grow: ['', B, C, k] }],
        shrink: [{ shrink: ['', B, C, k] }],
        order: [{ order: [Ae, 'first', 'last', 'none', C, k] }],
        'grid-cols': [{ 'grid-cols': u() }],
        'col-start-end': [{ col: T() }],
        'col-start': [{ 'col-start': N() }],
        'col-end': [{ 'col-end': N() }],
        'grid-rows': [{ 'grid-rows': u() }],
        'row-start-end': [{ row: T() }],
        'row-start': [{ 'row-start': N() }],
        'row-end': [{ 'row-end': N() }],
        'grid-flow': [
          { 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] },
        ],
        'auto-cols': [{ 'auto-cols': ie() }],
        'auto-rows': [{ 'auto-rows': ie() }],
        gap: [{ gap: m() }],
        'gap-x': [{ 'gap-x': m() }],
        'gap-y': [{ 'gap-y': m() }],
        'justify-content': [{ justify: [...se(), 'normal'] }],
        'justify-items': [{ 'justify-items': [...le(), 'normal'] }],
        'justify-self': [{ 'justify-self': ['auto', ...le()] }],
        'align-content': [{ content: ['normal', ...se()] }],
        'align-items': [{ items: [...le(), { baseline: ['', 'last'] }] }],
        'align-self': [{ self: ['auto', ...le(), { baseline: ['', 'last'] }] }],
        'place-content': [{ 'place-content': se() }],
        'place-items': [{ 'place-items': [...le(), 'baseline'] }],
        'place-self': [{ 'place-self': ['auto', ...le()] }],
        p: [{ p: m() }],
        px: [{ px: m() }],
        py: [{ py: m() }],
        ps: [{ ps: m() }],
        pe: [{ pe: m() }],
        pt: [{ pt: m() }],
        pr: [{ pr: m() }],
        pb: [{ pb: m() }],
        pl: [{ pl: m() }],
        m: [{ m: G() }],
        mx: [{ mx: G() }],
        my: [{ my: G() }],
        ms: [{ ms: G() }],
        me: [{ me: G() }],
        mt: [{ mt: G() }],
        mr: [{ mr: G() }],
        mb: [{ mb: G() }],
        ml: [{ ml: G() }],
        'space-x': [{ 'space-x': m() }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': m() }],
        'space-y-reverse': ['space-y-reverse'],
        size: [{ size: ge() }],
        w: [{ w: [l, 'screen', ...ge()] }],
        'min-w': [{ 'min-w': [l, 'screen', 'none', ...ge()] }],
        'max-w': [
          { 'max-w': [l, 'screen', 'none', 'prose', { screen: [i] }, ...ge()] },
        ],
        h: [{ h: ['screen', 'lh', ...ge()] }],
        'min-h': [{ 'min-h': ['screen', 'lh', 'none', ...ge()] }],
        'max-h': [{ 'max-h': ['screen', 'lh', ...ge()] }],
        'font-size': [{ text: ['base', s, Je, Re] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [{ font: [n, C, Ht] }],
        'font-stretch': [
          {
            'font-stretch': [
              'ultra-condensed',
              'extra-condensed',
              'condensed',
              'semi-condensed',
              'normal',
              'semi-expanded',
              'expanded',
              'extra-expanded',
              'ultra-expanded',
              _t,
              k,
            ],
          },
        ],
        'font-family': [{ font: [Ai, k, e] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{ tracking: [o, C, k] }],
        'line-clamp': [{ 'line-clamp': [B, 'none', C, Ht] }],
        leading: [{ leading: [a, ...m()] }],
        'list-image': [{ 'list-image': ['none', C, k] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'list-style-type': [{ list: ['disc', 'decimal', 'none', C, k] }],
        'text-alignment': [
          { text: ['left', 'center', 'right', 'justify', 'start', 'end'] },
        ],
        'placeholder-color': [{ placeholder: I() }],
        'text-color': [{ text: I() }],
        'text-decoration': [
          'underline',
          'overline',
          'line-through',
          'no-underline',
        ],
        'text-decoration-style': [{ decoration: [...Ee(), 'wavy'] }],
        'text-decoration-thickness': [
          { decoration: [B, 'from-font', 'auto', C, Re] },
        ],
        'text-decoration-color': [{ decoration: I() }],
        'underline-offset': [{ 'underline-offset': [B, 'auto', C, k] }],
        'text-transform': [
          'uppercase',
          'lowercase',
          'capitalize',
          'normal-case',
        ],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: m() }],
        'vertical-align': [
          {
            align: [
              'baseline',
              'top',
              'middle',
              'bottom',
              'text-top',
              'text-bottom',
              'sub',
              'super',
              C,
              k,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              'normal',
              'nowrap',
              'pre',
              'pre-line',
              'pre-wrap',
              'break-spaces',
            ],
          },
        ],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        wrap: [{ wrap: ['break-word', 'anywhere', 'normal'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', C, k] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: Ve() }],
        'bg-repeat': [{ bg: ot() }],
        'bg-size': [{ bg: xe() }],
        'bg-image': [
          {
            bg: [
              'none',
              {
                linear: [
                  { to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] },
                  Ae,
                  C,
                  k,
                ],
                radial: ['', C, k],
                conic: [Ae, C, k],
              },
              Ri,
              Ci,
            ],
          },
        ],
        'bg-color': [{ bg: I() }],
        'gradient-from-pos': [{ from: be() }],
        'gradient-via-pos': [{ via: be() }],
        'gradient-to-pos': [{ to: be() }],
        'gradient-from': [{ from: I() }],
        'gradient-via': [{ via: I() }],
        'gradient-to': [{ to: I() }],
        rounded: [{ rounded: J() }],
        'rounded-s': [{ 'rounded-s': J() }],
        'rounded-e': [{ 'rounded-e': J() }],
        'rounded-t': [{ 'rounded-t': J() }],
        'rounded-r': [{ 'rounded-r': J() }],
        'rounded-b': [{ 'rounded-b': J() }],
        'rounded-l': [{ 'rounded-l': J() }],
        'rounded-ss': [{ 'rounded-ss': J() }],
        'rounded-se': [{ 'rounded-se': J() }],
        'rounded-ee': [{ 'rounded-ee': J() }],
        'rounded-es': [{ 'rounded-es': J() }],
        'rounded-tl': [{ 'rounded-tl': J() }],
        'rounded-tr': [{ 'rounded-tr': J() }],
        'rounded-br': [{ 'rounded-br': J() }],
        'rounded-bl': [{ 'rounded-bl': J() }],
        'border-w': [{ border: X() }],
        'border-w-x': [{ 'border-x': X() }],
        'border-w-y': [{ 'border-y': X() }],
        'border-w-s': [{ 'border-s': X() }],
        'border-w-e': [{ 'border-e': X() }],
        'border-w-t': [{ 'border-t': X() }],
        'border-w-r': [{ 'border-r': X() }],
        'border-w-b': [{ 'border-b': X() }],
        'border-w-l': [{ 'border-l': X() }],
        'divide-x': [{ 'divide-x': X() }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': X() }],
        'divide-y-reverse': ['divide-y-reverse'],
        'border-style': [{ border: [...Ee(), 'hidden', 'none'] }],
        'divide-style': [{ divide: [...Ee(), 'hidden', 'none'] }],
        'border-color': [{ border: I() }],
        'border-color-x': [{ 'border-x': I() }],
        'border-color-y': [{ 'border-y': I() }],
        'border-color-s': [{ 'border-s': I() }],
        'border-color-e': [{ 'border-e': I() }],
        'border-color-t': [{ 'border-t': I() }],
        'border-color-r': [{ 'border-r': I() }],
        'border-color-b': [{ 'border-b': I() }],
        'border-color-l': [{ 'border-l': I() }],
        'divide-color': [{ divide: I() }],
        'outline-style': [{ outline: [...Ee(), 'none', 'hidden'] }],
        'outline-offset': [{ 'outline-offset': [B, C, k] }],
        'outline-w': [{ outline: ['', B, Je, Re] }],
        'outline-color': [{ outline: I() }],
        shadow: [{ shadow: ['', 'none', d, pt, ut] }],
        'shadow-color': [{ shadow: I() }],
        'inset-shadow': [{ 'inset-shadow': ['none', y, pt, ut] }],
        'inset-shadow-color': [{ 'inset-shadow': I() }],
        'ring-w': [{ ring: X() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: I() }],
        'ring-offset-w': [{ 'ring-offset': [B, Re] }],
        'ring-offset-color': [{ 'ring-offset': I() }],
        'inset-ring-w': [{ 'inset-ring': X() }],
        'inset-ring-color': [{ 'inset-ring': I() }],
        'text-shadow': [{ 'text-shadow': ['none', S, pt, ut] }],
        'text-shadow-color': [{ 'text-shadow': I() }],
        opacity: [{ opacity: [B, C, k] }],
        'mix-blend': [
          { 'mix-blend': [...ur(), 'plus-darker', 'plus-lighter'] },
        ],
        'bg-blend': [{ 'bg-blend': ur() }],
        'mask-clip': [
          {
            'mask-clip': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
          'mask-no-clip',
        ],
        'mask-composite': [
          { mask: ['add', 'subtract', 'intersect', 'exclude'] },
        ],
        'mask-image-linear-pos': [{ 'mask-linear': [B] }],
        'mask-image-linear-from-pos': [{ 'mask-linear-from': Y() }],
        'mask-image-linear-to-pos': [{ 'mask-linear-to': Y() }],
        'mask-image-linear-from-color': [{ 'mask-linear-from': I() }],
        'mask-image-linear-to-color': [{ 'mask-linear-to': I() }],
        'mask-image-t-from-pos': [{ 'mask-t-from': Y() }],
        'mask-image-t-to-pos': [{ 'mask-t-to': Y() }],
        'mask-image-t-from-color': [{ 'mask-t-from': I() }],
        'mask-image-t-to-color': [{ 'mask-t-to': I() }],
        'mask-image-r-from-pos': [{ 'mask-r-from': Y() }],
        'mask-image-r-to-pos': [{ 'mask-r-to': Y() }],
        'mask-image-r-from-color': [{ 'mask-r-from': I() }],
        'mask-image-r-to-color': [{ 'mask-r-to': I() }],
        'mask-image-b-from-pos': [{ 'mask-b-from': Y() }],
        'mask-image-b-to-pos': [{ 'mask-b-to': Y() }],
        'mask-image-b-from-color': [{ 'mask-b-from': I() }],
        'mask-image-b-to-color': [{ 'mask-b-to': I() }],
        'mask-image-l-from-pos': [{ 'mask-l-from': Y() }],
        'mask-image-l-to-pos': [{ 'mask-l-to': Y() }],
        'mask-image-l-from-color': [{ 'mask-l-from': I() }],
        'mask-image-l-to-color': [{ 'mask-l-to': I() }],
        'mask-image-x-from-pos': [{ 'mask-x-from': Y() }],
        'mask-image-x-to-pos': [{ 'mask-x-to': Y() }],
        'mask-image-x-from-color': [{ 'mask-x-from': I() }],
        'mask-image-x-to-color': [{ 'mask-x-to': I() }],
        'mask-image-y-from-pos': [{ 'mask-y-from': Y() }],
        'mask-image-y-to-pos': [{ 'mask-y-to': Y() }],
        'mask-image-y-from-color': [{ 'mask-y-from': I() }],
        'mask-image-y-to-color': [{ 'mask-y-to': I() }],
        'mask-image-radial': [{ 'mask-radial': [C, k] }],
        'mask-image-radial-from-pos': [{ 'mask-radial-from': Y() }],
        'mask-image-radial-to-pos': [{ 'mask-radial-to': Y() }],
        'mask-image-radial-from-color': [{ 'mask-radial-from': I() }],
        'mask-image-radial-to-color': [{ 'mask-radial-to': I() }],
        'mask-image-radial-shape': [{ 'mask-radial': ['circle', 'ellipse'] }],
        'mask-image-radial-size': [
          {
            'mask-radial': [
              { closest: ['side', 'corner'], farthest: ['side', 'corner'] },
            ],
          },
        ],
        'mask-image-radial-pos': [{ 'mask-radial-at': P() }],
        'mask-image-conic-pos': [{ 'mask-conic': [B] }],
        'mask-image-conic-from-pos': [{ 'mask-conic-from': Y() }],
        'mask-image-conic-to-pos': [{ 'mask-conic-to': Y() }],
        'mask-image-conic-from-color': [{ 'mask-conic-from': I() }],
        'mask-image-conic-to-color': [{ 'mask-conic-to': I() }],
        'mask-mode': [{ mask: ['alpha', 'luminance', 'match'] }],
        'mask-origin': [
          {
            'mask-origin': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
        ],
        'mask-position': [{ mask: Ve() }],
        'mask-repeat': [{ mask: ot() }],
        'mask-size': [{ mask: xe() }],
        'mask-type': [{ 'mask-type': ['alpha', 'luminance'] }],
        'mask-image': [{ mask: ['none', C, k] }],
        filter: [{ filter: ['', 'none', C, k] }],
        blur: [{ blur: pr() }],
        brightness: [{ brightness: [B, C, k] }],
        contrast: [{ contrast: [B, C, k] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', w, pt, ut] }],
        'drop-shadow-color': [{ 'drop-shadow': I() }],
        grayscale: [{ grayscale: ['', B, C, k] }],
        'hue-rotate': [{ 'hue-rotate': [B, C, k] }],
        invert: [{ invert: ['', B, C, k] }],
        saturate: [{ saturate: [B, C, k] }],
        sepia: [{ sepia: ['', B, C, k] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none', C, k] }],
        'backdrop-blur': [{ 'backdrop-blur': pr() }],
        'backdrop-brightness': [{ 'backdrop-brightness': [B, C, k] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [B, C, k] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': ['', B, C, k] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [B, C, k] }],
        'backdrop-invert': [{ 'backdrop-invert': ['', B, C, k] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [B, C, k] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [B, C, k] }],
        'backdrop-sepia': [{ 'backdrop-sepia': ['', B, C, k] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': m() }],
        'border-spacing-x': [{ 'border-spacing-x': m() }],
        'border-spacing-y': [{ 'border-spacing-y': m() }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [
          {
            transition: [
              '',
              'all',
              'colors',
              'opacity',
              'shadow',
              'transform',
              'none',
              C,
              k,
            ],
          },
        ],
        'transition-behavior': [{ transition: ['normal', 'discrete'] }],
        duration: [{ duration: [B, 'initial', C, k] }],
        ease: [{ ease: ['linear', 'initial', E, C, k] }],
        delay: [{ delay: [B, C, k] }],
        animate: [{ animate: ['none', _, C, k] }],
        backface: [{ backface: ['hidden', 'visible'] }],
        perspective: [{ perspective: [g, C, k] }],
        'perspective-origin': [{ 'perspective-origin': M() }],
        rotate: [{ rotate: at() }],
        'rotate-x': [{ 'rotate-x': at() }],
        'rotate-y': [{ 'rotate-y': at() }],
        'rotate-z': [{ 'rotate-z': at() }],
        scale: [{ scale: it() }],
        'scale-x': [{ 'scale-x': it() }],
        'scale-y': [{ 'scale-y': it() }],
        'scale-z': [{ 'scale-z': it() }],
        'scale-3d': ['scale-3d'],
        skew: [{ skew: Nt() }],
        'skew-x': [{ 'skew-x': Nt() }],
        'skew-y': [{ 'skew-y': Nt() }],
        transform: [{ transform: [C, k, '', 'none', 'gpu', 'cpu'] }],
        'transform-origin': [{ origin: M() }],
        'transform-style': [{ transform: ['3d', 'flat'] }],
        translate: [{ translate: lt() }],
        'translate-x': [{ 'translate-x': lt() }],
        'translate-y': [{ 'translate-y': lt() }],
        'translate-z': [{ 'translate-z': lt() }],
        'translate-none': ['translate-none'],
        accent: [{ accent: I() }],
        appearance: [{ appearance: ['none', 'auto'] }],
        'caret-color': [{ caret: I() }],
        'color-scheme': [
          {
            scheme: [
              'normal',
              'dark',
              'light',
              'light-dark',
              'only-dark',
              'only-light',
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              C,
              k,
            ],
          },
        ],
        'field-sizing': [{ 'field-sizing': ['fixed', 'content'] }],
        'pointer-events': [{ 'pointer-events': ['auto', 'none'] }],
        resize: [{ resize: ['none', '', 'y', 'x'] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': m() }],
        'scroll-mx': [{ 'scroll-mx': m() }],
        'scroll-my': [{ 'scroll-my': m() }],
        'scroll-ms': [{ 'scroll-ms': m() }],
        'scroll-me': [{ 'scroll-me': m() }],
        'scroll-mt': [{ 'scroll-mt': m() }],
        'scroll-mr': [{ 'scroll-mr': m() }],
        'scroll-mb': [{ 'scroll-mb': m() }],
        'scroll-ml': [{ 'scroll-ml': m() }],
        'scroll-p': [{ 'scroll-p': m() }],
        'scroll-px': [{ 'scroll-px': m() }],
        'scroll-py': [{ 'scroll-py': m() }],
        'scroll-ps': [{ 'scroll-ps': m() }],
        'scroll-pe': [{ 'scroll-pe': m() }],
        'scroll-pt': [{ 'scroll-pt': m() }],
        'scroll-pr': [{ 'scroll-pr': m() }],
        'scroll-pb': [{ 'scroll-pb': m() }],
        'scroll-pl': [{ 'scroll-pl': m() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [
          { 'will-change': ['auto', 'scroll', 'contents', 'transform', C, k] },
        ],
        fill: [{ fill: ['none', ...I()] }],
        'stroke-w': [{ stroke: [B, Je, Re, Ht] }],
        stroke: [{ stroke: ['none', ...I()] }],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: [
          'inset-x',
          'inset-y',
          'start',
          'end',
          'top',
          'right',
          'bottom',
          'left',
        ],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': [
          'fvn-ordinal',
          'fvn-slashed-zero',
          'fvn-figure',
          'fvn-spacing',
          'fvn-fraction',
        ],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-x',
          'border-w-y',
          'border-w-s',
          'border-w-e',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-x',
          'border-color-y',
          'border-color-s',
          'border-color-e',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        translate: ['translate-x', 'translate-y', 'translate-none'],
        'translate-none': [
          'translate',
          'translate-x',
          'translate-y',
          'translate-z',
        ],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] },
      orderSensitiveModifiers: [
        '*',
        '**',
        'after',
        'backdrop',
        'before',
        'details-content',
        'file',
        'first-letter',
        'first-line',
        'marker',
        'placeholder',
        'selection',
      ],
    };
  },
  Oi = pi(Pi);
function qe(...t) {
  return Oi(cn(t));
}
const Ys = Ne.forwardRef(({ className: t, ...e }, s) =>
  r.jsx('div', {
    ref: s,
    className: qe(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      t
    ),
    ...e,
  })
);
Ys.displayName = 'Card';
const Qs = Ne.forwardRef(({ className: t, ...e }, s) =>
  r.jsx('div', {
    ref: s,
    className: qe('flex flex-col space-y-1.5 p-6', t),
    ...e,
  })
);
Qs.displayName = 'CardHeader';
const Zs = Ne.forwardRef(({ className: t, ...e }, s) =>
  r.jsx('h3', {
    ref: s,
    className: qe('text-2xl font-semibold leading-none tracking-tight', t),
    ...e,
  })
);
Zs.displayName = 'CardTitle';
const en = Ne.forwardRef(({ className: t, ...e }, s) =>
  r.jsx('div', { ref: s, className: qe('p-6 pt-0', t), ...e })
);
en.displayName = 'CardContent';
const Xe = Ne.forwardRef(
  ({ className: t, variant: e = 'default', size: s = 'md', ...n }, o) => {
    const a =
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
      i = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      l = { sm: 'h-9 px-3 text-sm', md: 'h-10 py-2 px-4', lg: 'h-11 px-8' };
    return r.jsx('button', { className: qe(a, i[e], l[s], t), ref: o, ...n });
  }
);
Xe.displayName = 'Button';
const tn = Ne.forwardRef(
  ({ className: t, variant: e = 'default', ...s }, n) => {
    const o = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/80',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-border text-foreground',
    };
    return r.jsx('div', {
      ref: n,
      className: qe(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        o[e],
        t
      ),
      ...s,
    });
  }
);
tn.displayName = 'Badge';
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Di = t => t.replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  Ni = t =>
    t.replaceAll(/^([A-Z])|[\s-_]+(\w)/g, (e, s, n) =>
      n ? n.toUpperCase() : s.toLowerCase()
    ),
  _r = t => {
    const e = Ni(t);
    return e.charAt(0).toUpperCase() + e.slice(1);
  },
  rn = (...t) =>
    t
      .filter((e, s, n) => !!e && e.trim() !== '' && n.indexOf(e) === s)
      .join(' ')
      .trim(),
  zi = t => {
    for (const e in t)
      if (e.startsWith('aria-') || e === 'role' || e === 'title') return !0;
  };
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var Bi = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Mi = A.forwardRef(
  (
    {
      color: t = 'currentColor',
      size: e = 24,
      strokeWidth: s = 2,
      absoluteStrokeWidth: n,
      className: o = '',
      children: a,
      iconNode: i,
      ...l
    },
    p
  ) =>
    A.createElement(
      'svg',
      {
        ref: p,
        ...Bi,
        width: e,
        height: e,
        stroke: t,
        strokeWidth: n ? (Number(s) * 24) / Number(e) : s,
        className: rn('lucide', o),
        ...(!a && !zi(l) && { 'aria-hidden': 'true' }),
        ...l,
      },
      [
        ...i.map(([f, d]) => A.createElement(f, d)),
        ...(Array.isArray(a) ? a : [a]),
      ]
    )
);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Dt = (t, e) => {
  const s = A.forwardRef(({ className: n, ...o }, a) =>
    A.createElement(Mi, {
      ref: a,
      iconNode: e,
      className: rn(`lucide-${Di(_r(t))}`, `lucide-${t}`, n),
      ...o,
    })
  );
  return ((s.displayName = _r(t)), s);
};
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Li = [
    [
      'path',
      {
        d: 'm6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2',
        key: 'usdka0',
      },
    ],
  ],
  Fi = Dt('folder-open', Li);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Wi = [
    [
      'path',
      { d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', key: '1357e3' },
    ],
    ['path', { d: 'M3 3v5h5', key: '1xhq8a' }],
    ['path', { d: 'M12 7v5l4 2', key: '1fdv2h' }],
  ],
  Ui = Dt('history', Wi);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $i = [
    [
      'path',
      {
        d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8',
        key: 'v9h5vc',
      },
    ],
    ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
    [
      'path',
      {
        d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16',
        key: '3uifl3',
      },
    ],
    ['path', { d: 'M8 16H3v5', key: '1cv678' }],
  ],
  _i = Dt('refresh-cw', $i);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Hi = [
    ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
    ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
  ],
  qi = Dt('x', Hi),
  Vi = ({ className: t = '' }) => {
    const e = fe(),
      { projects: s, currentProject: n, loading: o } = te(c => c.projects),
      [a, i] = A.useState([]),
      [l, p] = A.useState(!1);
    A.useEffect(() => {
      (e(Fe()),
        e(Rs()),
        e(Ca(5)).then(c => {
          c.payload && i(c.payload);
        }));
    }, [e]);
    const f = c => {
        e(Es(c));
      },
      d = () => {
        e(Ze());
      },
      y = () => {
        e(Is());
      },
      S = c => {
        e(Ts(c));
      },
      w = () => {
        p(!l);
      };
    return r.jsxs(Ys, {
      className: `w-full max-w-md ${t}`,
      children: [
        r.jsx(Qs, {
          className: 'pb-3',
          children: r.jsxs(Zs, {
            className: 'flex items-center justify-between text-lg',
            children: [
              r.jsxs('span', {
                className: 'flex items-center gap-2',
                children: [
                  r.jsx(Fi, { className: 'h-5 w-5' }),
                  'Contexte de projet',
                ],
              }),
              r.jsx(Xe, {
                variant: 'outline',
                size: 'sm',
                onClick: d,
                disabled: o,
                children: r.jsx(_i, {
                  className: `h-4 w-4 ${o ? 'animate-spin' : ''}`,
                }),
              }),
            ],
          }),
        }),
        r.jsxs(en, {
          className: 'space-y-4',
          children: [
            n &&
              r.jsxs('div', {
                className:
                  'p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800',
                children: [
                  r.jsxs('div', {
                    className: 'flex items-center justify-between mb-2',
                    children: [
                      r.jsx('span', {
                        className:
                          'text-sm font-medium text-blue-900 dark:text-blue-100',
                        children: 'Projet actif',
                      }),
                      r.jsx(Xe, {
                        variant: 'ghost',
                        size: 'sm',
                        onClick: y,
                        className:
                          'h-6 w-6 p-0 text-blue-600 hover:text-blue-800',
                        children: r.jsx(qi, { className: 'h-3 w-3' }),
                      }),
                    ],
                  }),
                  r.jsxs('div', {
                    className: 'flex items-center gap-2',
                    children: [
                      r.jsx(tn, {
                        variant: 'secondary',
                        className: 'bg-blue-100 text-blue-800',
                        children: n.name,
                      }),
                      r.jsx('span', {
                        className: 'text-xs text-blue-600 truncate',
                        children: n.path,
                      }),
                    ],
                  }),
                ],
              }),
            r.jsxs('div', {
              className: 'space-y-2',
              children: [
                r.jsx('label', {
                  className: 'text-sm font-medium',
                  children: 'Sélectionner un projet',
                }),
                r.jsx('select', {
                  onChange: c => f(c.target.value),
                  value: (n == null ? void 0 : n.id) || '',
                  className:
                    'w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900',
                  children: s.map(c =>
                    r.jsxs(
                      'option',
                      {
                        value: c.id,
                        children: [c.name, ' ', c.isActive ? '(Actif)' : ''],
                      },
                      c.id
                    )
                  ),
                }),
              ],
            }),
            r.jsx('div', {
              className: 'flex gap-2',
              children: r.jsxs(Xe, {
                variant: 'outline',
                size: 'sm',
                onClick: w,
                className: 'flex-1',
                children: [
                  r.jsx(Ui, { className: 'h-4 w-4 mr-1' }),
                  'Historique',
                ],
              }),
            }),
            l &&
              a.length > 0 &&
              r.jsxs('div', {
                className: 'space-y-2',
                children: [
                  r.jsx('label', {
                    className: 'text-sm font-medium',
                    children: 'Historique récent',
                  }),
                  r.jsx('div', {
                    className: 'space-y-1 max-h-32 overflow-y-auto',
                    children: a.map(c =>
                      r.jsx(
                        Xe,
                        {
                          variant:
                            c.id === (n == null ? void 0 : n.id)
                              ? 'default'
                              : 'outline',
                          size: 'sm',
                          onClick: () => S(c.id),
                          className: 'w-full justify-start text-left',
                          children: r.jsxs('div', {
                            className: 'truncate',
                            children: [
                              r.jsx('div', {
                                className: 'font-medium',
                                children: c.name,
                              }),
                              r.jsx('div', {
                                className: 'text-xs opacity-70 truncate',
                                children: c.path,
                              }),
                            ],
                          }),
                        },
                        c.id
                      )
                    ),
                  }),
                ],
              }),
            r.jsx('div', {
              className: 'pt-2 border-t',
              children: r.jsxs('div', {
                className: 'text-xs text-muted-foreground',
                children: [
                  s.length,
                  ' projet',
                  s.length > 1 ? 's' : '',
                  ' disponible',
                  s.length > 1 ? 's' : '',
                ],
              }),
            }),
          ],
        }),
      ],
    });
  },
  Hr = [
    { id: 'analysis', label: 'Analysis', icon: r.jsx(Ie, {}) },
    { id: 'planning', label: 'Planning', icon: r.jsx(Ie, {}) },
    { id: 'solutioning', label: 'Solutioning', icon: r.jsx(Ie, {}) },
    { id: 'implementation', label: 'Implementation', icon: r.jsx(Ie, {}) },
  ];
function Gi({
  drawerWidth: t,
  sidebarOpen: e,
  currentPhase: s,
  onDrawerToggle: n,
  onThemeToggle: o,
}) {
  var i, l;
  const a = sr();
  return (
    fe(),
    r.jsx(dn, {
      position: 'fixed',
      sx: {
        width: { md: e ? `calc(100% - ${t}px)` : '100%' },
        ml: { md: e ? `${t}px` : 0 },
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: `1px solid ${a.palette.divider}`,
      },
      children: r.jsxs(Gr, {
        sx: { gap: 2 },
        role: 'toolbar',
        'aria-label': "Contrôles principaux de l'application",
        children: [
          r.jsx(Q, {
            color: 'inherit',
            'aria-label': 'Ouvrir le menu de navigation',
            edge: 'start',
            onClick: n,
            sx: { mr: 1, display: { md: 'none' } },
            children: r.jsx(un, {}),
          }),
          r.jsxs(j, {
            sx: { display: 'flex', alignItems: 'center', gap: 1 },
            children: [
              r.jsx(ee, {
                label:
                  (i = Hr.find(p => p.id === s)) == null ? void 0 : i.label,
                color: 'primary',
                variant: 'outlined',
                size: 'small',
                icon: (l = Hr.find(p => p.id === s)) == null ? void 0 : l.icon,
              }),
              r.jsx(v, {
                variant: 'body2',
                color: 'text.secondary',
                children: 'Phase actuelle',
              }),
            ],
          }),
          r.jsx(j, { sx: { flexGrow: 1 } }),
          r.jsx(j, {
            sx: { minWidth: 200, display: { xs: 'none', sm: 'block' } },
            children: r.jsx(Vi, {}),
          }),
          r.jsx(nr, {
            control: r.jsx(or, {
              checked: !0,
              onChange: o,
              icon: r.jsx(Ie, {}),
              checkedIcon: r.jsx(Ie, {}),
              color: 'primary',
            }),
            label: r.jsxs(j, {
              sx: { display: 'flex', alignItems: 'center', gap: 1 },
              children: [
                r.jsx(Ie, { sx: { fontSize: 16 } }),
                r.jsx(v, { variant: 'caption', children: 'Sombre' }),
              ],
            }),
            sx: { mx: 1 },
          }),
          r.jsx(Q, {
            color: 'inherit',
            'aria-label': 'Notifications (aucune nouvelle notification)',
            sx: { position: 'relative' },
            children: r.jsx(pn, {
              badgeContent: 0,
              color: 'error',
              'aria-label': '0 notifications non lues',
              children: r.jsx(hn, {}),
            }),
          }),
          r.jsx(Qa, {}),
        ],
      }),
    })
  );
}
const Ji = [
    {
      id: 'analysis',
      label: 'Analysis',
      icon: r.jsx(fn, {}),
      description: 'Brainstorming, research, brief creation',
      path: '/analysis',
      workflows: [
        'brainstorm-project',
        'brainstorm-game',
        'research',
        'product-brief',
        'game-brief',
      ],
    },
    {
      id: 'planning',
      label: 'Planning',
      icon: r.jsx(xn, {}),
      description: 'PRD/GDD creation, UX specification',
      path: '/planning',
      workflows: ['plan-project', 'ux-spec'],
    },
    {
      id: 'solutioning',
      label: 'Solutioning',
      icon: r.jsx(mn, {}),
      description: 'Architecture design, technical specs',
      path: '/solutioning',
      workflows: ['solution-architecture', 'tech-spec'],
    },
    {
      id: 'implementation',
      label: 'Implementation',
      icon: r.jsx(gn, {}),
      description: 'Story development and testing',
      path: '/implementation',
      workflows: ['create-story', 'dev-story', 'story-approved'],
    },
  ],
  Ki = [
    { text: 'Dashboard', icon: r.jsx(bn, {}), path: '/' },
    { text: 'Projects', icon: r.jsx(Kr, {}), path: '/projects' },
    { text: 'Workflows', icon: r.jsx(yn, {}), path: '/workflows' },
    { text: 'Kanban', icon: r.jsx(jn, {}), path: '/kanban' },
    { text: 'Agents', icon: r.jsx(ar, {}), path: '/agents' },
    { text: 'IDE Hub', icon: r.jsx(wn, {}), path: '/ide-hub' },
  ];
function Xi({
  drawerWidth: t,
  sidebarOpen: e,
  currentPhase: s,
  onPhaseChange: n,
  onNavigate: o,
}) {
  const a = sr(),
    i = Jr(a.breakpoints.down('md')),
    l = r.jsxs(j, {
      sx: { height: '100%', display: 'flex', flexDirection: 'column' },
      children: [
        r.jsx(Gr, {
          sx: { px: 2, py: 1 },
          children: r.jsx(v, {
            variant: 'h6',
            noWrap: !0,
            component: 'div',
            sx: { fontWeight: 600 },
            children: 'BMad Visual Studio',
          }),
        }),
        r.jsx(Me, {}),
        r.jsxs(j, {
          sx: { flex: 1, overflowY: 'auto' },
          children: [
            r.jsx(v, {
              variant: 'overline',
              sx: { px: 2, py: 1, display: 'block', color: 'text.secondary' },
              children: 'Phases BMad-Method',
            }),
            r.jsx(gt, {
              dense: !0,
              children: Ji.map(p => {
                const f = s === p.id;
                return r.jsx(
                  bt,
                  {
                    disablePadding: !0,
                    sx: { mb: 0.5 },
                    children: r.jsxs(zt, {
                      selected: f,
                      onClick: () => {
                        (n(p.id), o(p.path));
                      },
                      sx: {
                        mx: 1,
                        borderRadius: 1,
                        backgroundColor: f ? 'primary.main' : 'transparent',
                        color: f ? 'primary.contrastText' : 'text.primary',
                        '&:hover': {
                          backgroundColor: f ? 'primary.dark' : 'action.hover',
                        },
                        '& .MuiListItemIcon-root': {
                          color: f ? 'primary.contrastText' : 'inherit',
                        },
                      },
                      children: [
                        r.jsx(Ye, { sx: { minWidth: 36 }, children: p.icon }),
                        r.jsx(yt, {
                          primary: p.label,
                          secondary: p.description,
                          primaryTypographyProps: {
                            variant: 'body2',
                            fontWeight: f ? 600 : 400,
                          },
                          secondaryTypographyProps: {
                            variant: 'caption',
                            color: f
                              ? 'primary.contrastText'
                              : 'text.secondary',
                          },
                        }),
                      ],
                    }),
                  },
                  p.id
                );
              }),
            }),
            r.jsx(Me, { sx: { my: 2 } }),
            r.jsx(v, {
              variant: 'overline',
              sx: { px: 2, py: 1, display: 'block', color: 'text.secondary' },
              children: 'Actions Rapides',
            }),
            r.jsx(gt, {
              dense: !0,
              children: Ki.map(p =>
                r.jsx(
                  bt,
                  {
                    disablePadding: !0,
                    sx: { mb: 0.5 },
                    children: r.jsxs(zt, {
                      onClick: () => o(p.path),
                      sx: {
                        mx: 1,
                        borderRadius: 1,
                        '&:hover': { backgroundColor: 'action.hover' },
                      },
                      children: [
                        r.jsx(Ye, { sx: { minWidth: 36 }, children: p.icon }),
                        r.jsx(yt, { primary: p.text }),
                      ],
                    }),
                  },
                  p.text
                )
              ),
            }),
          ],
        }),
        r.jsx(Me, {}),
        r.jsx(gt, {
          dense: !0,
          children: r.jsx(bt, {
            disablePadding: !0,
            children: r.jsxs(zt, {
              onClick: () => o('/settings'),
              children: [
                r.jsx(Ye, { children: r.jsx(At, {}) }),
                r.jsx(yt, { primary: 'Settings' }),
              ],
            }),
          }),
        }),
      ],
    });
  return r.jsxs(j, {
    component: 'nav',
    sx: { width: { md: e ? t : 0 }, flexShrink: { md: 0 } },
    'aria-label': 'Navigation principale',
    children: [
      r.jsx(mr, {
        variant: 'temporary',
        open: i && e,
        onClose: () => {},
        ModalProps: { keepMounted: !0 },
        sx: {
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: t },
        },
        children: l,
      }),
      r.jsx(mr, {
        variant: 'persistent',
        sx: {
          display: { xs: 'none', md: e ? 'block' : 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: t },
        },
        open: e,
        children: l,
      }),
    ],
  });
}
function Yi({ children: t, drawerWidth: e, sidebarOpen: s }) {
  return r.jsxs(j, {
    component: 'main',
    sx: {
      flexGrow: 1,
      bgcolor: 'background.default',
      p: 3,
      width: { md: s ? `calc(100% - ${e}px)` : '100%' },
      mt: '64px',
      minHeight: 'calc(100vh - 64px)',
      transition: n =>
        n.transitions.create(['width', 'margin'], {
          easing: n.transitions.easing.sharp,
          duration: n.transitions.duration.leavingScreen,
        }),
    },
    role: 'main',
    'aria-label': 'Contenu principal',
    children: [
      r.jsx('a', {
        href: '#main-content',
        style: {
          position: 'absolute',
          top: '-40px',
          left: '6px',
          background: 'var(--mui-palette-primary-main)',
          color: 'white',
          padding: '8px',
          textDecoration: 'none',
          borderRadius: '4px',
          zIndex: 1e3,
        },
        onFocus: n => {
          n.target.style.top = '6px';
        },
        onBlur: n => {
          n.target.style.top = '-40px';
        },
        children: 'Aller au contenu principal',
      }),
      r.jsx(j, {
        id: 'main-content',
        tabIndex: -1,
        sx: { outline: 'none' },
        children: t,
      }),
    ],
  });
}
const qt = 280;
function Qi({ children: t }) {
  const e = sr(),
    s = Jr(e.breakpoints.down('md')),
    [n, o] = A.useState(!1),
    [a, i] = A.useState('implementation'),
    l = Zr(),
    p = fe(),
    { sidebarOpen: f } = te(w => w.ui),
    d = () => {
      p({ type: 'ui/toggleTheme' });
    },
    y = w => {
      (i(w), l(`/${w}`));
    },
    S = () => {
      o(!n);
    };
  return r.jsxs(j, {
    sx: { display: 'flex' },
    role: 'application',
    'aria-label': 'BMad Visual Studio - Interface de développement',
    children: [
      r.jsx(Xi, {
        drawerWidth: qt,
        sidebarOpen: f || n,
        currentPhase: a,
        onPhaseChange: y,
        onNavigate: w => {
          (l(w), s && o(!1));
        },
      }),
      r.jsxs(j, {
        sx: { flexGrow: 1, display: 'flex', flexDirection: 'column' },
        role: 'main',
        'aria-label': "Contenu principal de l'application",
        children: [
          r.jsx(Gi, {
            drawerWidth: qt,
            sidebarOpen: f || n,
            currentPhase: a,
            onDrawerToggle: S,
            onThemeToggle: d,
          }),
          r.jsx(Yi, { drawerWidth: qt, sidebarOpen: f || n, children: t }),
        ],
      }),
    ],
  });
}
function Ke({ children: t, requiredRoles: e = [], fallbackPath: s = '/' }) {
  const { isAuthenticated: n, user: o, isLoading: a } = te(i => i.auth);
  return a
    ? r.jsxs(j, {
        sx: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
        },
        children: [
          r.jsx(et, {}),
          r.jsx(v, {
            variant: 'body2',
            sx: { mt: 2 },
            children: "Vérification de l'authentification...",
          }),
        ],
      })
    : n
      ? e.length > 0 && o && !e.includes(o.role)
        ? r.jsxs(j, {
            sx: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              p: 3,
            },
            children: [
              r.jsx(v, {
                variant: 'h6',
                color: 'error',
                gutterBottom: !0,
                children: 'Accès refusé',
              }),
              r.jsx(v, {
                variant: 'body2',
                color: 'textSecondary',
                children:
                  "Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
              }),
              r.jsxs(v, {
                variant: 'body2',
                color: 'textSecondary',
                sx: { mt: 1 },
                children: ['Rôles requis : ', e.join(', ')],
              }),
              r.jsxs(v, {
                variant: 'body2',
                color: 'textSecondary',
                children: ['Votre rôle : ', o.role],
              }),
            ],
          })
        : r.jsx(r.Fragment, { children: t })
      : r.jsx(es, { to: '/', replace: !0 });
}
function ht({ title: t, value: e, color: s = 'primary' }) {
  return r.jsx(pe, {
    children: r.jsxs(he, {
      children: [
        r.jsx(v, { color: 'textSecondary', gutterBottom: !0, children: t }),
        r.jsx(v, { variant: 'h3', color: `${s}.main`, children: e }),
      ],
    }),
  });
}
const Zi = { workflow: '🔄', agent: '🤖', project: '📁', system: '⚙️' };
function el() {
  const { activityFeed: t } = te(e => e.dashboard);
  return t.length === 0
    ? r.jsx(v, { color: 'textSecondary', children: 'Aucune activité récente' })
    : r.jsx(j, {
        children: t.slice(0, 10).map(e =>
          r.jsxs(
            j,
            {
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              p: 1,
              sx: {
                borderRadius: 1,
                bgcolor:
                  e.severity === 'error'
                    ? 'error.light'
                    : e.severity === 'warning'
                      ? 'warning.light'
                      : 'transparent',
              },
              children: [
                r.jsx(Vr, {
                  sx: { width: 24, height: 24, mr: 2, fontSize: '0.8rem' },
                  children: Zi[e.type],
                }),
                r.jsxs(j, {
                  flexGrow: 1,
                  children: [
                    r.jsx(v, { variant: 'body2', children: e.message }),
                    r.jsx(v, {
                      variant: 'caption',
                      color: 'textSecondary',
                      children: new Date(e.timestamp).toLocaleTimeString(),
                    }),
                  ],
                }),
                r.jsx(ee, {
                  label: e.severity,
                  size: 'small',
                  color:
                    e.severity === 'error'
                      ? 'error'
                      : e.severity === 'warning'
                        ? 'warning'
                        : 'default',
                }),
              ],
            },
            e.id
          )
        ),
      });
}
function tl() {
  const t = Zr(),
    e = [
      {
        label: 'Démarrer un workflow',
        icon: r.jsx(Et, {}),
        path: '/workflows',
        variant: 'contained',
      },
      {
        label: 'Activer un agent',
        icon: r.jsx(ar, {}),
        path: '/agents',
        variant: 'outlined',
      },
      {
        label: 'Voir les métriques',
        icon: r.jsx(vn, {}),
        path: '/',
        variant: 'outlined',
      },
    ];
  return r.jsx(j, {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    children: e.map(s =>
      r.jsx(
        L,
        {
          variant: s.variant,
          startIcon: s.icon,
          fullWidth: !0,
          onClick: () => t(s.path),
          children: s.label,
        },
        s.label
      )
    ),
  });
}
function rl() {
  const t = fe(),
    { currentProject: e, metrics: s } = te(a => a.dashboard),
    { projects: n, loading: o } = te(a => a.projects);
  return (
    A.useEffect(() => {
      t(Fe());
    }, [t]),
    A.useEffect(() => {
      const a = new EventSource('/api/events');
      return (
        (a.onmessage = i => {
          try {
            const l = JSON.parse(i.data);
            l.type === 'metrics-updated' && t(Ha(l.metrics));
          } catch (error) {
            console.error('Error parsing SSE data:', error);
          }
        }),
        () => a.close()
      );
    }, [t]),
    o
      ? r.jsx(j, {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          children: r.jsx(Xr, { sx: { width: '50%' } }),
        })
      : !e && n.length > 0
        ? r.jsxs(j, {
            p: 3,
            children: [
              r.jsx(V, {
                severity: 'info',
                sx: { mb: 3 },
                children:
                  'Sélectionnez un projet pour commencer à utiliser BMad Visual Studio.',
              }),
              r.jsx(v, {
                variant: 'h6',
                gutterBottom: !0,
                children: 'Projets disponibles',
              }),
              r.jsx(F, {
                container: !0,
                spacing: 2,
                children: n.map(a =>
                  r.jsx(
                    F,
                    {
                      item: !0,
                      xs: 12,
                      md: 6,
                      children: r.jsx(pe, {
                        children: r.jsxs(he, {
                          children: [
                            r.jsx(v, { variant: 'h6', children: a.name }),
                            r.jsx(v, {
                              color: 'textSecondary',
                              variant: 'body2',
                              children: a.path,
                            }),
                            r.jsx(j, {
                              mt: 2,
                              children: a.modules.map(i =>
                                r.jsxs(
                                  v,
                                  {
                                    variant: 'caption',
                                    display: 'block',
                                    children: ['Module: ', i],
                                  },
                                  i
                                )
                              ),
                            }),
                            r.jsx(L, {
                              variant: 'contained',
                              size: 'small',
                              sx: { mt: 2 },
                              onClick: () =>
                                t({
                                  type: 'dashboard/setCurrentProject',
                                  payload: a,
                                }),
                              children: 'Sélectionner ce projet',
                            }),
                          ],
                        }),
                      }),
                    },
                    a.id
                  )
                ),
              }),
            ],
          })
        : r.jsxs(j, {
            children: [
              r.jsx(v, {
                variant: 'h4',
                gutterBottom: !0,
                children: 'Dashboard BMad Visual Studio',
              }),
              e &&
                r.jsxs(V, {
                  severity: 'success',
                  sx: { mb: 3 },
                  children: [
                    'Projet actif: ',
                    r.jsx('strong', { children: e.name }),
                  ],
                }),
              r.jsxs(F, {
                container: !0,
                spacing: 3,
                children: [
                  r.jsx(F, {
                    item: !0,
                    xs: 12,
                    md: 3,
                    children: r.jsx(ht, {
                      title: 'Workflows actifs',
                      value: s.activeWorkflows,
                      color: 'primary',
                    }),
                  }),
                  r.jsx(F, {
                    item: !0,
                    xs: 12,
                    md: 3,
                    children: r.jsx(ht, {
                      title: 'Stories en cours',
                      value: s.activeStories,
                      color: 'secondary',
                    }),
                  }),
                  r.jsx(F, {
                    item: !0,
                    xs: 12,
                    md: 3,
                    children: r.jsx(ht, {
                      title: 'Tâches complétées',
                      value: s.completedTasks,
                      color: 'success',
                    }),
                  }),
                  r.jsx(F, {
                    item: !0,
                    xs: 12,
                    md: 3,
                    children: r.jsx(ht, {
                      title: 'Santé du projet',
                      value: `${s.healthScore}%`,
                      color: 'warning',
                    }),
                  }),
                  r.jsx(F, {
                    item: !0,
                    xs: 12,
                    md: 4,
                    children: r.jsxs(re, {
                      sx: { p: 2 },
                      children: [
                        r.jsx(v, {
                          variant: 'h6',
                          gutterBottom: !0,
                          children: 'Actions rapides',
                        }),
                        r.jsx(tl, {}),
                      ],
                    }),
                  }),
                  r.jsx(F, {
                    item: !0,
                    xs: 12,
                    md: 8,
                    children: r.jsxs(re, {
                      sx: { p: 2 },
                      children: [
                        r.jsx(v, {
                          variant: 'h6',
                          gutterBottom: !0,
                          children: 'Activité récente',
                        }),
                        r.jsx(el, {}),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          })
  );
}
function sl() {
  const t = fe(),
    {
      projects: e,
      loading: s,
      error: n,
      currentProject: o,
    } = te(S => S.projects),
    [a, i] = A.useState(!1),
    [l, p] = A.useState({ name: '', path: '', template: 'basic' });
  A.useEffect(() => {
    t(Fe());
  }, [t]);
  const f = () => {
      t(Ze());
    },
    d = S => {
      t(Cs(S));
    },
    y = () => {
      !l.name.trim() ||
        !l.path.trim() ||
        (t(
          As({
            name: l.name,
            path: l.path,
            config: {
              core: { version: '1.0.0' },
              bmm: { enabled: l.template !== 'minimal' },
              bmb: { enabled: l.template === 'full' },
              cis: { enabled: l.template === 'full' },
            },
            manifest: {
              name: l.name,
              version: '1.0.0',
              modules:
                l.template === 'minimal'
                  ? ['core']
                  : l.template === 'basic'
                    ? ['core', 'bmm']
                    : ['core', 'bmm', 'bmb', 'cis'],
            },
            modules:
              l.template === 'minimal'
                ? ['core']
                : l.template === 'basic'
                  ? ['core', 'bmm']
                  : ['core', 'bmm', 'bmb', 'cis'],
          })
        ),
        i(!1),
        p({ name: '', path: '', template: 'basic' }));
    };
  return s
    ? r.jsx(j, {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        children: r.jsx(et, {}),
      })
    : r.jsxs(j, {
        p: 3,
        children: [
          r.jsxs(j, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            children: [
              r.jsx(v, { variant: 'h4', children: 'Projets BMad' }),
              r.jsx(L, {
                variant: 'outlined',
                startIcon: r.jsx(Sn, {}),
                onClick: f,
                children: 'Scanner les projets',
              }),
            ],
          }),
          n && r.jsx(V, { severity: 'error', sx: { mb: 3 }, children: n }),
          e.length === 0
            ? r.jsx(V, {
                severity: 'info',
                children:
                  'Aucun projet trouvé. Utilisez le bouton "Scanner les projets" pour détecter les projets BMad dans votre système.',
              })
            : r.jsx(F, {
                container: !0,
                spacing: 3,
                children: e.map(S => {
                  var w;
                  return r.jsx(
                    F,
                    {
                      item: !0,
                      xs: 12,
                      md: 6,
                      lg: 4,
                      children: r.jsx(pe, {
                        raised: (o == null ? void 0 : o.id) === S.id,
                        onClick: () => d(S.id),
                        sx: { cursor: 'pointer', '&:hover': { boxShadow: 4 } },
                        children: r.jsxs(he, {
                          children: [
                            r.jsx(v, {
                              variant: 'h6',
                              gutterBottom: !0,
                              children: S.name,
                            }),
                            r.jsx(v, {
                              color: 'textSecondary',
                              variant: 'body2',
                              gutterBottom: !0,
                              children: S.path,
                            }),
                            r.jsx(j, {
                              mt: 2,
                              mb: 2,
                              children: S.modules.map(c =>
                                r.jsx(
                                  ee,
                                  {
                                    label: c,
                                    size: 'small',
                                    sx: { mr: 1, mb: 1 },
                                  },
                                  c
                                )
                              ),
                            }),
                            r.jsxs(v, {
                              variant: 'caption',
                              display: 'block',
                              children: [
                                'Phase: ',
                                ((w = S.status) == null ? void 0 : w.phase) ||
                                  'N/A',
                              ],
                            }),
                            (o == null ? void 0 : o.id) === S.id &&
                              r.jsx(ee, {
                                label: 'Sélectionné',
                                color: 'primary',
                                size: 'small',
                                sx: { mt: 1 },
                              }),
                          ],
                        }),
                      }),
                    },
                    S.id
                  );
                }),
              }),
          r.jsx(kn, {
            color: 'primary',
            'aria-label': 'add',
            sx: { position: 'fixed', bottom: 16, right: 16 },
            onClick: () => i(!0),
            children: r.jsx(Pe, {}),
          }),
          r.jsxs(ve, {
            open: a,
            onClose: () => i(!1),
            maxWidth: 'sm',
            fullWidth: !0,
            children: [
              r.jsx(Se, { children: 'Créer un nouveau projet BMad' }),
              r.jsxs(ke, {
                children: [
                  r.jsx(W, {
                    fullWidth: !0,
                    label: 'Nom du projet',
                    value: l.name,
                    onChange: S => p(w => ({ ...w, name: S.target.value })),
                    sx: { mb: 2, mt: 1 },
                  }),
                  r.jsx(W, {
                    fullWidth: !0,
                    label: 'Chemin du projet',
                    value: l.path,
                    onChange: S => p(w => ({ ...w, path: S.target.value })),
                    sx: { mb: 2 },
                    helperText: 'Chemin absolu où créer le projet',
                  }),
                  r.jsxs(ce, {
                    fullWidth: !0,
                    children: [
                      r.jsx(de, { children: 'Template' }),
                      r.jsxs(ue, {
                        value: l.template,
                        onChange: S =>
                          p(w => ({ ...w, template: S.target.value })),
                        children: [
                          r.jsx(U, {
                            value: 'minimal',
                            children: 'Minimal (Core uniquement)',
                          }),
                          r.jsx(U, {
                            value: 'basic',
                            children: 'Basique (Core + BMM)',
                          }),
                          r.jsx(U, {
                            value: 'full',
                            children: 'Complet (Tous les modules)',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              r.jsxs(Ce, {
                children: [
                  r.jsx(L, { onClick: () => i(!1), children: 'Annuler' }),
                  r.jsx(L, {
                    onClick: y,
                    variant: 'contained',
                    children: 'Créer le projet',
                  }),
                ],
              }),
            ],
          }),
        ],
      });
}
const nl = () => {
  const t = fe();
  A.useEffect(() => {
    const e = new EventSource('/api/events');
    return (
      (e.onmessage = s => {
        try {
          const n = JSON.parse(s.data);
          switch (n.type) {
            case 'workflow-started': {
              t(Br(n.data));
              break;
            }
            case 'workflow-completed': {
              t(Br(n.data));
              break;
            }
            case 'workflow-progress': {
              t(
                Ia({
                  executionId: n.data.executionId,
                  progress: n.data.progress,
                  currentStep: n.data.currentStep,
                  output: n.data.output,
                })
              );
              break;
            }
            case 'project-updated': {
              break;
            }
            case 'agent-activated': {
              break;
            }
            default: {
              console.log('Unhandled event type:', n.type);
            }
          }
        } catch (error) {
          console.error('Error parsing SSE data:', error);
        }
      }),
      (e.onerror = s => {
        console.error('SSE connection error:', s);
      }),
      () => {
        e.close();
      }
    );
  }, [t]);
};
function ol(t) {
  const { children: e, value: s, index: n, ...o } = t;
  return r.jsx('div', {
    role: 'tabpanel',
    hidden: s !== n,
    id: `workflow-tabpanel-${n}`,
    'aria-labelledby': `workflow-tab-${n}`,
    ...o,
    children: s === n && r.jsx(j, { sx: { p: 3 }, children: e }),
  });
}
function al() {
  const t = fe(),
    { currentProject: e } = te(c => c.dashboard),
    {
      workflows: s,
      executions: n,
      loading: o,
      error: a,
    } = te(c => c.workflows),
    [i, l] = A.useState(0);
  (nl(),
    A.useEffect(() => {
      e && t(St({ projectId: e.id, projectPath: e.path }));
    }, [t, e]));
  const p = (c, g) => {
      l(g);
    },
    f = [
      { id: 'analysis', name: 'Analysis', icon: '📊' },
      { id: 'planning', name: 'Planning', icon: '📋' },
      { id: 'solutioning', name: 'Solutioning', icon: '🏗️' },
      { id: 'implementation', name: 'Implementation', icon: '⚡' },
    ],
    d = c => s.filter(g => g.phase === c),
    y = c => n.find(g => g.workflowId === c && g.status === 'running'),
    S = c => {
      switch (c) {
        case 'completed': {
          return r.jsx(En, { sx: { color: 'success.main' } });
        }
        case 'failed': {
          return r.jsx(An, { sx: { color: 'error.main' } });
        }
        case 'running': {
          return r.jsx(et, { size: 16 });
        }
        default: {
          return r.jsx(Yr, { sx: { color: 'text.secondary' } });
        }
      }
    },
    w = c => {
      const g = new Date(),
        b = new Date(c),
        E = Math.floor((g.getTime() - b.getTime()) / 1e3);
      return E < 60
        ? `${E}s`
        : E < 3600
          ? `${Math.floor(E / 60)}m`
          : `${Math.floor(E / 3600)}h`;
    };
  return e
    ? o
      ? r.jsx(j, {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          children: r.jsx(et, {}),
        })
      : r.jsxs(j, {
          children: [
            r.jsx(v, {
              variant: 'h4',
              gutterBottom: !0,
              children: 'Workflows BMad Method',
            }),
            r.jsxs(v, {
              variant: 'body1',
              color: 'textSecondary',
              paragraph: !0,
              children: ['Projet: ', r.jsx('strong', { children: e.name })],
            }),
            a && r.jsx(V, { severity: 'error', sx: { mb: 3 }, children: a }),
            r.jsx(j, {
              sx: { borderBottom: 1, borderColor: 'divider' },
              children: r.jsx(qr, {
                value: i,
                onChange: p,
                'aria-label': 'workflow phases',
                children: f.map((c, g) =>
                  r.jsx(
                    Gt,
                    {
                      label: `${c.icon} ${c.name}`,
                      id: `workflow-tab-${g}`,
                      'aria-controls': `workflow-tabpanel-${g}`,
                    },
                    c.id
                  )
                ),
              }),
            }),
            f.map((c, g) =>
              r.jsx(
                ol,
                {
                  value: i,
                  index: g,
                  children:
                    d(c.id).length === 0
                      ? r.jsxs(V, {
                          severity: 'info',
                          children: [
                            'Aucun workflow trouvé pour la phase ',
                            c.name,
                            '.',
                          ],
                        })
                      : r.jsx(F, {
                          container: !0,
                          spacing: 3,
                          children: d(c.id).map(b => {
                            const E = y(b.id);
                            return r.jsx(
                              F,
                              {
                                item: !0,
                                xs: 12,
                                md: 6,
                                lg: 4,
                                children: r.jsx(pe, {
                                  children: r.jsxs(he, {
                                    children: [
                                      r.jsxs(j, {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        mb: 1,
                                        children: [
                                          r.jsx(v, {
                                            variant: 'h6',
                                            children: b.name,
                                          }),
                                          E && S(E.status),
                                        ],
                                      }),
                                      r.jsx(v, {
                                        variant: 'body2',
                                        color: 'textSecondary',
                                        paragraph: !0,
                                        children: b.description,
                                      }),
                                      E &&
                                        E.progress !== void 0 &&
                                        r.jsxs(j, {
                                          mb: 2,
                                          children: [
                                            r.jsxs(j, {
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              mb: 1,
                                              children: [
                                                r.jsxs(v, {
                                                  variant: 'body2',
                                                  children: [
                                                    'Progression: ',
                                                    E.progress,
                                                    '%',
                                                  ],
                                                }),
                                                r.jsx(v, {
                                                  variant: 'body2',
                                                  color: 'textSecondary',
                                                  children: w(E.startedAt),
                                                }),
                                              ],
                                            }),
                                            r.jsx(Xr, {
                                              variant: 'determinate',
                                              value: E.progress,
                                              sx: {
                                                height: 6,
                                                borderRadius: 3,
                                              },
                                            }),
                                            E.currentStep &&
                                              r.jsxs(v, {
                                                variant: 'caption',
                                                color: 'textSecondary',
                                                display: 'block',
                                                mt: 1,
                                                children: [
                                                  'Étape actuelle: ',
                                                  E.currentStep,
                                                ],
                                              }),
                                          ],
                                        }),
                                      r.jsxs(j, {
                                        mb: 2,
                                        children: [
                                          r.jsx(ee, {
                                            label: c.name,
                                            size: 'small',
                                            sx: { mr: 1 },
                                          }),
                                          r.jsx(ee, {
                                            label: b.module,
                                            size: 'small',
                                          }),
                                        ],
                                      }),
                                      r.jsxs(j, {
                                        display: 'flex',
                                        gap: 1,
                                        children: [
                                          r.jsx(L, {
                                            variant: 'contained',
                                            startIcon: r.jsx(Et, {}),
                                            size: 'small',
                                            disabled: !!E,
                                            onClick: () =>
                                              t(
                                                Os({
                                                  projectId: e.id,
                                                  workflowId: b.id,
                                                  params: {},
                                                })
                                              ),
                                            children: E
                                              ? 'En cours...'
                                              : 'Exécuter',
                                          }),
                                          r.jsx(L, {
                                            variant: 'outlined',
                                            startIcon: r.jsx(Cn, {}),
                                            size: 'small',
                                            children: 'Détails',
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                              },
                              b.id
                            );
                          }),
                        }),
                },
                c.id
              )
            ),
          ],
        })
    : r.jsx(j, {
        p: 3,
        children: r.jsx(V, {
          severity: 'info',
          children:
            "Sélectionnez d'abord un projet pour voir les workflows disponibles.",
        }),
      });
}
const ft = [
    { value: 'task', label: 'Tâche', icon: '📋', color: '#2196f3' },
    { value: 'decision', label: 'Décision', icon: '🔀', color: '#ff9800' },
    { value: 'parallel', label: 'Parallèle', icon: '⚡', color: '#9c27b0' },
    { value: 'merge', label: 'Fusion', icon: '🔗', color: '#4caf50' },
  ],
  il = [
    { value: 'core', label: 'Core' },
    { value: 'bmm', label: 'Business Model Management' },
    { value: 'bmb', label: 'BMad Builder' },
    { value: 'cis', label: 'Creative Intelligence Systems' },
  ],
  ll = [
    { value: 'analysis', label: 'Analysis' },
    { value: 'planning', label: 'Planning' },
    { value: 'solutioning', label: 'Solutioning' },
    { value: 'implementation', label: 'Implementation' },
  ];
function cl() {
  fe();
  const { currentProject: t } = te(u => u.dashboard),
    [e, s] = A.useState({
      id: '',
      name: '',
      description: '',
      module: 'core',
      phase: 'analysis',
      steps: [],
      variables: [],
    }),
    [n, o] = A.useState(null),
    [a, i] = A.useState(null),
    [l, p] = A.useState(!1),
    [f, d] = A.useState(!1),
    [y, S] = A.useState(!1),
    [w, c] = A.useState({}),
    [g, b] = A.useState({ open: !1, message: '', severity: 'success' }),
    E = A.useRef(null),
    _ = A.useCallback((u, T) => {
      i(T);
    }, []),
    R = A.useCallback(u => {
      u.preventDefault();
    }, []),
    P = A.useCallback(
      u => {
        if ((u.preventDefault(), !a || !E.current)) return;
        const T = E.current.getBoundingClientRect(),
          N = u.clientX - T.left,
          ie = u.clientY - T.top;
        (s(se => ({
          ...se,
          steps: se.steps.map(le =>
            le.id === a.id ? { ...le, position: { x: N, y: ie } } : le
          ),
        })),
          i(null));
      },
      [a]
    ),
    M = A.useCallback(() => {
      const u = {
        id: `step-${Date.now()}`,
        name: w.name || 'Nouvelle étape',
        type: w.type || 'task',
        description: w.description || '',
        parameters: w.parameters || {},
        position: { x: 100, y: 100 },
        connections: [],
      };
      (s(T => ({ ...T, steps: [...T.steps, u] })), c({}), d(!1));
    }, [w]),
    q = A.useCallback(
      u => {
        (s(T => ({ ...T, steps: T.steps.filter(N => N.id !== u) })),
          (n == null ? void 0 : n.id) === u && o(null));
      },
      [n]
    ),
    H = A.useCallback(u => {
      (s(T => ({ ...T, steps: T.steps.map(N => (N.id === u.id ? u : N)) })),
        o(u));
    }, []),
    m = A.useCallback(async () => {
      if (!e.name.trim()) {
        b({
          open: !0,
          message: 'Le nom du workflow est obligatoire',
          severity: 'error',
        });
        return;
      }
      try {
        const u = h(e);
        (console.log('Saving workflow:', u),
          b({
            open: !0,
            message: `Workflow "${e.name}" sauvegardé avec succès`,
            severity: 'success',
          }),
          S(!1));
      } catch {
        b({
          open: !0,
          message: 'Erreur lors de la sauvegarde du workflow',
          severity: 'error',
        });
      }
    }, [e]),
    h = u => {
      const T = {
        name: u.name,
        description: u.description,
        module: u.module,
        phase: u.phase,
        variables: u.variables.reduce(
          (N, ie) => ((N[ie.name] = ie.defaultValue || ''), N),
          {}
        ),
        steps: u.steps.map(N => ({
          id: N.id,
          name: N.name,
          type: N.type,
          description: N.description,
          parameters: N.parameters,
          position: N.position,
          connections: N.connections,
        })),
      };
      return JSON.stringify(T, null, 2);
    };
  return t
    ? r.jsxs(j, {
        sx: { height: '100vh', display: 'flex', flexDirection: 'column' },
        children: [
          r.jsx(re, {
            sx: { p: 2, mb: 2 },
            children: r.jsxs(j, {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              children: [
                r.jsxs(j, {
                  children: [
                    r.jsx(v, {
                      variant: 'h4',
                      gutterBottom: !0,
                      children: '🏗️ Constructeur de Workflows',
                    }),
                    r.jsx(v, {
                      variant: 'body1',
                      color: 'textSecondary',
                      children:
                        'Créez des workflows personnalisés pour votre projet BMad',
                    }),
                  ],
                }),
                r.jsxs(j, {
                  display: 'flex',
                  gap: 1,
                  children: [
                    r.jsx(L, {
                      variant: 'outlined',
                      startIcon: r.jsx(Qr, {}),
                      onClick: () => S(!0),
                      children: 'Sauvegarder',
                    }),
                    r.jsx(L, {
                      variant: 'contained',
                      startIcon: r.jsx(Et, {}),
                      color: 'success',
                      children: 'Tester',
                    }),
                  ],
                }),
              ],
            }),
          }),
          r.jsxs(j, {
            sx: { display: 'flex', flex: 1, gap: 2 },
            children: [
              r.jsxs(re, {
                sx: { width: 280, p: 2 },
                children: [
                  r.jsx(v, {
                    variant: 'h6',
                    gutterBottom: !0,
                    children: '🧰 Outils',
                  }),
                  r.jsxs(j, {
                    mb: 3,
                    children: [
                      r.jsx(v, {
                        variant: 'subtitle2',
                        gutterBottom: !0,
                        children: 'Informations du workflow',
                      }),
                      r.jsx(W, {
                        fullWidth: !0,
                        size: 'small',
                        label: 'Nom du workflow',
                        value: e.name,
                        onChange: u => s(T => ({ ...T, name: u.target.value })),
                        sx: { mb: 2 },
                      }),
                      r.jsx(W, {
                        fullWidth: !0,
                        size: 'small',
                        label: 'Description',
                        multiline: !0,
                        rows: 2,
                        value: e.description,
                        onChange: u =>
                          s(T => ({ ...T, description: u.target.value })),
                        sx: { mb: 2 },
                      }),
                      r.jsxs(F, {
                        container: !0,
                        spacing: 2,
                        children: [
                          r.jsx(F, {
                            item: !0,
                            xs: 6,
                            children: r.jsxs(ce, {
                              fullWidth: !0,
                              size: 'small',
                              children: [
                                r.jsx(de, { children: 'Module' }),
                                r.jsx(ue, {
                                  value: e.module,
                                  onChange: u =>
                                    s(T => ({ ...T, module: u.target.value })),
                                  children: il.map(u =>
                                    r.jsx(
                                      U,
                                      { value: u.value, children: u.label },
                                      u.value
                                    )
                                  ),
                                }),
                              ],
                            }),
                          }),
                          r.jsx(F, {
                            item: !0,
                            xs: 6,
                            children: r.jsxs(ce, {
                              fullWidth: !0,
                              size: 'small',
                              children: [
                                r.jsx(de, { children: 'Phase' }),
                                r.jsx(ue, {
                                  value: e.phase,
                                  onChange: u =>
                                    s(T => ({ ...T, phase: u.target.value })),
                                  children: ll.map(u =>
                                    r.jsx(
                                      U,
                                      { value: u.value, children: u.label },
                                      u.value
                                    )
                                  ),
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  r.jsx(Me, { sx: { my: 2 } }),
                  r.jsx(v, {
                    variant: 'subtitle2',
                    gutterBottom: !0,
                    children: 'Étapes disponibles',
                  }),
                  ft.map(u =>
                    r.jsx(
                      pe,
                      {
                        sx: {
                          mb: 1,
                          cursor: 'grab',
                          border: '2px dashed transparent',
                          '&:hover': {
                            borderColor: u.color,
                            bgcolor: `${u.color}10`,
                          },
                        },
                        draggable: !0,
                        onDragStart: T => {
                          T.dataTransfer.setData('stepType', u.value);
                        },
                        children: r.jsx(he, {
                          sx: { p: 2, '&:last-child': { pb: 2 } },
                          children: r.jsxs(j, {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            children: [
                              r.jsx(v, { children: u.icon }),
                              r.jsx(v, { variant: 'body2', children: u.label }),
                            ],
                          }),
                        }),
                      },
                      u.value
                    )
                  ),
                  r.jsx(L, {
                    fullWidth: !0,
                    variant: 'outlined',
                    startIcon: r.jsx(Pe, {}),
                    onClick: () => d(!0),
                    sx: { mt: 2 },
                    children: 'Ajouter une étape personnalisée',
                  }),
                ],
              }),
              r.jsx(re, {
                ref: E,
                sx: {
                  flex: 1,
                  position: 'relative',
                  overflow: 'hidden',
                  background:
                    'linear-gradient(45deg, #f5f5f5 25%, transparent 25%), linear-gradient(-45deg, #f5f5f5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f5f5f5 75%), linear-gradient(-45deg, transparent 75%, #f5f5f5 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                },
                onDragOver: R,
                onDrop: P,
                children: r.jsxs(j, {
                  p: 2,
                  children: [
                    r.jsx(v, {
                      variant: 'h6',
                      gutterBottom: !0,
                      children: 'Zone de travail',
                    }),
                    e.steps.length === 0
                      ? r.jsx(j, {
                          sx: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 300,
                            border: '2px dashed #ccc',
                            borderRadius: 2,
                          },
                          children: r.jsx(v, {
                            color: 'textSecondary',
                            children:
                              'Glissez des étapes depuis la boîte à outils ou cliquez sur "Ajouter une étape"',
                          }),
                        })
                      : r.jsx(j, {
                          sx: { position: 'relative', height: 400 },
                          children: e.steps.map(u => {
                            var T;
                            return r.jsx(
                              pe,
                              {
                                sx: {
                                  position: 'absolute',
                                  left: u.position.x,
                                  top: u.position.y,
                                  width: 200,
                                  cursor:
                                    (n == null ? void 0 : n.id) === u.id
                                      ? 'default'
                                      : 'pointer',
                                  border:
                                    (n == null ? void 0 : n.id) === u.id
                                      ? '2px solid #2196f3'
                                      : '1px solid #ddd',
                                  boxShadow:
                                    (n == null ? void 0 : n.id) === u.id
                                      ? 3
                                      : 1,
                                },
                                onClick: () => o(u),
                                draggable: !0,
                                onDragStart: N => _(N, u),
                                children: r.jsxs(he, {
                                  sx: { p: 2 },
                                  children: [
                                    r.jsxs(j, {
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      mb: 1,
                                      children: [
                                        r.jsxs(v, {
                                          variant: 'subtitle2',
                                          children: [
                                            (T = ft.find(
                                              N => N.value === u.type
                                            )) == null
                                              ? void 0
                                              : T.icon,
                                            ' ',
                                            u.name,
                                          ],
                                        }),
                                        r.jsxs(j, {
                                          children: [
                                            r.jsx(gr, {
                                              title: 'Modifier',
                                              children: r.jsx(Q, {
                                                size: 'small',
                                                onClick: N => {
                                                  (N.stopPropagation(),
                                                    o(u),
                                                    p(!0));
                                                },
                                                children: r.jsx(Qe, {
                                                  fontSize: 'small',
                                                }),
                                              }),
                                            }),
                                            r.jsx(gr, {
                                              title: 'Supprimer',
                                              children: r.jsx(Q, {
                                                size: 'small',
                                                onClick: N => {
                                                  (N.stopPropagation(),
                                                    q(u.id));
                                                },
                                                children: r.jsx(Le, {
                                                  fontSize: 'small',
                                                }),
                                              }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    r.jsx(v, {
                                      variant: 'caption',
                                      color: 'textSecondary',
                                      children: u.description,
                                    }),
                                  ],
                                }),
                              },
                              u.id
                            );
                          }),
                        }),
                  ],
                }),
              }),
              r.jsxs(re, {
                sx: { width: 300, p: 2 },
                children: [
                  r.jsxs(v, {
                    variant: 'h6',
                    gutterBottom: !0,
                    children: [
                      r.jsx(At, { sx: { mr: 1, verticalAlign: 'middle' } }),
                      'Propriétés',
                    ],
                  }),
                  n
                    ? r.jsxs(j, {
                        children: [
                          r.jsx(W, {
                            fullWidth: !0,
                            size: 'small',
                            label: "Nom de l'étape",
                            value: n.name,
                            onChange: u => H({ ...n, name: u.target.value }),
                            sx: { mb: 2 },
                          }),
                          r.jsxs(ce, {
                            fullWidth: !0,
                            size: 'small',
                            sx: { mb: 2 },
                            children: [
                              r.jsx(de, { children: 'Type' }),
                              r.jsx(ue, {
                                value: n.type,
                                onChange: u =>
                                  H({ ...n, type: u.target.value }),
                                children: ft.map(u =>
                                  r.jsxs(
                                    U,
                                    {
                                      value: u.value,
                                      children: [u.icon, ' ', u.label],
                                    },
                                    u.value
                                  )
                                ),
                              }),
                            ],
                          }),
                          r.jsx(W, {
                            fullWidth: !0,
                            size: 'small',
                            label: 'Description',
                            multiline: !0,
                            rows: 3,
                            value: n.description,
                            onChange: u =>
                              H({ ...n, description: u.target.value }),
                            sx: { mb: 2 },
                          }),
                          r.jsx(v, {
                            variant: 'subtitle2',
                            gutterBottom: !0,
                            children: 'Connexions',
                          }),
                          r.jsx(j, {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            mb: 2,
                            children: e.steps
                              .filter(u => u.id !== n.id)
                              .map(u =>
                                r.jsx(
                                  ee,
                                  {
                                    label: u.name,
                                    size: 'small',
                                    variant: n.connections.includes(u.id)
                                      ? 'filled'
                                      : 'outlined',
                                    onClick: () => {
                                      const T = n.connections.includes(u.id);
                                      H({
                                        ...n,
                                        connections: T
                                          ? n.connections.filter(
                                              N => N !== u.id
                                            )
                                          : [...n.connections, u.id],
                                      });
                                    },
                                  },
                                  u.id
                                )
                              ),
                          }),
                        ],
                      })
                    : r.jsx(v, {
                        color: 'textSecondary',
                        children:
                          'Sélectionnez une étape pour voir ses propriétés',
                      }),
                ],
              }),
            ],
          }),
          r.jsxs(ve, {
            open: f,
            onClose: () => d(!1),
            maxWidth: 'sm',
            fullWidth: !0,
            children: [
              r.jsx(Se, { children: 'Ajouter une nouvelle étape' }),
              r.jsxs(ke, {
                children: [
                  r.jsx(W, {
                    fullWidth: !0,
                    label: "Nom de l'étape",
                    value: w.name || '',
                    onChange: u => c(T => ({ ...T, name: u.target.value })),
                    sx: { mb: 2, mt: 1 },
                  }),
                  r.jsxs(ce, {
                    fullWidth: !0,
                    sx: { mb: 2 },
                    children: [
                      r.jsx(de, { children: "Type d'étape" }),
                      r.jsx(ue, {
                        value: w.type || 'task',
                        onChange: u => c(T => ({ ...T, type: u.target.value })),
                        children: ft.map(u =>
                          r.jsxs(
                            U,
                            {
                              value: u.value,
                              children: [u.icon, ' ', u.label],
                            },
                            u.value
                          )
                        ),
                      }),
                    ],
                  }),
                  r.jsx(W, {
                    fullWidth: !0,
                    label: 'Description',
                    multiline: !0,
                    rows: 3,
                    value: w.description || '',
                    onChange: u =>
                      c(T => ({ ...T, description: u.target.value })),
                  }),
                ],
              }),
              r.jsxs(Ce, {
                children: [
                  r.jsx(L, { onClick: () => d(!1), children: 'Annuler' }),
                  r.jsx(L, {
                    onClick: M,
                    variant: 'contained',
                    children: 'Ajouter',
                  }),
                ],
              }),
            ],
          }),
          r.jsxs(ve, {
            open: y,
            onClose: () => S(!1),
            maxWidth: 'sm',
            fullWidth: !0,
            children: [
              r.jsx(Se, { children: 'Sauvegarder le workflow' }),
              r.jsxs(ke, {
                children: [
                  r.jsx(V, {
                    severity: 'info',
                    sx: { mb: 2 },
                    children:
                      'Le workflow sera sauvegardé dans votre projet BMad sous forme de fichier YAML.',
                  }),
                  r.jsx(W, {
                    fullWidth: !0,
                    label: 'Nom du fichier (optionnel)',
                    helperText: 'Laissez vide pour utiliser le nom du workflow',
                    sx: { mb: 2 },
                  }),
                  r.jsxs(v, {
                    variant: 'body2',
                    color: 'textSecondary',
                    children: [
                      r.jsx('strong', { children: 'Emplacement:' }),
                      ' ',
                      t.path,
                      '/bmad/',
                      e.module,
                      '/workflows/custom/',
                    ],
                  }),
                ],
              }),
              r.jsxs(Ce, {
                children: [
                  r.jsx(L, { onClick: () => S(!1), children: 'Annuler' }),
                  r.jsx(L, {
                    onClick: m,
                    variant: 'contained',
                    children: 'Sauvegarder',
                  }),
                ],
              }),
            ],
          }),
          r.jsx(Rn, {
            open: g.open,
            autoHideDuration: 4e3,
            onClose: () => b(u => ({ ...u, open: !1 })),
            children: r.jsx(V, {
              severity: g.severity,
              onClose: () => b(u => ({ ...u, open: !1 })),
              children: g.message,
            }),
          }),
        ],
      })
    : r.jsx(j, {
        p: 3,
        children: r.jsx(V, {
          severity: 'info',
          children:
            "Sélectionnez d'abord un projet pour créer des workflows personnalisés.",
        }),
      });
}
const Vt = {
    todo: '#757575',
    'in-progress': '#2196f3',
    review: '#ff9800',
    done: '#4caf50',
    planning: '#9c27b0',
    completed: '#4caf50',
  },
  dl = {
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336',
    critical: '#d32f2f',
  };
function ul() {
  fe();
  const { currentProject: t } = te(m => m.dashboard),
    [e, s] = A.useState([
      {
        id: 'epic-1',
        title: 'Interface utilisateur moderne',
        description:
          'Développer une interface utilisateur moderne et intuitive pour BMad Visual Studio',
        status: 'in-progress',
        priority: 'high',
        assignee: 'Développeur',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        stories: ['story-1', 'story-2'],
      },
    ]),
    [n, o] = A.useState([
      {
        id: 'story-1',
        title: 'Dashboard principal',
        description:
          'Créer le tableau de bord principal avec métriques et activité',
        status: 'done',
        priority: 'high',
        assignee: 'Développeur',
        epicId: 'epic-1',
        points: 8,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['ui', 'dashboard'],
      },
      {
        id: 'story-2',
        title: 'Gestion des workflows',
        description: 'Interface pour gérer et exécuter les workflows BMad',
        status: 'in-progress',
        priority: 'high',
        assignee: 'Développeur',
        epicId: 'epic-1',
        points: 13,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['workflows', 'execution'],
      },
    ]),
    [a, i] = A.useState([
      {
        id: 'task-1',
        title: 'Créer le composant Dashboard',
        description: 'Implémenter le composant React pour le tableau de bord',
        status: 'done',
        assignee: 'Développeur',
        storyId: 'story-1',
        estimatedHours: 8,
        actualHours: 6,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'task-2',
        title: 'Intégrer les métriques temps réel',
        description: 'Connecter le dashboard aux API temps réel',
        status: 'in-progress',
        assignee: 'Développeur',
        storyId: 'story-1',
        estimatedHours: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]),
    [l, p] = A.useState(!1),
    [f, d] = A.useState(!1),
    [y, S] = A.useState(!1),
    [w, c] = A.useState(null),
    [g, b] = A.useState({}),
    E = (m, h) => m.filter(u => u.status === h),
    _ = () => {
      if (w)
        s(m =>
          m.map(h =>
            h.id === w.id
              ? { ...w, ...g, updatedAt: new Date().toISOString() }
              : h
          )
        );
      else {
        const m = {
          id: `epic-${Date.now()}`,
          title: g.title || '',
          description: g.description || '',
          status: 'planning',
          priority: g.priority || 'medium',
          assignee: g.assignee,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          stories: [],
        };
        s(h => [...h, m]);
      }
      (p(!1), c(null), b({}));
    },
    R = () => {
      if (w)
        o(m =>
          m.map(h =>
            h.id === w.id
              ? { ...w, ...g, updatedAt: new Date().toISOString() }
              : h
          )
        );
      else {
        const m = {
          id: `story-${Date.now()}`,
          title: g.title || '',
          description: g.description || '',
          status: 'todo',
          priority: g.priority || 'medium',
          assignee: g.assignee,
          epicId: g.epicId,
          points: g.points || 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: g.tags || [],
        };
        (o(h => [...h, m]),
          g.epicId &&
            s(h =>
              h.map(u =>
                u.id === g.epicId ? { ...u, stories: [...u.stories, m.id] } : u
              )
            ));
      }
      (d(!1), c(null), b({}));
    },
    P = () => {
      if (w)
        i(m =>
          m.map(h =>
            h.id === w.id
              ? { ...w, ...g, updatedAt: new Date().toISOString() }
              : h
          )
        );
      else {
        const m = {
          id: `task-${Date.now()}`,
          title: g.title || '',
          description: g.description || '',
          status: 'todo',
          assignee: g.assignee,
          storyId: g.storyId,
          estimatedHours: g.estimatedHours || 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        i(h => [...h, m]);
      }
      (S(!1), c(null), b({}));
    },
    M = m => {
      (s(h => h.filter(u => u.id !== m)),
        o(h => h.filter(u => u.epicId !== m)));
    },
    q = m => {
      (o(h => h.filter(u => u.id !== m)),
        i(h => h.filter(u => u.storyId !== m)),
        s(h =>
          h.map(u => ({ ...u, stories: u.stories.filter(T => T !== m) }))
        ));
    },
    H = m => {
      i(h => h.filter(u => u.id !== m));
    };
  return t
    ? r.jsxs(j, {
        sx: { height: '100vh', display: 'flex', flexDirection: 'column' },
        children: [
          r.jsx(re, {
            sx: { p: 2, mb: 2 },
            children: r.jsxs(j, {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              children: [
                r.jsxs(j, {
                  children: [
                    r.jsxs(v, {
                      variant: 'h4',
                      gutterBottom: !0,
                      children: ['📋 Tableau Kanban - ', t.name],
                    }),
                    r.jsx(v, {
                      variant: 'body1',
                      color: 'textSecondary',
                      children: 'Gestion des Epics, Stories et Tâches',
                    }),
                  ],
                }),
                r.jsxs(j, {
                  display: 'flex',
                  gap: 1,
                  children: [
                    r.jsx(L, {
                      variant: 'outlined',
                      startIcon: r.jsx(Pe, {}),
                      onClick: () => {
                        (c(null), b({}), p(!0));
                      },
                      children: 'Nouvel Epic',
                    }),
                    r.jsx(L, {
                      variant: 'outlined',
                      startIcon: r.jsx(Pe, {}),
                      onClick: () => {
                        (c(null), b({}), d(!0));
                      },
                      children: 'Nouvelle Story',
                    }),
                    r.jsx(L, {
                      variant: 'outlined',
                      startIcon: r.jsx(Pe, {}),
                      onClick: () => {
                        (c(null), b({}), S(!0));
                      },
                      children: 'Nouvelle Tâche',
                    }),
                  ],
                }),
              ],
            }),
          }),
          r.jsxs(j, {
            sx: { display: 'flex', flex: 1, gap: 2, overflow: 'auto' },
            children: [
              r.jsxs(j, {
                sx: { minWidth: 300 },
                children: [
                  r.jsx(v, {
                    variant: 'h6',
                    gutterBottom: !0,
                    children: '🚀 Epics',
                  }),
                  ['planning', 'in-progress', 'review', 'completed'].map(m =>
                    r.jsxs(
                      re,
                      {
                        sx: { p: 2, mb: 2, minHeight: 200 },
                        children: [
                          r.jsxs(v, {
                            variant: 'subtitle1',
                            gutterBottom: !0,
                            sx: { display: 'flex', alignItems: 'center' },
                            children: [
                              r.jsx(j, {
                                sx: {
                                  width: 12,
                                  height: 12,
                                  borderRadius: '50%',
                                  bgcolor: Vt[m],
                                  mr: 1,
                                },
                              }),
                              m === 'planning' && 'Planifié',
                              m === 'in-progress' && 'En cours',
                              m === 'review' && 'En révision',
                              m === 'completed' && 'Terminé',
                            ],
                          }),
                          E(e, m).map(h =>
                            r.jsx(
                              pe,
                              {
                                sx: { mb: 1, cursor: 'pointer' },
                                children: r.jsxs(he, {
                                  sx: { p: 2, '&:last-child': { pb: 2 } },
                                  children: [
                                    r.jsxs(j, {
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      justifyContent: 'space-between',
                                      mb: 1,
                                      children: [
                                        r.jsx(v, {
                                          variant: 'subtitle2',
                                          children: h.title,
                                        }),
                                        r.jsxs(j, {
                                          children: [
                                            r.jsx(ee, {
                                              label: h.priority,
                                              size: 'small',
                                              sx: {
                                                bgcolor: dl[h.priority],
                                                color: 'white',
                                                mr: 1,
                                              },
                                            }),
                                            r.jsx(Q, {
                                              size: 'small',
                                              onClick: u => {
                                                (u.stopPropagation(),
                                                  c(h),
                                                  b(h),
                                                  p(!0));
                                              },
                                              children: r.jsx(Qe, {
                                                fontSize: 'small',
                                              }),
                                            }),
                                            r.jsx(Q, {
                                              size: 'small',
                                              onClick: u => {
                                                (u.stopPropagation(), M(h.id));
                                              },
                                              children: r.jsx(Le, {
                                                fontSize: 'small',
                                              }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    r.jsx(v, {
                                      variant: 'body2',
                                      color: 'textSecondary',
                                      children: h.description,
                                    }),
                                    h.assignee &&
                                      r.jsxs(j, {
                                        display: 'flex',
                                        alignItems: 'center',
                                        mt: 1,
                                        children: [
                                          r.jsx(Jt, {
                                            fontSize: 'small',
                                            sx: {
                                              mr: 1,
                                              color: 'text.secondary',
                                            },
                                          }),
                                          r.jsx(v, {
                                            variant: 'caption',
                                            children: h.assignee,
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                              },
                              h.id
                            )
                          ),
                        ],
                      },
                      m
                    )
                  ),
                ],
              }),
              r.jsxs(j, {
                sx: { minWidth: 300 },
                children: [
                  r.jsx(v, {
                    variant: 'h6',
                    gutterBottom: !0,
                    children: '📖 Stories',
                  }),
                  ['todo', 'in-progress', 'review', 'done'].map(m =>
                    r.jsxs(
                      re,
                      {
                        sx: { p: 2, mb: 2, minHeight: 200 },
                        children: [
                          r.jsxs(v, {
                            variant: 'subtitle1',
                            gutterBottom: !0,
                            sx: { display: 'flex', alignItems: 'center' },
                            children: [
                              r.jsx(j, {
                                sx: {
                                  width: 12,
                                  height: 12,
                                  borderRadius: '50%',
                                  bgcolor: Vt[m],
                                  mr: 1,
                                },
                              }),
                              m === 'todo' && 'À faire',
                              m === 'in-progress' && 'En cours',
                              m === 'review' && 'En révision',
                              m === 'done' && 'Terminé',
                            ],
                          }),
                          E(n, m).map(h =>
                            r.jsx(
                              pe,
                              {
                                sx: { mb: 1, cursor: 'pointer' },
                                children: r.jsxs(he, {
                                  sx: { p: 2, '&:last-child': { pb: 2 } },
                                  children: [
                                    r.jsxs(j, {
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      justifyContent: 'space-between',
                                      mb: 1,
                                      children: [
                                        r.jsx(v, {
                                          variant: 'subtitle2',
                                          children: h.title,
                                        }),
                                        r.jsxs(j, {
                                          children: [
                                            r.jsx(ee, {
                                              label: h.points,
                                              size: 'small',
                                              sx: { mr: 1 },
                                            }),
                                            r.jsx(Q, {
                                              size: 'small',
                                              onClick: u => {
                                                (u.stopPropagation(),
                                                  c(h),
                                                  b(h),
                                                  d(!0));
                                              },
                                              children: r.jsx(Qe, {
                                                fontSize: 'small',
                                              }),
                                            }),
                                            r.jsx(Q, {
                                              size: 'small',
                                              onClick: u => {
                                                (u.stopPropagation(), q(h.id));
                                              },
                                              children: r.jsx(Le, {
                                                fontSize: 'small',
                                              }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    r.jsx(v, {
                                      variant: 'body2',
                                      color: 'textSecondary',
                                      children: h.description,
                                    }),
                                    r.jsx(j, {
                                      mt: 1,
                                      children: h.tags.map(u =>
                                        r.jsx(
                                          ee,
                                          {
                                            label: u,
                                            size: 'small',
                                            variant: 'outlined',
                                            sx: { mr: 0.5, mb: 0.5 },
                                          },
                                          u
                                        )
                                      ),
                                    }),
                                  ],
                                }),
                              },
                              h.id
                            )
                          ),
                        ],
                      },
                      m
                    )
                  ),
                ],
              }),
              r.jsxs(j, {
                sx: { minWidth: 300 },
                children: [
                  r.jsx(v, {
                    variant: 'h6',
                    gutterBottom: !0,
                    children: '✅ Tâches',
                  }),
                  ['todo', 'in-progress', 'done'].map(m =>
                    r.jsxs(
                      re,
                      {
                        sx: { p: 2, mb: 2, minHeight: 200 },
                        children: [
                          r.jsxs(v, {
                            variant: 'subtitle1',
                            gutterBottom: !0,
                            sx: { display: 'flex', alignItems: 'center' },
                            children: [
                              r.jsx(j, {
                                sx: {
                                  width: 12,
                                  height: 12,
                                  borderRadius: '50%',
                                  bgcolor: Vt[m],
                                  mr: 1,
                                },
                              }),
                              m === 'todo' && 'À faire',
                              m === 'in-progress' && 'En cours',
                              m === 'done' && 'Terminé',
                            ],
                          }),
                          E(a, m).map(h =>
                            r.jsxs(
                              pe,
                              {
                                sx: { mb: 1, cursor: 'pointer' },
                                children: [
                                  r.jsxs(he, {
                                    sx: { p: 2, '&:last-child': { pb: 2 } },
                                    children: [
                                      r.jsx(v, {
                                        variant: 'subtitle2',
                                        children: h.title,
                                      }),
                                      r.jsx(v, {
                                        variant: 'body2',
                                        color: 'textSecondary',
                                        children: h.description,
                                      }),
                                      h.estimatedHours &&
                                        r.jsxs(j, {
                                          display: 'flex',
                                          alignItems: 'center',
                                          mt: 1,
                                          children: [
                                            r.jsx(Yr, {
                                              fontSize: 'small',
                                              sx: {
                                                mr: 1,
                                                color: 'text.secondary',
                                              },
                                            }),
                                            r.jsxs(v, {
                                              variant: 'caption',
                                              children: [
                                                h.actualHours || 0,
                                                'h / ',
                                                h.estimatedHours,
                                                'h',
                                              ],
                                            }),
                                          ],
                                        }),
                                    ],
                                  }),
                                  r.jsxs(In, {
                                    children: [
                                      r.jsx(Q, {
                                        size: 'small',
                                        onClick: () => {
                                          (c(h), b(h), S(!0));
                                        },
                                        children: r.jsx(Qe, {
                                          fontSize: 'small',
                                        }),
                                      }),
                                      r.jsx(Q, {
                                        size: 'small',
                                        onClick: () => H(h.id),
                                        children: r.jsx(Le, {
                                          fontSize: 'small',
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              h.id
                            )
                          ),
                        ],
                      },
                      m
                    )
                  ),
                ],
              }),
            ],
          }),
          r.jsxs(ve, {
            open: l,
            onClose: () => p(!1),
            maxWidth: 'sm',
            fullWidth: !0,
            children: [
              r.jsx(Se, {
                children: w ? "Modifier l'Epic" : 'Créer un nouvel Epic',
              }),
              r.jsxs(ke, {
                children: [
                  r.jsx(W, {
                    fullWidth: !0,
                    label: 'Titre',
                    value: g.title || '',
                    onChange: m => b(h => ({ ...h, title: m.target.value })),
                    sx: { mb: 2, mt: 1 },
                  }),
                  r.jsx(W, {
                    fullWidth: !0,
                    label: 'Description',
                    multiline: !0,
                    rows: 3,
                    value: g.description || '',
                    onChange: m =>
                      b(h => ({ ...h, description: m.target.value })),
                    sx: { mb: 2 },
                  }),
                  r.jsxs(F, {
                    container: !0,
                    spacing: 2,
                    children: [
                      r.jsx(F, {
                        item: !0,
                        xs: 6,
                        children: r.jsxs(ce, {
                          fullWidth: !0,
                          children: [
                            r.jsx(de, { children: 'Priorité' }),
                            r.jsxs(ue, {
                              value: g.priority || 'medium',
                              onChange: m =>
                                b(h => ({ ...h, priority: m.target.value })),
                              children: [
                                r.jsx(U, { value: 'low', children: 'Faible' }),
                                r.jsx(U, {
                                  value: 'medium',
                                  children: 'Moyen',
                                }),
                                r.jsx(U, { value: 'high', children: 'Élevé' }),
                                r.jsx(U, {
                                  value: 'critical',
                                  children: 'Critique',
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      r.jsx(F, {
                        item: !0,
                        xs: 6,
                        children: r.jsx(W, {
                          fullWidth: !0,
                          label: 'Assigné à',
                          value: g.assignee || '',
                          onChange: m =>
                            b(h => ({ ...h, assignee: m.target.value })),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              r.jsxs(Ce, {
                children: [
                  r.jsx(L, { onClick: () => p(!1), children: 'Annuler' }),
                  r.jsx(L, {
                    onClick: _,
                    variant: 'contained',
                    children: 'Sauvegarder',
                  }),
                ],
              }),
            ],
          }),
          r.jsxs(ve, {
            open: f,
            onClose: () => d(!1),
            maxWidth: 'sm',
            fullWidth: !0,
            children: [
              r.jsx(Se, {
                children: w ? 'Modifier la Story' : 'Créer une nouvelle Story',
              }),
              r.jsxs(ke, {
                children: [
                  r.jsx(W, {
                    fullWidth: !0,
                    label: 'Titre',
                    value: g.title || '',
                    onChange: m => b(h => ({ ...h, title: m.target.value })),
                    sx: { mb: 2, mt: 1 },
                  }),
                  r.jsx(W, {
                    fullWidth: !0,
                    label: 'Description',
                    multiline: !0,
                    rows: 3,
                    value: g.description || '',
                    onChange: m =>
                      b(h => ({ ...h, description: m.target.value })),
                    sx: { mb: 2 },
                  }),
                  r.jsxs(F, {
                    container: !0,
                    spacing: 2,
                    children: [
                      r.jsx(F, {
                        item: !0,
                        xs: 6,
                        children: r.jsxs(ce, {
                          fullWidth: !0,
                          children: [
                            r.jsx(de, { children: 'Epic' }),
                            r.jsxs(ue, {
                              value: g.epicId || '',
                              onChange: m =>
                                b(h => ({ ...h, epicId: m.target.value })),
                              children: [
                                r.jsx(U, { value: '', children: 'Aucun' }),
                                e.map(m =>
                                  r.jsx(
                                    U,
                                    { value: m.id, children: m.title },
                                    m.id
                                  )
                                ),
                              ],
                            }),
                          ],
                        }),
                      }),
                      r.jsx(F, {
                        item: !0,
                        xs: 3,
                        children: r.jsxs(ce, {
                          fullWidth: !0,
                          children: [
                            r.jsx(de, { children: 'Priorité' }),
                            r.jsxs(ue, {
                              value: g.priority || 'medium',
                              onChange: m =>
                                b(h => ({ ...h, priority: m.target.value })),
                              children: [
                                r.jsx(U, { value: 'low', children: 'Faible' }),
                                r.jsx(U, {
                                  value: 'medium',
                                  children: 'Moyen',
                                }),
                                r.jsx(U, { value: 'high', children: 'Élevé' }),
                                r.jsx(U, {
                                  value: 'critical',
                                  children: 'Critique',
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      r.jsx(F, {
                        item: !0,
                        xs: 3,
                        children: r.jsx(W, {
                          fullWidth: !0,
                          label: 'Points',
                          type: 'number',
                          value: g.points || 0,
                          onChange: m =>
                            b(h => ({
                              ...h,
                              points: Number.parseInt(m.target.value) || 0,
                            })),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              r.jsxs(Ce, {
                children: [
                  r.jsx(L, { onClick: () => d(!1), children: 'Annuler' }),
                  r.jsx(L, {
                    onClick: R,
                    variant: 'contained',
                    children: 'Sauvegarder',
                  }),
                ],
              }),
            ],
          }),
          r.jsxs(ve, {
            open: y,
            onClose: () => S(!1),
            maxWidth: 'sm',
            fullWidth: !0,
            children: [
              r.jsx(Se, {
                children: w ? 'Modifier la Tâche' : 'Créer une nouvelle Tâche',
              }),
              r.jsxs(ke, {
                children: [
                  r.jsx(W, {
                    fullWidth: !0,
                    label: 'Titre',
                    value: g.title || '',
                    onChange: m => b(h => ({ ...h, title: m.target.value })),
                    sx: { mb: 2, mt: 1 },
                  }),
                  r.jsx(W, {
                    fullWidth: !0,
                    label: 'Description',
                    multiline: !0,
                    rows: 3,
                    value: g.description || '',
                    onChange: m =>
                      b(h => ({ ...h, description: m.target.value })),
                    sx: { mb: 2 },
                  }),
                  r.jsxs(F, {
                    container: !0,
                    spacing: 2,
                    children: [
                      r.jsx(F, {
                        item: !0,
                        xs: 6,
                        children: r.jsxs(ce, {
                          fullWidth: !0,
                          children: [
                            r.jsx(de, { children: 'Story' }),
                            r.jsxs(ue, {
                              value: g.storyId || '',
                              onChange: m =>
                                b(h => ({ ...h, storyId: m.target.value })),
                              children: [
                                r.jsx(U, { value: '', children: 'Aucune' }),
                                n.map(m =>
                                  r.jsx(
                                    U,
                                    { value: m.id, children: m.title },
                                    m.id
                                  )
                                ),
                              ],
                            }),
                          ],
                        }),
                      }),
                      r.jsx(F, {
                        item: !0,
                        xs: 3,
                        children: r.jsx(W, {
                          fullWidth: !0,
                          label: 'Heures estimées',
                          type: 'number',
                          value: g.estimatedHours || 0,
                          onChange: m =>
                            b(h => ({
                              ...h,
                              estimatedHours:
                                Number.parseInt(m.target.value) || 0,
                            })),
                        }),
                      }),
                      r.jsx(F, {
                        item: !0,
                        xs: 3,
                        children: r.jsx(W, {
                          fullWidth: !0,
                          label: 'Assigné à',
                          value: g.assignee || '',
                          onChange: m =>
                            b(h => ({ ...h, assignee: m.target.value })),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              r.jsxs(Ce, {
                children: [
                  r.jsx(L, { onClick: () => S(!1), children: 'Annuler' }),
                  r.jsx(L, {
                    onClick: P,
                    variant: 'contained',
                    children: 'Sauvegarder',
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    : r.jsx(j, {
        p: 3,
        children: r.jsx(V, {
          severity: 'info',
          children:
            "Sélectionnez d'abord un projet pour voir le tableau Kanban.",
        }),
      });
}
function pl() {
  const { user: t, isAuthenticated: e } = te(h => h.auth),
    [s, n] = A.useState([]),
    [o, a] = A.useState(!0),
    [i, l] = A.useState(!1),
    [p, f] = A.useState(!1),
    [d, y] = A.useState(null),
    [S, w] = A.useState({
      username: '',
      email: '',
      password: '',
      role: 'user',
    }),
    [c, g] = A.useState(''),
    b = (t == null ? void 0 : t.role) === 'admin';
  A.useEffect(() => {
    e && b && E();
  }, [e, b]);
  const E = async () => {
      var h, u;
      try {
        a(!0);
        const T = await O.get('/api/auth/users');
        n(T.data.users);
      } catch (error) {
        g(
          ((u = (h = error.response) == null ? void 0 : h.data) == null
            ? void 0
            : u.error) || 'Erreur lors du chargement des utilisateurs'
        );
      } finally {
        a(!1);
      }
    },
    _ = async () => {
      var h, u;
      try {
        (g(''),
          await O.post('/api/auth/register', {
            username: S.username,
            email: S.email,
            password: S.password,
            role: S.role,
          }),
          l(!1),
          w({ username: '', email: '', password: '', role: 'user' }),
          E());
      } catch (error) {
        g(
          ((u = (h = error.response) == null ? void 0 : h.data) == null
            ? void 0
            : u.error) || "Erreur lors de la création de l'utilisateur"
        );
      }
    },
    R = async () => {
      var h, u;
      if (d)
        try {
          (g(''),
            await O.put(`/api/auth/users/${d.id}`, {
              username: S.username,
              email: S.email,
              role: S.role,
            }),
            f(!1),
            y(null),
            w({ username: '', email: '', password: '', role: 'user' }),
            E());
        } catch (error) {
          g(
            ((u = (h = error.response) == null ? void 0 : h.data) == null
              ? void 0
              : u.error) || "Erreur lors de la modification de l'utilisateur"
          );
        }
    },
    P = async h => {
      var u, T;
      if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?'))
        try {
          (g(''), await O.delete(`/api/auth/users/${h}`), E());
        } catch (error) {
          g(
            ((T = (u = error.response) == null ? void 0 : u.data) == null
              ? void 0
              : T.error) || "Erreur lors de la suppression de l'utilisateur"
          );
        }
    },
    M = h => {
      (y(h),
        w({ username: h.username, email: h.email, password: '', role: h.role }),
        f(!0));
    },
    q = h => {
      switch (h) {
        case 'admin': {
          return r.jsx(mt, { fontSize: 'small' });
        }
        case 'user': {
          return r.jsx(Bt, { fontSize: 'small' });
        }
        case 'viewer': {
          return r.jsx(xt, { fontSize: 'small' });
        }
        default: {
          return r.jsx(Jt, { fontSize: 'small' });
        }
      }
    },
    H = h => {
      switch (h) {
        case 'admin': {
          return 'error';
        }
        case 'user': {
          return 'primary';
        }
        case 'viewer': {
          return 'secondary';
        }
        default: {
          return 'default';
        }
      }
    },
    m = h =>
      new Date(h).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
  return e
    ? b
      ? r.jsxs(j, {
          sx: { height: '100vh', display: 'flex', flexDirection: 'column' },
          children: [
            r.jsx(re, {
              sx: { p: 2, mb: 2 },
              children: r.jsxs(j, {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                children: [
                  r.jsxs(j, {
                    children: [
                      r.jsx(v, {
                        variant: 'h4',
                        gutterBottom: !0,
                        children: '👥 Gestion des utilisateurs',
                      }),
                      r.jsx(v, {
                        variant: 'body1',
                        color: 'textSecondary',
                        children:
                          'Gérez les utilisateurs et leurs permissions BMad Visual Studio',
                      }),
                    ],
                  }),
                  r.jsx(L, {
                    variant: 'contained',
                    startIcon: r.jsx(Pe, {}),
                    onClick: () => l(!0),
                    children: 'Nouvel utilisateur',
                  }),
                ],
              }),
            }),
            c &&
              r.jsx(V, {
                severity: 'error',
                sx: { mb: 2 },
                onClose: () => g(''),
                children: c,
              }),
            r.jsx(re, {
              sx: { flex: 1, overflow: 'hidden' },
              children: r.jsx(Tn, {
                sx: { maxHeight: 'calc(100vh - 200px)' },
                children: r.jsxs(Pn, {
                  stickyHeader: !0,
                  children: [
                    r.jsx(On, {
                      children: r.jsxs(br, {
                        children: [
                          r.jsx(ne, { children: 'Utilisateur' }),
                          r.jsx(ne, { children: 'Email' }),
                          r.jsx(ne, { children: 'Rôle' }),
                          r.jsx(ne, { children: 'Créé le' }),
                          r.jsx(ne, { children: 'Dernière connexion' }),
                          r.jsx(ne, { children: 'Statut' }),
                          r.jsx(ne, { children: 'Actions' }),
                        ],
                      }),
                    }),
                    r.jsx(Dn, {
                      children: s.map(h =>
                        r.jsxs(
                          br,
                          {
                            hover: !0,
                            children: [
                              r.jsx(ne, {
                                children: r.jsxs(j, {
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  children: [
                                    r.jsx(Jt, {}),
                                    r.jsx(v, {
                                      variant: 'body2',
                                      children: h.username,
                                    }),
                                  ],
                                }),
                              }),
                              r.jsx(ne, { children: h.email }),
                              r.jsx(ne, {
                                children: r.jsx(ee, {
                                  icon: q(h.role),
                                  label: h.role,
                                  color: H(h.role),
                                  size: 'small',
                                }),
                              }),
                              r.jsx(ne, { children: m(h.createdAt) }),
                              r.jsx(ne, {
                                children: h.lastLogin
                                  ? m(h.lastLogin)
                                  : 'Jamais',
                              }),
                              r.jsx(ne, {
                                children: r.jsx(ee, {
                                  label: h.isActive ? 'Actif' : 'Inactif',
                                  color: h.isActive ? 'success' : 'default',
                                  size: 'small',
                                }),
                              }),
                              r.jsxs(ne, {
                                children: [
                                  r.jsx(Q, {
                                    size: 'small',
                                    onClick: () => M(h),
                                    color: 'primary',
                                    children: r.jsx(Qe, {}),
                                  }),
                                  r.jsx(Q, {
                                    size: 'small',
                                    onClick: () => P(h.id),
                                    color: 'error',
                                    children: r.jsx(Le, {}),
                                  }),
                                ],
                              }),
                            ],
                          },
                          h.id
                        )
                      ),
                    }),
                  ],
                }),
              }),
            }),
            r.jsxs(ve, {
              open: i,
              onClose: () => l(!1),
              maxWidth: 'sm',
              fullWidth: !0,
              children: [
                r.jsx(Se, { children: 'Créer un nouvel utilisateur' }),
                r.jsxs(ke, {
                  children: [
                    r.jsx(W, {
                      fullWidth: !0,
                      label: "Nom d'utilisateur",
                      value: S.username,
                      onChange: h =>
                        w(u => ({ ...u, username: h.target.value })),
                      sx: { mb: 2, mt: 1 },
                    }),
                    r.jsx(W, {
                      fullWidth: !0,
                      label: 'Email',
                      type: 'email',
                      value: S.email,
                      onChange: h => w(u => ({ ...u, email: h.target.value })),
                      sx: { mb: 2 },
                    }),
                    r.jsx(W, {
                      fullWidth: !0,
                      label: 'Mot de passe',
                      type: 'password',
                      value: S.password,
                      onChange: h =>
                        w(u => ({ ...u, password: h.target.value })),
                      sx: { mb: 2 },
                    }),
                    r.jsxs(ce, {
                      fullWidth: !0,
                      children: [
                        r.jsx(de, { children: 'Rôle' }),
                        r.jsxs(ue, {
                          value: S.role,
                          onChange: h =>
                            w(u => ({ ...u, role: h.target.value })),
                          children: [
                            r.jsxs(U, {
                              value: 'admin',
                              children: [
                                r.jsx(mt, { sx: { mr: 1 } }),
                                'Administrateur',
                              ],
                            }),
                            r.jsxs(U, {
                              value: 'user',
                              children: [
                                r.jsx(Bt, { sx: { mr: 1 } }),
                                'Utilisateur',
                              ],
                            }),
                            r.jsxs(U, {
                              value: 'viewer',
                              children: [
                                r.jsx(xt, { sx: { mr: 1 } }),
                                'Observateur',
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                r.jsxs(Ce, {
                  children: [
                    r.jsx(L, { onClick: () => l(!1), children: 'Annuler' }),
                    r.jsx(L, {
                      onClick: _,
                      variant: 'contained',
                      children: 'Créer',
                    }),
                  ],
                }),
              ],
            }),
            r.jsxs(ve, {
              open: p,
              onClose: () => f(!1),
              maxWidth: 'sm',
              fullWidth: !0,
              children: [
                r.jsx(Se, { children: "Modifier l'utilisateur" }),
                r.jsxs(ke, {
                  children: [
                    r.jsx(W, {
                      fullWidth: !0,
                      label: "Nom d'utilisateur",
                      value: S.username,
                      onChange: h =>
                        w(u => ({ ...u, username: h.target.value })),
                      sx: { mb: 2, mt: 1 },
                    }),
                    r.jsx(W, {
                      fullWidth: !0,
                      label: 'Email',
                      type: 'email',
                      value: S.email,
                      onChange: h => w(u => ({ ...u, email: h.target.value })),
                      sx: { mb: 2 },
                    }),
                    r.jsxs(ce, {
                      fullWidth: !0,
                      children: [
                        r.jsx(de, { children: 'Rôle' }),
                        r.jsxs(ue, {
                          value: S.role,
                          onChange: h =>
                            w(u => ({ ...u, role: h.target.value })),
                          children: [
                            r.jsxs(U, {
                              value: 'admin',
                              children: [
                                r.jsx(mt, { sx: { mr: 1 } }),
                                'Administrateur',
                              ],
                            }),
                            r.jsxs(U, {
                              value: 'user',
                              children: [
                                r.jsx(Bt, { sx: { mr: 1 } }),
                                'Utilisateur',
                              ],
                            }),
                            r.jsxs(U, {
                              value: 'viewer',
                              children: [
                                r.jsx(xt, { sx: { mr: 1 } }),
                                'Observateur',
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                r.jsxs(Ce, {
                  children: [
                    r.jsx(L, { onClick: () => f(!1), children: 'Annuler' }),
                    r.jsx(L, {
                      onClick: R,
                      variant: 'contained',
                      children: 'Modifier',
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      : r.jsx(j, {
          p: 3,
          children: r.jsx(V, {
            severity: 'error',
            children:
              "Accès refusé. Cette page nécessite des privilèges d'administrateur.",
          }),
        })
    : r.jsx(j, {
        p: 3,
        children: r.jsx(V, {
          severity: 'warning',
          children: 'Vous devez être connecté pour accéder à cette page.',
        }),
      });
}
function hl() {
  const [t, e] = A.useState([
      '/home/oga',
      '/home/oga/projects',
      '/home/oga/www',
    ]),
    [s, n] = A.useState(''),
    [o, a] = A.useState('idle'),
    i = () => {
      s.trim() && !t.includes(s.trim()) && (e(d => [...d, s.trim()]), n(''));
    },
    l = d => {
      e(y => y.filter(S => S !== d));
    },
    p = async () => {
      a('saving');
      try {
        (await new Promise(d => setTimeout(d, 1e3)),
          a('saved'),
          setTimeout(() => {
            a('idle');
          }, 2e3));
      } catch {
        (a('error'),
          setTimeout(() => {
            a('idle');
          }, 3e3));
      }
    },
    f = () => {
      switch (o) {
        case 'saving': {
          return 'Sauvegarde en cours...';
        }
        case 'saved': {
          return 'Paramètres sauvegardés avec succès !';
        }
        case 'error': {
          return 'Erreur lors de la sauvegarde';
        }
        default: {
          return '';
        }
      }
    };
  return r.jsxs(j, {
    sx: { height: '100vh', display: 'flex', flexDirection: 'column' },
    children: [
      r.jsxs(re, {
        sx: { p: 2, mb: 2 },
        children: [
          r.jsx(v, {
            variant: 'h4',
            gutterBottom: !0,
            children: '⚙️ Paramètres',
          }),
          r.jsx(v, {
            variant: 'body1',
            color: 'textSecondary',
            children: 'Configurez les paramètres de BMad Visual Studio',
          }),
        ],
      }),
      o !== 'idle' &&
        r.jsx(V, {
          severity:
            o === 'saved' ? 'success' : o === 'error' ? 'error' : 'info',
          sx: { mb: 2 },
          children: f(),
        }),
      r.jsxs(j, {
        sx: { display: 'flex', flex: 1, gap: 2 },
        children: [
          r.jsxs(re, {
            sx: { flex: 1, p: 2 },
            children: [
              r.jsxs(v, {
                variant: 'h6',
                gutterBottom: !0,
                children: [
                  r.jsx(Kr, { sx: { mr: 1, verticalAlign: 'middle' } }),
                  'Dossiers de scan automatique',
                ],
              }),
              r.jsx(v, {
                variant: 'body2',
                color: 'textSecondary',
                paragraph: !0,
                children:
                  'Configurez les dossiers dans lesquels BMad Visual Studio recherchera automatiquement les projets BMad.',
              }),
              r.jsxs(j, {
                sx: { display: 'flex', gap: 1, mb: 2 },
                children: [
                  r.jsx(W, {
                    fullWidth: !0,
                    label: 'Nouveau dossier à scanner',
                    value: s,
                    onChange: d => n(d.target.value),
                    placeholder: '/chemin/vers/dossier',
                    onKeyPress: d => {
                      d.key === 'Enter' && i();
                    },
                  }),
                  r.jsx(L, {
                    variant: 'contained',
                    onClick: i,
                    disabled: !s.trim(),
                    children: r.jsx(Pe, {}),
                  }),
                ],
              }),
              r.jsx(gt, {
                children: t.map((d, y) =>
                  r.jsxs(
                    bt,
                    {
                      children: [
                        r.jsx(yt, {
                          primary: d,
                          secondary: `Dossier ${y + 1}`,
                        }),
                        r.jsx(Nn, {
                          children: r.jsx(Q, {
                            edge: 'end',
                            onClick: () => l(d),
                            color: 'error',
                            children: r.jsx(Le, {}),
                          }),
                        }),
                      ],
                    },
                    y
                  )
                ),
              }),
              t.length === 0 &&
                r.jsx(V, {
                  severity: 'warning',
                  sx: { mt: 2 },
                  children:
                    'Aucun dossier de scan configuré. Ajoutez au moins un dossier pour permettre la détection automatique des projets.',
                }),
            ],
          }),
          r.jsxs(re, {
            sx: { width: 300, p: 2 },
            children: [
              r.jsx(v, {
                variant: 'h6',
                gutterBottom: !0,
                children: 'Actions',
              }),
              r.jsxs(j, {
                sx: { display: 'flex', flexDirection: 'column', gap: 2 },
                children: [
                  r.jsx(L, {
                    variant: 'contained',
                    fullWidth: !0,
                    onClick: p,
                    disabled: o === 'saving',
                    startIcon: r.jsx(Qr, {}),
                    children:
                      o === 'saving'
                        ? 'Sauvegarde...'
                        : 'Sauvegarder les paramètres',
                  }),
                  r.jsx(Me, {}),
                  r.jsx(v, {
                    variant: 'subtitle2',
                    gutterBottom: !0,
                    children: 'Informations système',
                  }),
                  r.jsx(pe, {
                    variant: 'outlined',
                    children: r.jsxs(he, {
                      sx: { p: 2 },
                      children: [
                        r.jsxs(v, {
                          variant: 'body2',
                          gutterBottom: !0,
                          children: [
                            r.jsx('strong', { children: 'Version BMad :' }),
                            ' 6.0.0-alpha.0',
                          ],
                        }),
                        r.jsxs(v, {
                          variant: 'body2',
                          gutterBottom: !0,
                          children: [
                            r.jsx('strong', { children: 'Serveur :' }),
                            ' Fallback Mode',
                          ],
                        }),
                        r.jsxs(v, {
                          variant: 'body2',
                          gutterBottom: !0,
                          children: [
                            r.jsx('strong', { children: 'Base de données :' }),
                            ' SQLite',
                          ],
                        }),
                        r.jsxs(v, {
                          variant: 'body2',
                          children: [
                            r.jsx('strong', { children: 'Dossiers scannés :' }),
                            ' ',
                            t.length,
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function fl() {
  const t = fe(),
    { currentProject: e } = te(f => f.dashboard),
    { agents: s, activeAgents: n, loading: o, error: a } = te(f => f.agents);
  A.useEffect(() => {
    e && t(kt({ projectId: e.id, projectPath: e.path }));
  }, [t, e]);
  const i = f => {
      e && t(Ns({ projectId: e.id, agentId: f }));
    },
    l = f => n.includes(f);
  if (!e)
    return r.jsx(j, {
      p: 3,
      children: r.jsx(V, {
        severity: 'info',
        children:
          "Sélectionnez d'abord un projet pour voir les agents disponibles.",
      }),
    });
  if (o)
    return r.jsx(j, {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      children: r.jsx(et, {}),
    });
  const p = s.reduce(
    (f, d) => (f[d.module] || (f[d.module] = []), f[d.module].push(d), f),
    {}
  );
  return r.jsxs(j, {
    p: 3,
    children: [
      r.jsx(v, { variant: 'h4', gutterBottom: !0, children: 'Agents BMad' }),
      r.jsxs(v, {
        variant: 'body1',
        color: 'textSecondary',
        paragraph: !0,
        children: ['Projet: ', r.jsx('strong', { children: e.name })],
      }),
      a && r.jsx(V, { severity: 'error', sx: { mb: 3 }, children: a }),
      Object.keys(p).length === 0
        ? r.jsx(V, {
            severity: 'info',
            children: 'Aucun agent trouvé pour ce projet.',
          })
        : Object.entries(p).map(([f, d]) =>
            r.jsxs(
              j,
              {
                mb: 4,
                children: [
                  r.jsxs(v, {
                    variant: 'h5',
                    gutterBottom: !0,
                    children: ['Module: ', f.toUpperCase()],
                  }),
                  r.jsx(F, {
                    container: !0,
                    spacing: 3,
                    children: d.map(y => {
                      var S;
                      return r.jsx(
                        F,
                        {
                          item: !0,
                          xs: 12,
                          md: 6,
                          lg: 4,
                          children: r.jsx(pe, {
                            children: r.jsxs(he, {
                              children: [
                                r.jsxs(j, {
                                  display: 'flex',
                                  alignItems: 'center',
                                  mb: 2,
                                  children: [
                                    r.jsx(v, {
                                      variant: 'h6',
                                      component: 'div',
                                      sx: { flexGrow: 1 },
                                      children: y.name,
                                    }),
                                    r.jsx(ee, {
                                      icon: r.jsx(ar, {}),
                                      label: y.title,
                                      size: 'small',
                                      color: 'primary',
                                      variant: 'outlined',
                                    }),
                                  ],
                                }),
                                r.jsx(v, {
                                  variant: 'body2',
                                  color: 'textSecondary',
                                  paragraph: !0,
                                  children:
                                    ((S = y.config.persona) == null
                                      ? void 0
                                      : S.role) || 'Agent spécialisé',
                                }),
                                r.jsx(j, {
                                  mb: 2,
                                  children: r.jsx(nr, {
                                    control: r.jsx(or, {
                                      checked: l(y.id),
                                      onChange: () => i(y.id),
                                      color: 'primary',
                                    }),
                                    label: 'Actif',
                                  }),
                                }),
                                r.jsxs(j, {
                                  display: 'flex',
                                  gap: 1,
                                  children: [
                                    r.jsx(L, {
                                      variant: l(y.id)
                                        ? 'contained'
                                        : 'outlined',
                                      startIcon: r.jsx(Et, {}),
                                      size: 'small',
                                      disabled: !l(y.id),
                                      children: 'Utiliser',
                                    }),
                                    r.jsx(L, {
                                      variant: 'outlined',
                                      startIcon: r.jsx(At, {}),
                                      size: 'small',
                                      children: 'Configurer',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        },
                        y.id
                      );
                    }),
                  }),
                ],
              },
              f
            )
          ),
    ],
  });
}
function xl() {
  const t = fe(),
    { availableIDEs: e } = te(n => n.ideHub),
    s = n => {
      t(Ua(n));
    };
  return r.jsxs(j, {
    p: 3,
    children: [
      r.jsx(v, {
        variant: 'h4',
        gutterBottom: !0,
        children: "Hub d'intégration IDE",
      }),
      r.jsx(v, {
        variant: 'body1',
        color: 'textSecondary',
        paragraph: !0,
        children:
          'Connectez et gérez vos environnements de développement intégrés avec BMad Visual Studio.',
      }),
      r.jsx(F, {
        container: !0,
        spacing: 3,
        children: e.map(n =>
          r.jsx(
            F,
            {
              item: !0,
              xs: 12,
              md: 6,
              children: r.jsx(pe, {
                children: r.jsxs(he, {
                  children: [
                    r.jsxs(j, {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                      children: [
                        r.jsx(v, { variant: 'h6', children: n.name }),
                        r.jsx(ee, {
                          label: n.connected ? 'Connecté' : 'Déconnecté',
                          color: n.connected ? 'success' : 'default',
                        }),
                      ],
                    }),
                    r.jsx(v, {
                      variant: 'body2',
                      color: 'textSecondary',
                      mb: 2,
                      children: n.description,
                    }),
                    r.jsxs(j, {
                      mb: 2,
                      children: [
                        r.jsx(v, {
                          variant: 'body2',
                          gutterBottom: !0,
                          children: 'Capacités:',
                        }),
                        r.jsx(j, {
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1,
                          children: Object.entries(n.capabilities).map(
                            ([o, a]) =>
                              r.jsx(
                                ee,
                                {
                                  label: o,
                                  size: 'small',
                                  color: a ? 'primary' : 'default',
                                  variant: a ? 'filled' : 'outlined',
                                },
                                o
                              )
                          ),
                        }),
                      ],
                    }),
                    r.jsx(nr, {
                      control: r.jsx(or, {
                        checked: n.connected,
                        onChange: () => s(n.type),
                        color: 'primary',
                      }),
                      label: "Activer l'intégration",
                    }),
                    n.connected &&
                      r.jsx(j, {
                        mt: 2,
                        children: r.jsx(L, {
                          variant: 'outlined',
                          startIcon: r.jsx(zn, {}),
                          size: 'small',
                          fullWidth: !0,
                          children: 'Synchroniser le contexte',
                        }),
                      }),
                  ],
                }),
              }),
            },
            n.type
          )
        ),
      }),
      r.jsx(V, {
        severity: 'info',
        sx: { mt: 3 },
        children: r.jsxs(v, {
          variant: 'body2',
          children: [
            r.jsx('strong', { children: 'Note:' }),
            " L'intégration avec les IDEs nécessite une configuration spécifique dans chaque environnement. Consultez la documentation pour chaque IDE supporté.",
          ],
        }),
      }),
    ],
  });
}
function ml() {
  return r.jsx(_n, {
    store: Xa,
    children: r.jsxs(Bn, {
      theme: Ya,
      children: [
        r.jsx(Mn, {}),
        r.jsx(Wn, {
          children: r.jsx(Qi, {
            children: r.jsxs(Un, {
              children: [
                r.jsx(ye, { path: '/', element: r.jsx(rl, {}) }),
                r.jsx(ye, { path: '/projects', element: r.jsx(sl, {}) }),
                r.jsx(ye, { path: '/workflows', element: r.jsx(al, {}) }),
                r.jsx(ye, {
                  path: '/workflows/builder',
                  element: r.jsx(Ke, {
                    requiredRoles: ['admin', 'user'],
                    children: r.jsx(cl, {}),
                  }),
                }),
                r.jsx(ye, {
                  path: '/kanban',
                  element: r.jsx(Ke, {
                    requiredRoles: ['admin', 'user'],
                    children: r.jsx(ul, {}),
                  }),
                }),
                r.jsx(ye, {
                  path: '/users',
                  element: r.jsx(Ke, {
                    requiredRoles: ['admin'],
                    children: r.jsx(pl, {}),
                  }),
                }),
                r.jsx(ye, {
                  path: '/settings',
                  element: r.jsx(Ke, {
                    requiredRoles: ['admin', 'user'],
                    children: r.jsx(hl, {}),
                  }),
                }),
                r.jsx(ye, {
                  path: '/agents',
                  element: r.jsx(Ke, {
                    requiredRoles: ['admin'],
                    children: r.jsx(fl, {}),
                  }),
                }),
                r.jsx(ye, { path: '/ide-hub', element: r.jsx(xl, {}) }),
                r.jsx(ye, {
                  path: '*',
                  element: r.jsx(es, { to: '/', replace: !0 }),
                }),
              ],
            }),
          }),
        }),
      ],
    }),
  });
}
const gl = Vn.createRoot(document.querySelector('#root'));
gl.render(r.jsx(Ne.StrictMode, { children: r.jsx(ml, {}) }));
//# sourceMappingURL=index-CmOnZtkv.js.map
