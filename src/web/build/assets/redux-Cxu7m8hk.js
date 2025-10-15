var Je = Object.defineProperty;
var Ye = (e, t, r) =>
  t in e
    ? Je(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
    : (e[t] = r);
var te = (e, t, r) => Ye(e, typeof t == 'symbol' ? t : t + '', r);
import { r as O } from './mui-B1piuFcP.js';
import { r as Ze } from './vendor-DRGAkOw0.js';
var re = { exports: {} },
  ne = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ve;
function et() {
  if (ve) return ne;
  ve = 1;
  var e = Ze();
  function t(c, a) {
    return (c === a && (c !== 0 || 1 / c === 1 / a)) || (c !== c && a !== a);
  }
  var r = typeof Object.is == 'function' ? Object.is : t,
    n = e.useSyncExternalStore,
    o = e.useRef,
    i = e.useEffect,
    u = e.useMemo,
    s = e.useDebugValue;
  return (
    (ne.useSyncExternalStoreWithSelector = function (c, a, f, l, d) {
      var y = o(null);
      if (y.current === null) {
        var h = { hasValue: !1, value: null };
        y.current = h;
      } else h = y.current;
      y = u(
        function () {
          function m(p) {
            if (!_) {
              if (((_ = !0), (S = p), (p = l(p)), d !== void 0 && h.hasValue)) {
                var g = h.value;
                if (d(g, p)) return (C = g);
              }
              return (C = p);
            }
            if (((g = C), r(S, p))) return g;
            var E = l(p);
            return d !== void 0 && d(g, E) ? ((S = p), g) : ((S = p), (C = E));
          }
          var _ = !1,
            S,
            C,
            b = f === void 0 ? null : f;
          return [
            function () {
              return m(a());
            },
            b === null
              ? void 0
              : function () {
                  return m(b());
                },
          ];
        },
        [a, f, l, d]
      );
      var w = n(c, y[0], y[1]);
      return (
        i(
          function () {
            ((h.hasValue = !0), (h.value = w));
          },
          [w]
        ),
        s(w),
        w
      );
    }),
    ne
  );
}
var ge;
function tt() {
  return (ge || ((ge = 1), (re.exports = et())), re.exports);
}
var rt = tt();
function nt(e) {
  e();
}
function ot() {
  let e = null,
    t = null;
  return {
    clear() {
      ((e = null), (t = null));
    },
    notify() {
      nt(() => {
        let r = e;
        for (; r; ) (r.callback(), (r = r.next));
      });
    },
    get() {
      const r = [];
      let n = e;
      for (; n; ) (r.push(n), (n = n.next));
      return r;
    },
    subscribe(r) {
      let n = !0;
      const o = (t = { callback: r, next: null, prev: t });
      return (
        o.prev ? (o.prev.next = o) : (e = o),
        function () {
          !n ||
            e === null ||
            ((n = !1),
            o.next ? (o.next.prev = o.prev) : (t = o.prev),
            o.prev ? (o.prev.next = o.next) : (e = o.next));
        }
      );
    },
  };
}
var Se = { notify() {}, get: () => [] };
function it(e, t) {
  let r,
    n = Se,
    o = 0,
    i = !1;
  function u(w) {
    f();
    const m = n.subscribe(w);
    let _ = !1;
    return () => {
      _ || ((_ = !0), m(), l());
    };
  }
  function s() {
    n.notify();
  }
  function c() {
    h.onStateChange && h.onStateChange();
  }
  function a() {
    return i;
  }
  function f() {
    (o++, r || ((r = e.subscribe(c)), (n = ot())));
  }
  function l() {
    (o--, r && o === 0 && (r(), (r = void 0), n.clear(), (n = Se)));
  }
  function d() {
    i || ((i = !0), f());
  }
  function y() {
    i && ((i = !1), l());
  }
  const h = {
    addNestedSub: u,
    notifyNestedSubs: s,
    handleChangeWrapper: c,
    isSubscribed: a,
    trySubscribe: d,
    tryUnsubscribe: y,
    getListeners: () => n,
  };
  return h;
}
var ut = () =>
    typeof globalThis.window < 'u' &&
    typeof globalThis.document < 'u' &&
    typeof globalThis.document.createElement < 'u',
  ct = ut(),
  st = () => typeof navigator < 'u' && navigator.product === 'ReactNative',
  ft = st(),
  at = () => (ct || ft ? O.useLayoutEffect : O.useEffect),
  lt = at(),
  oe = Symbol.for('react-redux-context'),
  ie = typeof globalThis < 'u' ? globalThis : {};
function dt() {
  if (!O.createContext) return {};
  const e = ie[oe] ?? (ie[oe] = new Map());
  let t = e.get(O.createContext);
  return (t || ((t = O.createContext(null)), e.set(O.createContext, t)), t);
}
var j = dt();
function yt(e) {
  const { children: t, context: r, serverState: n, store: o } = e,
    i = O.useMemo(() => {
      const c = it(o);
      return {
        store: o,
        subscription: c,
        getServerState: n ? () => n : void 0,
      };
    }, [o, n]),
    u = O.useMemo(() => o.getState(), [o]);
  lt(() => {
    const { subscription: c } = i;
    return (
      (c.onStateChange = c.notifyNestedSubs),
      c.trySubscribe(),
      u !== o.getState() && c.notifyNestedSubs(),
      () => {
        (c.tryUnsubscribe(), (c.onStateChange = void 0));
      }
    );
  }, [i, u]);
  const s = r || j;
  return O.createElement(s.Provider, { value: i }, t);
}
var Sr = yt;
function me(e = j) {
  return function () {
    return O.useContext(e);
  };
}
var Ne = me();
function ze(e = j) {
  const t = e === j ? Ne : me(e),
    r = () => {
      const { store: n } = t();
      return n;
    };
  return (Object.assign(r, { withTypes: () => r }), r);
}
var pt = ze();
function ht(e = j) {
  const t = e === j ? pt : ze(e),
    r = () => t().dispatch;
  return (Object.assign(r, { withTypes: () => r }), r);
}
var Er = ht(),
  mt = (e, t) => e === t;
function bt(e = j) {
  const t = e === j ? Ne : me(e),
    r = (n, o = {}) => {
      const { equalityFn: i = mt } =
          typeof o == 'function' ? { equalityFn: o } : o,
        u = t(),
        { store: s, subscription: c, getServerState: a } = u;
      O.useRef(!0);
      const f = O.useCallback(
          {
            [n.name](d) {
              return n(d);
            },
          }[n.name],
          [n]
        ),
        l = rt.useSyncExternalStoreWithSelector(
          c.addNestedSub,
          s.getState,
          a || s.getState,
          f,
          i
        );
      return (O.useDebugValue(l), l);
    };
  return (Object.assign(r, { withTypes: () => r }), r);
}
var Cr = bt();
function R(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var wt = (typeof Symbol == 'function' && Symbol.observable) || '@@observable',
  Ee = wt,
  ue = () => Math.random().toString(36).slice(7).split('').join('.'),
  _t = {
    INIT: `@@redux/INIT${ue()}`,
    REPLACE: `@@redux/REPLACE${ue()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${ue()}`,
  },
  H = _t;
function be(e) {
  if (typeof e != 'object' || e === null) return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function Ie(e, t, r) {
  if (typeof e != 'function') throw new Error(R(2));
  if (
    (typeof t == 'function' && typeof r == 'function') ||
    (typeof r == 'function' && typeof arguments[3] == 'function')
  )
    throw new Error(R(0));
  if (
    (typeof t == 'function' && typeof r > 'u' && ((r = t), (t = void 0)),
    typeof r < 'u')
  ) {
    if (typeof r != 'function') throw new Error(R(1));
    return r(Ie)(e, t);
  }
  let n = e,
    o = t,
    i = new Map(),
    u = i,
    s = 0,
    c = !1;
  function a() {
    u === i &&
      ((u = new Map()),
      i.forEach((m, _) => {
        u.set(_, m);
      }));
  }
  function f() {
    if (c) throw new Error(R(3));
    return o;
  }
  function l(m) {
    if (typeof m != 'function') throw new Error(R(4));
    if (c) throw new Error(R(5));
    let _ = !0;
    a();
    const S = s++;
    return (
      u.set(S, m),
      function () {
        if (_) {
          if (c) throw new Error(R(6));
          ((_ = !1), a(), u.delete(S), (i = null));
        }
      }
    );
  }
  function d(m) {
    if (!be(m)) throw new Error(R(7));
    if (typeof m.type > 'u') throw new Error(R(8));
    if (typeof m.type != 'string') throw new Error(R(17));
    if (c) throw new Error(R(9));
    try {
      ((c = !0), (o = n(o, m)));
    } finally {
      c = !1;
    }
    return (
      (i = u).forEach(S => {
        S();
      }),
      m
    );
  }
  function y(m) {
    if (typeof m != 'function') throw new Error(R(10));
    ((n = m), d({ type: H.REPLACE }));
  }
  function h() {
    const m = l;
    return {
      subscribe(_) {
        if (typeof _ != 'object' || _ === null) throw new Error(R(11));
        function S() {
          const b = _;
          b.next && b.next(f());
        }
        return (S(), { unsubscribe: m(S) });
      },
      [Ee]() {
        return this;
      },
    };
  }
  return (
    d({ type: H.INIT }),
    { dispatch: d, subscribe: l, getState: f, replaceReducer: y, [Ee]: h }
  );
}
function vt(e) {
  for (const t of Object.keys(e)) {
    const r = e[t];
    if (typeof r(void 0, { type: H.INIT }) > 'u') throw new Error(R(12));
    if (typeof r(void 0, { type: H.PROBE_UNKNOWN_ACTION() }) > 'u')
      throw new Error(R(13));
  }
}
function gt(e) {
  const t = Object.keys(e),
    r = {};
  for (const u of t) {
    typeof e[u] == 'function' && (r[u] = e[u]);
  }
  const n = Object.keys(r);
  let o;
  try {
    vt(r);
  } catch (error) {
    o = error;
  }
  return function (u = {}, s) {
    if (o) throw o;
    let c = !1;
    const a = {};
    for (const l of n) {
      const d = r[l],
        y = u[l],
        h = d(y, s);
      if (typeof h > 'u') throw (s && s.type, new Error(R(14)));
      ((a[l] = h), (c = c || h !== y));
    }
    return ((c = c || n.length !== Object.keys(u).length), c ? a : u);
  };
}
function G(...e) {
  return e.length === 0
    ? t => t
    : e.length === 1
      ? e[0]
      : e.reduce(
          (t, r) =>
            (...n) =>
              t(r(...n))
        );
}
function St(...e) {
  return t => (r, n) => {
    const o = t(r, n);
    let i = () => {
      throw new Error(R(15));
    };
    const u = { getState: o.getState, dispatch: (c, ...a) => i(c, ...a) },
      s = e.map(c => c(u));
    return ((i = G(...s)(o.dispatch)), { ...o, dispatch: i });
  };
}
function Et(e) {
  return be(e) && 'type' in e && typeof e.type == 'string';
}
var Fe = Symbol.for('immer-nothing'),
  Ce = Symbol.for('immer-draftable'),
  P = Symbol.for('immer-state');
function M(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var I = Object.getPrototypeOf;
function N(e) {
  return !!e && !!e[P];
}
function k(e) {
  var t;
  return e
    ? We(e) ||
        Array.isArray(e) ||
        !!e[Ce] ||
        !!((t = e.constructor) != null && t[Ce]) ||
        L(e) ||
        Z(e)
    : !1;
}
var Ct = Object.prototype.constructor.toString();
function We(e) {
  if (!e || typeof e != 'object') return !1;
  const t = I(e);
  if (t === null) return !0;
  const r = Object.hasOwnProperty.call(t, 'constructor') && t.constructor;
  return r === Object
    ? !0
    : typeof r == 'function' && Function.toString.call(r) === Ct;
}
function X(e, t) {
  Y(e) === 0
    ? Reflect.ownKeys(e).forEach(r => {
        t(r, e[r], e);
      })
    : e.forEach((r, n) => t(n, r, e));
}
function Y(e) {
  const t = e[P];
  return t ? t.type_ : Array.isArray(e) ? 1 : L(e) ? 2 : Z(e) ? 3 : 0;
}
function ae(e, t) {
  return Y(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function $e(e, t, r) {
  const n = Y(e);
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : (e[t] = r);
}
function Rt(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function L(e) {
  return e instanceof Map;
}
function Z(e) {
  return e instanceof Set;
}
function D(e) {
  return e.copy_ || e.base_;
}
function le(e, t) {
  if (L(e)) return new Map(e);
  if (Z(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  const r = We(e);
  if (t === !0 || (t === 'class_only' && !r)) {
    const n = Object.getOwnPropertyDescriptors(e);
    delete n[P];
    let o = Reflect.ownKeys(n);
    for (const u of o) {
      const s = n[u];
      (s.writable === !1 && ((s.writable = !0), (s.configurable = !0)),
        (s.get || s.set) &&
          (n[u] = {
            configurable: !0,
            writable: !0,
            enumerable: s.enumerable,
            value: e[u],
          }));
    }
    return Object.create(I(e), n);
  } else {
    const n = I(e);
    if (n !== null && r) return { ...e };
    const o = Object.create(n);
    return Object.assign(o, e);
  }
}
function we(e, t = !1) {
  return (
    ee(e) ||
      N(e) ||
      !k(e) ||
      (Y(e) > 1 &&
        Object.defineProperties(e, {
          set: { value: U },
          add: { value: U },
          clear: { value: U },
          delete: { value: U },
        }),
      Object.freeze(e),
      t && Object.values(e).forEach(r => we(r, !0))),
    e
  );
}
function U() {
  M(2);
}
function ee(e) {
  return Object.isFrozen(e);
}
var Ot = {};
function z(e) {
  const t = Ot[e];
  return (t || M(0, e), t);
}
var $;
function Be() {
  return $;
}
function Pt(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
  };
}
function Re(e, t) {
  t &&
    (z('Patches'),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function de(e) {
  (ye(e), e.drafts_.forEach(xt), (e.drafts_ = null));
}
function ye(e) {
  e === $ && ($ = e.parent_);
}
function Oe(e) {
  return ($ = Pt($, e));
}
function xt(e) {
  const t = e[P];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function Pe(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  return (
    e !== void 0 && e !== r
      ? (r[P].modified_ && (de(t), M(4)),
        k(e) && ((e = Q(t, e)), t.parent_ || J(t, e)),
        t.patches_ &&
          z('Patches').generateReplacementPatches_(
            r[P].base_,
            e,
            t.patches_,
            t.inversePatches_
          ))
      : (e = Q(t, r, [])),
    de(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e === Fe ? void 0 : e
  );
}
function Q(e, t, r) {
  if (ee(t)) return t;
  const n = t[P];
  if (!n) return (X(t, (o, i) => xe(e, n, t, o, i, r)), t);
  if (n.scope_ !== e) return t;
  if (!n.modified_) return (J(e, n.base_, !0), n.base_);
  if (!n.finalized_) {
    ((n.finalized_ = !0), n.scope_.unfinalizedDrafts_--);
    const o = n.copy_;
    let i = o,
      u = !1;
    (n.type_ === 3 && ((i = new Set(o)), o.clear(), (u = !0)),
      X(i, (s, c) => xe(e, n, o, s, c, r, u)),
      J(e, o, !1),
      r &&
        e.patches_ &&
        z('Patches').generatePatches_(n, r, e.patches_, e.inversePatches_));
  }
  return n.copy_;
}
function xe(e, t, r, n, o, i, u) {
  if (N(o)) {
    const s =
        i && t && t.type_ !== 3 && !ae(t.assigned_, n) ? i.concat(n) : void 0,
      c = Q(e, o, s);
    if (($e(r, n, c), N(c))) e.canAutoFreeze_ = !1;
    else return;
  } else u && r.add(o);
  if (k(o) && !ee(o)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
    (Q(e, o),
      (!t || !t.scope_.parent_) &&
        typeof n != 'symbol' &&
        (L(r) ? r.has(n) : Object.prototype.propertyIsEnumerable.call(r, n)) &&
        J(e, o));
  }
}
function J(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && we(t, r);
}
function Mt(e, t) {
  const r = Array.isArray(e),
    n = {
      type_: r ? 1 : 0,
      scope_: t ? t.scope_ : Be(),
      modified_: !1,
      finalized_: !1,
      assigned_: {},
      parent_: t,
      base_: e,
      draft_: null,
      copy_: null,
      revoke_: null,
      isManual_: !1,
    };
  let o = n,
    i = _e;
  r && ((o = [n]), (i = B));
  const { revoke: u, proxy: s } = Proxy.revocable(o, i);
  return ((n.draft_ = s), (n.revoke_ = u), s);
}
var _e = {
    get(e, t) {
      if (t === P) return e;
      const r = D(e);
      if (!ae(r, t)) return Tt(e, r, t);
      const n = r[t];
      return e.finalized_ || !k(n)
        ? n
        : n === ce(e.base_, t)
          ? (se(e), (e.copy_[t] = he(n, e)))
          : n;
    },
    has(e, t) {
      return t in D(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(D(e));
    },
    set(e, t, r) {
      const n = Le(D(e), t);
      if (n != null && n.set) return (n.set.call(e.draft_, r), !0);
      if (!e.modified_) {
        const o = ce(D(e), t),
          i = o == null ? void 0 : o[P];
        if (i && i.base_ === r)
          return ((e.copy_[t] = r), (e.assigned_[t] = !1), !0);
        if (Rt(r, o) && (r !== void 0 || ae(e.base_, t))) return !0;
        (se(e), pe(e));
      }
      return (
        (e.copy_[t] === r && (r !== void 0 || t in e.copy_)) ||
          (Number.isNaN(r) && Number.isNaN(e.copy_[t])) ||
          ((e.copy_[t] = r), (e.assigned_[t] = !0)),
        !0
      );
    },
    deleteProperty(e, t) {
      return (
        ce(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), se(e), pe(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    getOwnPropertyDescriptor(e, t) {
      const r = D(e),
        n = Reflect.getOwnPropertyDescriptor(r, t);
      return (
        n && {
          writable: !0,
          configurable: e.type_ !== 1 || t !== 'length',
          enumerable: n.enumerable,
          value: r[t],
        }
      );
    },
    defineProperty() {
      M(11);
    },
    getPrototypeOf(e) {
      return I(e.base_);
    },
    setPrototypeOf() {
      M(12);
    },
  },
  B = {};
X(_e, (e, t) => {
  B[e] = function () {
    return (
      (arguments[0] = arguments[0][0]),
      Reflect.apply(t, this, arguments)
    );
  };
});
B.deleteProperty = function (e, t) {
  return B.set.call(this, e, t, void 0);
};
B.set = function (e, t, r) {
  return _e.set.call(this, e[0], t, r, e[0]);
};
function ce(e, t) {
  const r = e[P];
  return (r ? D(r) : e)[t];
}
function Tt(e, t, r) {
  var o;
  const n = Le(t, r);
  return n
    ? 'value' in n
      ? n.value
      : (o = n.get) == null
        ? void 0
        : o.call(e.draft_)
    : void 0;
}
function Le(e, t) {
  if (!(t in e)) return;
  let r = I(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n) return n;
    r = I(r);
  }
}
function pe(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && pe(e.parent_));
}
function se(e) {
  e.copy_ || (e.copy_ = le(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var kt = class {
  constructor(e) {
    ((this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (t, r, n) => {
        if (typeof t == 'function' && typeof r != 'function') {
          const i = r;
          r = t;
          const u = this;
          return function (c = i, ...a) {
            return u.produce(c, f => r.call(this, f, ...a));
          };
        }
        (typeof r != 'function' && M(6),
          n !== void 0 && typeof n != 'function' && M(7));
        let o;
        if (k(t)) {
          const i = Oe(this),
            u = he(t, void 0);
          let s = !0;
          try {
            ((o = r(u)), (s = !1));
          } finally {
            s ? de(i) : ye(i);
          }
          return (Re(i, n), Pe(o, i));
        } else if (!t || typeof t != 'object') {
          if (
            ((o = r(t)),
            o === void 0 && (o = t),
            o === Fe && (o = void 0),
            this.autoFreeze_ && we(o, !0),
            n)
          ) {
            const i = [],
              u = [];
            (z('Patches').generateReplacementPatches_(t, o, i, u), n(i, u));
          }
          return o;
        } else M(1, t);
      }),
      (this.produceWithPatches = (t, r) => {
        if (typeof t == 'function')
          return (u, ...s) => this.produceWithPatches(u, c => t(c, ...s));
        let n, o;
        return [
          this.produce(t, r, (u, s) => {
            ((n = u), (o = s));
          }),
          n,
          o,
        ];
      }),
      typeof (e == null ? void 0 : e.autoFreeze) == 'boolean' &&
        this.setAutoFreeze(e.autoFreeze),
      typeof (e == null ? void 0 : e.useStrictShallowCopy) == 'boolean' &&
        this.setUseStrictShallowCopy(e.useStrictShallowCopy));
  }
  createDraft(e) {
    (k(e) || M(8), N(e) && (e = At(e)));
    const t = Oe(this),
      r = he(e, void 0);
    return ((r[P].isManual_ = !0), ye(t), r);
  }
  finishDraft(e, t) {
    const r = e && e[P];
    (!r || !r.isManual_) && M(9);
    const { scope_: n } = r;
    return (Re(n, t), Pe(void 0, n));
  }
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  applyPatches(e, t) {
    let r;
    for (r = t.length - 1; r >= 0; r--) {
      const o = t[r];
      if (o.path.length === 0 && o.op === 'replace') {
        e = o.value;
        break;
      }
    }
    r > -1 && (t = t.slice(r + 1));
    const n = z('Patches').applyPatches_;
    return N(e) ? n(e, t) : this.produce(e, o => n(o, t));
  }
};
function he(e, t) {
  const r = L(e)
    ? z('MapSet').proxyMap_(e, t)
    : Z(e)
      ? z('MapSet').proxySet_(e, t)
      : Mt(e, t);
  return ((t ? t.scope_ : Be()).drafts_.push(r), r);
}
function At(e) {
  return (N(e) || M(10, e), Ue(e));
}
function Ue(e) {
  if (!k(e) || ee(e)) return e;
  const t = e[P];
  let r;
  if (t) {
    if (!t.modified_) return t.base_;
    ((t.finalized_ = !0), (r = le(e, t.scope_.immer_.useStrictShallowCopy_)));
  } else r = le(e, !0);
  return (
    X(r, (n, o) => {
      $e(r, n, Ue(o));
    }),
    t && (t.finalized_ = !1),
    r
  );
}
var jt = new kt(),
  qe = jt.produce;
function Dt(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != 'function') throw new TypeError(t);
}
function Nt(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != 'object') throw new TypeError(t);
}
function zt(
  e,
  t = 'expected all items to be functions, instead received the following types: '
) {
  if (!e.every(r => typeof r == 'function')) {
    const r = e
      .map(n =>
        typeof n == 'function' ? `function ${n.name || 'unnamed'}()` : typeof n
      )
      .join(', ');
    throw new TypeError(`${t}[${r}]`);
  }
}
var Me = e => (Array.isArray(e) ? e : [e]);
function It(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return (
    zt(
      t,
      'createSelector expects all input-selectors to be functions, but received the following types: '
    ),
    t
  );
}
function Ft(e, t) {
  const r = [],
    { length: n } = e;
  for (let o = 0; o < n; o++) r.push(e[o].apply(null, t));
  return r;
}
var Wt = class {
    constructor(e) {
      this.value = e;
    }
    deref() {
      return this.value;
    }
  },
  $t = typeof WeakRef < 'u' ? WeakRef : Wt,
  Bt = 0,
  Te = 1;
function q() {
  return { s: Bt, v: void 0, o: null, p: null };
}
function Ke(e, t = {}) {
  let r = q();
  const { resultEqualityCheck: n } = t;
  let o,
    i = 0;
  function u() {
    var l;
    let s = r;
    const { length: c } = arguments;
    for (let d = 0, y = c; d < y; d++) {
      const h = arguments[d];
      if (typeof h == 'function' || (typeof h == 'object' && h !== null)) {
        let w = s.o;
        w === null && (s.o = w = new WeakMap());
        const m = w.get(h);
        m === void 0 ? ((s = q()), w.set(h, s)) : (s = m);
      } else {
        let w = s.p;
        w === null && (s.p = w = new Map());
        const m = w.get(h);
        m === void 0 ? ((s = q()), w.set(h, s)) : (s = m);
      }
    }
    const a = s;
    let f;
    if (s.s === Te) f = s.v;
    else if (((f = Reflect.apply(e, null, arguments)), i++, n)) {
      const d =
        ((l = o == null ? void 0 : o.deref) == null ? void 0 : l.call(o)) ?? o;
      (d != null && n(d, f) && ((f = d), i !== 0 && i--),
        (o =
          (typeof f == 'object' && f !== null) || typeof f == 'function'
            ? new $t(f)
            : f));
    }
    return ((a.s = Te), (a.v = f), f);
  }
  return (
    (u.clearCache = () => {
      ((r = q()), u.resetResultsCount());
    }),
    (u.resultsCount = () => i),
    (u.resetResultsCount = () => {
      i = 0;
    }),
    u
  );
}
function Lt(e, ...t) {
  const r = typeof e == 'function' ? { memoize: e, memoizeOptions: t } : e,
    n = (...o) => {
      let i = 0,
        u = 0,
        s,
        c = {},
        a = o.pop();
      (typeof a == 'object' && ((c = a), (a = o.pop())),
        Dt(
          a,
          `createSelector expects an output function after the inputs, but received: [${typeof a}]`
        ));
      const f = { ...r, ...c },
        {
          memoize: l,
          memoizeOptions: d = [],
          argsMemoize: y = Ke,
          argsMemoizeOptions: h = [],
        } = f,
        w = Me(d),
        m = Me(h),
        _ = It(o),
        S = l(
          function () {
            return (i++, Reflect.apply(a, null, arguments));
          },
          ...w
        ),
        C = y(
          function () {
            u++;
            const p = Ft(_, arguments);
            return ((s = S.apply(null, p)), s);
          },
          ...m
        );
      return Object.assign(C, {
        resultFunc: a,
        memoizedResultFunc: S,
        dependencies: _,
        dependencyRecomputations: () => u,
        resetDependencyRecomputations: () => {
          u = 0;
        },
        lastResult: () => s,
        recomputations: () => i,
        resetRecomputations: () => {
          i = 0;
        },
        memoize: l,
        argsMemoize: y,
      });
    };
  return (Object.assign(n, { withTypes: () => n }), n);
}
var Ut = Lt(Ke),
  qt = Object.assign(
    (e, t = Ut) => {
      Nt(
        e,
        `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
      );
      const r = Object.keys(e),
        n = r.map(i => e[i]);
      return t(n, (...i) => i.reduce((u, s, c) => ((u[r[c]] = s), u), {}));
    },
    { withTypes: () => qt }
  );
function Ve(e) {
  return ({ dispatch: r, getState: n }) =>
    o =>
    i =>
      typeof i == 'function' ? i(r, n, e) : o(i);
}
var Kt = Ve(),
  Vt = Ve,
  Ht =
    typeof globalThis.window < 'u' &&
    globalThis.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? globalThis.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length > 0)
            return typeof arguments[0] == 'object'
              ? G
              : Reflect.apply(G, null, arguments);
        },
  Gt = e => e && typeof e.match == 'function';
function W(e, t) {
  function r(...n) {
    if (t) {
      let o = t(...n);
      if (!o) throw new Error(T(0));
      return {
        type: e,
        payload: o.payload,
        ...('meta' in o && { meta: o.meta }),
        ...('error' in o && { error: o.error }),
      };
    }
    return { type: e, payload: n[0] };
  }
  return (
    (r.toString = () => `${e}`),
    (r.type = e),
    (r.match = n => Et(n) && n.type === e),
    r
  );
}
var He = class F extends Array {
  constructor(...t) {
    (super(...t), Object.setPrototypeOf(this, F.prototype));
  }
  static get [Symbol.species]() {
    return F;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0])
      ? new F(...t[0].concat(this))
      : new F(...t.concat(this));
  }
};
function ke(e) {
  return k(e) ? qe(e, () => {}) : e;
}
function K(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
function Xt(e) {
  return typeof e == 'boolean';
}
var Qt = () =>
    function (t) {
      const {
        thunk: r = !0,
        immutableCheck: n = !0,
        serializableCheck: o = !0,
        actionCreatorCheck: i = !0,
      } = t ?? {};
      let u = new He();
      return (r && (Xt(r) ? u.push(Kt) : u.push(Vt(r.extraArgument))), u);
    },
  Jt = 'RTK_autoBatch',
  Ae = e => t => {
    setTimeout(t, e);
  },
  Yt =
    (e = { type: 'raf' }) =>
    t =>
    (...r) => {
      const n = t(...r);
      let o = !0,
        i = !1,
        u = !1;
      const s = new Set(),
        c =
          e.type === 'tick'
            ? queueMicrotask
            : e.type === 'raf'
              ? typeof globalThis.window < 'u' &&
                globalThis.requestAnimationFrame
                ? globalThis.requestAnimationFrame
                : Ae(10)
              : e.type === 'callback'
                ? e.queueNotification
                : Ae(e.timeout),
        a = () => {
          ((u = !1), i && ((i = !1), s.forEach(f => f())));
        };
      return Object.assign({}, n, {
        subscribe(f) {
          const l = () => o && f(),
            d = n.subscribe(l);
          return (
            s.add(f),
            () => {
              (d(), s.delete(f));
            }
          );
        },
        dispatch(f) {
          var l;
          try {
            return (
              (o = !((l = f == null ? void 0 : f.meta) != null && l[Jt])),
              (i = !o),
              i && (u || ((u = !0), c(a))),
              n.dispatch(f)
            );
          } finally {
            o = !0;
          }
        },
      });
    },
  Zt = e =>
    function (r) {
      const { autoBatch: n = !0 } = r ?? {};
      let o = new He(e);
      return (n && o.push(Yt(typeof n == 'object' ? n : void 0)), o);
    };
function Rr(e) {
  const t = Qt(),
    {
      reducer: r = void 0,
      middleware: n,
      devTools: o = !0,
      preloadedState: i = void 0,
      enhancers: u = void 0,
    } = e || {};
  let s;
  if (typeof r == 'function') s = r;
  else if (be(r)) s = gt(r);
  else throw new Error(T(1));
  let c;
  typeof n == 'function' ? (c = n(t)) : (c = t());
  let a = G;
  o && (a = Ht({ trace: !1, ...(typeof o == 'object' && o) }));
  const f = St(...c),
    l = Zt(f);
  let d = typeof u == 'function' ? u(l) : l();
  const y = a(...d);
  return Ie(s, i, y);
}
function Ge(e) {
  const t = {},
    r = [];
  let n;
  const o = {
    addCase(i, u) {
      const s = typeof i == 'string' ? i : i.type;
      if (!s) throw new Error(T(28));
      if (s in t) throw new Error(T(29));
      return ((t[s] = u), o);
    },
    addAsyncThunk(i, u) {
      return (
        u.pending && (t[i.pending.type] = u.pending),
        u.rejected && (t[i.rejected.type] = u.rejected),
        u.fulfilled && (t[i.fulfilled.type] = u.fulfilled),
        u.settled && r.push({ matcher: i.settled, reducer: u.settled }),
        o
      );
    },
    addMatcher(i, u) {
      return (r.push({ matcher: i, reducer: u }), o);
    },
    addDefaultCase(i) {
      return ((n = i), o);
    },
  };
  return (e(o), [t, r, n]);
}
function er(e) {
  return typeof e == 'function';
}
function tr(e, t) {
  let [r, n, o] = Ge(t),
    i;
  if (er(e)) i = () => ke(e());
  else {
    const s = ke(e);
    i = () => s;
  }
  function u(s = i(), c) {
    let a = [
      r[c.type],
      ...n.filter(({ matcher: f }) => f(c)).map(({ reducer: f }) => f),
    ];
    return (
      a.filter(f => !!f).length === 0 && (a = [o]),
      a.reduce((f, l) => {
        if (l)
          if (N(f)) {
            const y = l(f, c);
            return y === void 0 ? f : y;
          } else {
            if (k(f)) return qe(f, d => l(d, c));
            {
              const d = l(f, c);
              if (d === void 0) {
                if (f === null) return f;
                throw new Error(
                  'A case reducer on a non-draftable value must not return undefined'
                );
              }
              return d;
            }
          }
        return f;
      }, s)
    );
  }
  return ((u.getInitialState = i), u);
}
var rr = (e, t) => (Gt(e) ? e.match(t) : e(t));
function nr(...e) {
  return t => e.some(r => rr(r, t));
}
var or = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW',
  ir = (e = 21) => {
    let t = '',
      r = e;
    for (; r--; ) t += or[(Math.random() * 64) | 0];
    return t;
  },
  ur = ['name', 'message', 'stack', 'code'],
  fe = class {
    constructor(e, t) {
      te(this, '_type');
      ((this.payload = e), (this.meta = t));
    }
  },
  je = class {
    constructor(e, t) {
      te(this, '_type');
      ((this.payload = e), (this.meta = t));
    }
  },
  cr = e => {
    if (typeof e == 'object' && e !== null) {
      const t = {};
      for (const r of ur) typeof e[r] == 'string' && (t[r] = e[r]);
      return t;
    }
    return { message: String(e) };
  },
  De = 'External signal was aborted',
  Or = (() => {
    function e(t, r, n) {
      const o = W(t + '/fulfilled', (c, a, f, l) => ({
          payload: c,
          meta: { ...l, arg: f, requestId: a, requestStatus: 'fulfilled' },
        })),
        i = W(t + '/pending', (c, a, f) => ({
          payload: void 0,
          meta: { ...f, arg: a, requestId: c, requestStatus: 'pending' },
        })),
        u = W(t + '/rejected', (c, a, f, l, d) => ({
          payload: l,
          error: ((n && n.serializeError) || cr)(c || 'Rejected'),
          meta: {
            ...d,
            arg: f,
            requestId: a,
            rejectedWithValue: !!l,
            requestStatus: 'rejected',
            aborted: (c == null ? void 0 : c.name) === 'AbortError',
            condition: (c == null ? void 0 : c.name) === 'ConditionError',
          },
        }));
      function s(c, { signal: a } = {}) {
        return (f, l, d) => {
          const y = n != null && n.idGenerator ? n.idGenerator(c) : ir(),
            h = new AbortController();
          let w, m;
          function _(C) {
            ((m = C), h.abort());
          }
          a &&
            (a.aborted
              ? _(De)
              : a.addEventListener('abort', () => _(De), { once: !0 }));
          const S = (async function () {
            var p, g;
            let C;
            try {
              let E =
                (p = n == null ? void 0 : n.condition) == null
                  ? void 0
                  : p.call(n, c, { getState: l, extra: d });
              if ((fr(E) && (E = await E), E === !1 || h.signal.aborted))
                throw {
                  name: 'ConditionError',
                  message: 'Aborted due to condition callback returning false.',
                };
              const x = new Promise((v, A) => {
                ((w = () => {
                  A({ name: 'AbortError', message: m || 'Aborted' });
                }),
                  h.signal.addEventListener('abort', w));
              });
              (f(
                i(
                  y,
                  c,
                  (g = n == null ? void 0 : n.getPendingMeta) == null
                    ? void 0
                    : g.call(
                        n,
                        { requestId: y, arg: c },
                        { getState: l, extra: d }
                      )
                )
              ),
                (C = await Promise.race([
                  x,
                  Promise.resolve(
                    r(c, {
                      dispatch: f,
                      getState: l,
                      extra: d,
                      requestId: y,
                      signal: h.signal,
                      abort: _,
                      rejectWithValue: (v, A) => new fe(v, A),
                      fulfillWithValue: (v, A) => new je(v, A),
                    })
                  ).then(v => {
                    if (v instanceof fe) throw v;
                    return v instanceof je
                      ? o(v.payload, y, c, v.meta)
                      : o(v, y, c);
                  }),
                ])));
            } catch (error) {
              C =
                error instanceof fe
                  ? u(null, y, c, error.payload, error.meta)
                  : u(error, y, c);
            } finally {
              w && h.signal.removeEventListener('abort', w);
            }
            return (
              (n &&
                !n.dispatchConditionRejection &&
                u.match(C) &&
                C.meta.condition) ||
                f(C),
              C
            );
          })();
          return Object.assign(S, {
            abort: _,
            requestId: y,
            arg: c,
            unwrap() {
              return S.then(sr);
            },
          });
        };
      }
      return Object.assign(s, {
        pending: i,
        rejected: u,
        fulfilled: o,
        settled: nr(u, o),
        typePrefix: t,
      });
    }
    return ((e.withTypes = () => e), e);
  })();
function sr(e) {
  if (e.meta && e.meta.rejectedWithValue) throw e.payload;
  if (e.error) throw e.error;
  return e.payload;
}
function fr(e) {
  return e !== null && typeof e == 'object' && typeof e.then == 'function';
}
var ar = Symbol.for('rtk-slice-createasyncthunk');
function lr(e, t) {
  return `${e}/${t}`;
}
function dr({ creators: e } = {}) {
  var r;
  const t = (r = e == null ? void 0 : e.asyncThunk) == null ? void 0 : r[ar];
  return function (o) {
    const { name: i, reducerPath: u = i } = o;
    if (!i) throw new Error(T(11));
    const s =
        (typeof o.reducers == 'function' ? o.reducers(pr()) : o.reducers) || {},
      c = Object.keys(s),
      a = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      f = {
        addCase(b, p) {
          const g = typeof b == 'string' ? b : b.type;
          if (!g) throw new Error(T(12));
          if (g in a.sliceCaseReducersByType) throw new Error(T(13));
          return ((a.sliceCaseReducersByType[g] = p), f);
        },
        addMatcher(b, p) {
          return (a.sliceMatchers.push({ matcher: b, reducer: p }), f);
        },
        exposeAction(b, p) {
          return ((a.actionCreators[b] = p), f);
        },
        exposeCaseReducer(b, p) {
          return ((a.sliceCaseReducersByName[b] = p), f);
        },
      };
    for (const b of c) {
      const p = s[b],
        g = {
          reducerName: b,
          type: lr(i, b),
          createNotation: typeof o.reducers == 'function',
        };
      mr(p) ? wr(g, p, f, t) : hr(g, p, f);
    }
    function l() {
      const [b = {}, p = [], g = void 0] =
          typeof o.extraReducers == 'function'
            ? Ge(o.extraReducers)
            : [o.extraReducers],
        E = { ...b, ...a.sliceCaseReducersByType };
      return tr(o.initialState, x => {
        for (let v in E) x.addCase(v, E[v]);
        for (let v of a.sliceMatchers) x.addMatcher(v.matcher, v.reducer);
        for (let v of p) x.addMatcher(v.matcher, v.reducer);
        g && x.addDefaultCase(g);
      });
    }
    const d = b => b,
      y = new Map(),
      h = new WeakMap();
    let w;
    function m(b, p) {
      return (w || (w = l()), w(b, p));
    }
    function _() {
      return (w || (w = l()), w.getInitialState());
    }
    function S(b, p = !1) {
      function g(x) {
        let v = x[b];
        return (typeof v > 'u' && p && (v = K(h, g, _)), v);
      }
      function E(x = d) {
        const v = K(y, p, () => new WeakMap());
        return K(v, x, () => {
          const A = {};
          for (const [Xe, Qe] of Object.entries(o.selectors ?? {}))
            A[Xe] = yr(Qe, x, () => K(h, x, _), p);
          return A;
        });
      }
      return {
        reducerPath: b,
        getSelectors: E,
        get selectors() {
          return E(g);
        },
        selectSlice: g,
      };
    }
    const C = {
      name: i,
      reducer: m,
      actions: a.actionCreators,
      caseReducers: a.sliceCaseReducersByName,
      getInitialState: _,
      ...S(u),
      injectInto(b, { reducerPath: p, ...g } = {}) {
        const E = p ?? u;
        return (
          b.inject({ reducerPath: E, reducer: m }, g),
          { ...C, ...S(E, !0) }
        );
      },
    };
    return C;
  };
}
function yr(e, t, r, n) {
  function o(i, ...u) {
    let s = t(i);
    return (typeof s > 'u' && n && (s = r()), e(s, ...u));
  }
  return ((o.unwrapped = e), o);
}
var Pr = dr();
function pr() {
  function e(t, r) {
    return { _reducerDefinitionType: 'asyncThunk', payloadCreator: t, ...r };
  }
  return (
    (e.withTypes = () => e),
    {
      reducer(t) {
        return Object.assign(
          {
            [t.name](...r) {
              return t(...r);
            },
          }[t.name],
          { _reducerDefinitionType: 'reducer' }
        );
      },
      preparedReducer(t, r) {
        return {
          _reducerDefinitionType: 'reducerWithPrepare',
          prepare: t,
          reducer: r,
        };
      },
      asyncThunk: e,
    }
  );
}
function hr({ type: e, reducerName: t, createNotation: r }, n, o) {
  let i, u;
  if ('reducer' in n) {
    if (r && !br(n)) throw new Error(T(17));
    ((i = n.reducer), (u = n.prepare));
  } else i = n;
  o.addCase(e, i)
    .exposeCaseReducer(t, i)
    .exposeAction(t, u ? W(e, u) : W(e));
}
function mr(e) {
  return e._reducerDefinitionType === 'asyncThunk';
}
function br(e) {
  return e._reducerDefinitionType === 'reducerWithPrepare';
}
function wr({ type: e, reducerName: t }, r, n, o) {
  if (!o) throw new Error(T(18));
  const {
      payloadCreator: i,
      fulfilled: u,
      pending: s,
      rejected: c,
      settled: a,
      options: f,
    } = r,
    l = o(e, i, f);
  (n.exposeAction(t, l),
    u && n.addCase(l.fulfilled, u),
    s && n.addCase(l.pending, s),
    c && n.addCase(l.rejected, c),
    a && n.addMatcher(l.settled, a),
    n.exposeCaseReducer(t, {
      fulfilled: u || V,
      pending: s || V,
      rejected: c || V,
      settled: a || V,
    }));
}
function V() {}
function T(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
export { Sr as P, Pr as a, Rr as b, Or as c, Cr as d, Er as u };
//# sourceMappingURL=redux-Cxu7m8hk.js.map
