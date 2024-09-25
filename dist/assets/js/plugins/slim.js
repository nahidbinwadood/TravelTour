let alreadyExists = !1;
try {
  const { Slim: e } = window;
  e &&
    e.plugins &&
    e.asap &&
    ((console.error || console.warn || console.log)(
      "Warning: slim.js already initialized on window",
    ),
    (alreadyExists = !0));
} catch (e) {}
Symbol.Slim = Symbol("@SlimInternals");
export const _$ = Symbol.Slim;
export const isReadOnly = (e, t) => {
  const i = Object.getOwnPropertyDescriptor(e, t);
  return !i || i.writable;
};
const __flags = {
  isIE11: !!window.MSInputMethodContext && !!document.documentMode,
  isChrome: void 0,
  isEdge: void 0,
  isSafari: void 0,
  isFirefox: void 0,
};
try {
  (__flags.isChrome = /Chrome/.test(navigator.userAgent)),
    (__flags.isEdge = /Edge/.test(navigator.userAgent)),
    (__flags.isSafari = /Safari/.test(navigator.userAgent)),
    (__flags.isFirefox = /Firefox/.test(navigator.userAgent)),
    (__flags.isIE11 || __flags.isEdge) &&
      ((__flags.isChrome = !1),
      Object.defineProperty(Node.prototype, "children", function () {
        return this.childNodes;
      }));
} catch (e) {}
class Internals {
  constructor() {
    (this.boundParent = null),
      (this.repeater = {}),
      (this.bindings = {}),
      (this.inbounds = {}),
      (this.eventHandlers = {}),
      (this.rootElement = null),
      (this.createdCallbackInvoked = !1),
      (this.sourceText = null),
      (this.excluded = !1),
      (this.autoBoundAttributes = []);
  }
}
export class Slim extends HTMLElement {
  static get dashToCamel() {
    return (e) =>
      e.indexOf("-") < 0 ? e : e.replace(/-[a-z]/g, (e) => e[1].toUpperCase());
  }
  static get camelToDash() {
    return (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
  static get rxProp() {
    return /(.+[^(\((.+)\))])/;
  }
  static get rxMethod() {
    return /(.+)(\((.+)\)){1}/;
  }
  static lookup(e, t, i) {
    const n = t.split(".");
    let o;
    o = i && i[_$].repeater[n[0]] ? i[_$].repeater : e;
    let s = 0;
    for (; o && s < n.length; ) o = o[n[s++]];
    return o;
  }
  static _$(e) {
    return (e[_$] = e[_$] || new Internals()), e[_$];
  }
  static tag(e, t, i) {
    void 0 === i
      ? (i = t)
      : Object.defineProperty(i.prototype, "template", { value: t }),
      this.classToTagDict.set(i, e),
      customElements.define(e, i);
  }
  static tagOf(e) {
    return this.classToTagDict.get(e);
  }
  static plugin(e, t) {
    const i = this.plugins[e];
    if (!i)
      throw new Error(`Cannot attach plugin: ${e} is not a supported phase`);
    return i.add(t), () => i.delete(t);
  }
  static checkCreationBlocking(e) {
    if (e.attributes)
      for (let t = 0, i = e.attributes.length; t < i; t++) {
        const i = e.attributes[t];
        for (let [e, t] of Slim[_$].customDirectives)
          if (t.isBlocking && e(i)) return !0;
      }
    return !1;
  }
  static customDirective(e, t, i) {
    if (this[_$].customDirectives.has(e))
      throw new Error(
        `Cannot register custom directive: ${e} already registered`,
      );
    (t.isBlocking = i), this[_$].customDirectives.set(e, t);
  }
  static executePlugins(e, t) {
    this.plugins[e].forEach((e) => {
      e(t);
    });
  }
  static qSelectAll(e, t) {
    return [...e.querySelectorAll(t)];
  }
  static unbind(e, t) {
    const i = e[_$].bindings;
    Object.keys(i).forEach((e) => {
      const n = i[e].chain;
      n.has(t) && n.delete(t);
    });
  }
  static root(e) {
    return (e.__isSlim && e.useShadow && e[_$].rootElement) || e;
  }
  static removeChild(e) {
    "function" == typeof e.remove && e.remove(),
      e.parentNode && e.parentNode.removeChild(e),
      this._$(e).internetExploderClone &&
        this.removeChild(this._$(e).internetExploderClone);
  }
  static wrapGetterSetter(e, t) {
    const i = t.split(".")[0];
    let n = e.__lookupSetter__(i);
    if (n && n[_$]) return i;
    const o = e[i],
      { bindings: s } = this._$(e);
    (s[i] = { chain: new Set(), value: o }), (s[i].value = o);
    const r = (t) => {
      n && n.call(e, t), (s[i].value = t), e._executeBindings(i);
    };
    return (
      (r[_$] = !0),
      e.__defineGetter__(i, () => e[_$].bindings[i].value),
      e.__defineSetter__(i, r),
      i
    );
  }
  static bindOwn(e, t, i) {
    return Slim.bind(e, e, t, i);
  }
  static bind(e, t, i, n) {
    if ((Slim._$(e), Slim._$(t), t[_$].excluded)) return;
    (n.source = e), (n.target = t);
    const o = this.wrapGetterSetter(e, i);
    return (
      t[_$].repeater[o] || e[_$].bindings[o].chain.add(t),
      (t[_$].inbounds[o] = t[_$].inbounds[o] || new Set()),
      t[_$].inbounds[o].add(n),
      function () {
        const t = e[_$].bindings;
        t[o] && t[o].chain && t[o].chain.delete(n);
      }
    );
  }
  static update(e, ...t) {
    if (0 === t.length) return Slim.commit(e);
    for (const i of t) Slim.commit(e, i);
  }
  static commit(e, t) {
    let i = Slim._$(e);
    const n = t ? [t] : Object.keys(i.bindings);
    for (const e of n) {
      const t = i.inbounds[e];
      if (t) for (const e of t) e();
      const n = i.bindings[e];
      if (n) {
        const t = n.chain;
        for (const i of t) Slim.commit(i, e);
      }
    }
  }
  constructor() {
    super(), Slim._$(this), (this.__isSlim = !0);
    const e = () => {
      Slim.checkCreationBlocking(this) || this.createdCallback();
    };
    __flags.isSafari ? Slim.asap(e) : e();
  }
  createdCallback() {
    (this[_$] && this[_$].createdCallbackInvoked) ||
      (this._initialize(),
      (this[_$].createdCallbackInvoked = !0),
      this.onBeforeCreated(),
      Slim.executePlugins("create", this),
      this.render(),
      this.onCreated());
  }
  connectedCallback() {
    super.connectedCallback && super.connectedCallback(),
      Slim.checkCreationBlocking(this) || this.createdCallback(),
      this.onAdded(),
      Slim.executePlugins("added", this);
  }
  disconnectedCallback() {
    this.onRemoved(), Slim.executePlugins("removed", this);
  }
  attributeChangedCallback(e, t, i) {
    i !== t &&
      this.autoBoundAttributes.includes[e] &&
      (this[Slim.dashToCamel(e)] = i);
  }
  _executeBindings(e) {
    Slim.debug("_executeBindings", this.localName, this), Slim.commit(this, e);
  }
  _bindChildren(e) {
    Slim.debug("_bindChildren", this.localName),
      e || (e = Slim.qSelectAll(this, "*"));
    for (let t of e)
      if ((Slim._$(t), t[_$].boundParent !== this)) {
        if (
          ((t[_$].boundParent = t[_$].boundParent || this), t.attributes.length)
        ) {
          const e = Array.from(t.attributes);
          let i = 0,
            n = t.attributes.length;
          for (; i < n; ) {
            const n = this,
              o = e[i];
            if (!t[_$].excluded)
              for (let [e, i] of Slim[_$].customDirectives) {
                const s = e(o);
                s && i(n, t, o, s);
              }
            i++;
          }
        }
        t[_$].excluded || scanNode(this, t);
      }
  }
  _resetBindings() {
    Slim.debug("_resetBindings", this.localName), (this[_$].bindings = {});
  }
  _render(e) {
    Slim.debug("_render", this.localName),
      Slim.executePlugins("beforeRender", this),
      this._resetBindings(),
      [...this.children].forEach((e) => {
        "style" === e.localName &&
          (this[_$].externalStyle = document.importNode(e).cloneNode());
      }),
      (Slim.root(this).innerHTML = "");
    const t = e || this.template,
      i = document.createElement("template");
    i.innerHTML = t;
    const n = i.content.cloneNode(!0),
      { externalStyle: o } = this[_$];
    o && n.appendChild(this[_$]);
    const s = Slim.qSelectAll(n, "*"),
      r = () => {
        (this[_$].rootElement || this).appendChild(n),
          this._bindChildren(s),
          this._executeBindings(),
          this.onRender(),
          Slim.executePlugins("afterRender", this);
      };
    this.useShadow ? r() : Slim.asap(r);
  }
  _initialize() {
    Slim.debug("_initialize", this.localName),
      this.useShadow
        ? void 0 === HTMLElement.prototype.attachShadow
          ? (this[_$].rootElement = this.createShadowRoot())
          : (this[_$].rootElement = this.attachShadow({ mode: "open" }))
        : (this[_$].rootElement = this);
    const e = this.constructor.observedAttributes;
    e &&
      e.forEach((e) => {
        this[Slim.dashToCamel(e)] = this.getAttribute(e);
      });
  }
  get autoBoundAttributes() {
    return [];
  }
  commit(...e) {
    Slim.commit(this, ...e);
  }
  update(...e) {
    Slim.update(this, ...e);
  }
  render(e) {
    this._render(e);
  }
  onRender() {}
  onBeforeCreated() {}
  onCreated() {}
  onAdded() {}
  onRemoved() {}
  find(e) {
    return this[_$].rootElement.querySelector(e);
  }
  findAll(e) {
    return Slim.qSelectAll(this[_$].rootElement, e);
  }
  callAttribute(e, t) {
    const i = this.getAttribute(e);
    if (i) return this[_$].boundParent[i](t);
  }
  get useShadow() {
    return !1;
  }
  get template() {
    return "";
  }
}
(Slim.classToTagDict = new Map()),
  (Slim.plugins = {
    create: new Set(),
    added: new Set(),
    beforeRender: new Set(),
    afterRender: new Set(),
    removed: new Set(),
  }),
  (Slim.debug = () => {}),
  (Slim.asap =
    window && window.requestAnimationFrame
      ? (e) => window.requestAnimationFrame(e)
      : "undefined" != typeof setImmediate
        ? setImmediate
        : (e) => setTimeout(e, 0)),
  (Slim[_$] = {
    customDirectives: new Map(),
    uniqueCounter: 0,
    supportedNativeEvents: [
      "click",
      "mouseover",
      "mouseout",
      "mousemove",
      "mouseenter",
      "mousedown",
      "mouseup",
      "dblclick",
      "contextmenu",
      "wheel",
      "mouseleave",
      "select",
      "pointerlockchange",
      "pointerlockerror",
      "focus",
      "blur",
      "input",
      "error",
      "invalid",
      "animationstart",
      "animationend",
      "animationiteration",
      "reset",
      "submit",
      "resize",
      "scroll",
      "keydown",
      "keypress",
      "keyup",
      "change",
    ],
  }),
  (Slim.isReadOnly = isReadOnly),
  Slim.customDirective(
    (e) => Slim[_$].supportedNativeEvents.indexOf(e.nodeName) >= 0,
    (e, t, i) => {
      const n = i.nodeName,
        o = i.value;
      Slim._$(t).eventHandlers = t[_$].eventHandlers || {};
      const s = t[_$].eventHandlers;
      s[n] = s[n] || new WeakSet();
      let r = (i) => {
        try {
          e[o].call(e, i);
        } catch (i) {
          (i.message = `Could not respond to event "${n}" on ${t.localName} -> "${o}" on ${e.localName} ... ${i.message}`),
            console.warn(i);
        }
      };
      s[n].add(r), t.addEventListener(n, r), (r = null);
    },
  );
const scanNode = (e, t) => {
  const i = Array.from(t.childNodes).filter(
      (e) => e.nodeType === Node.TEXT_NODE,
    ),
    n = t,
    o = Slim._$(t).repeater;
  i.forEach((t) => {
    let i = "";
    const s = t.nodeValue.match(/\{\{([^\}\}]+)+\}\}/g),
      r = {},
      l = {};
    if (s) {
      (Slim._$(t).sourceText = t.nodeValue),
        (t[_$].repeater = o),
        s.forEach((t) => {
          const o = /\{\{(.+)(\((.+)\)){1}\}\}/.exec(t);
          if (o) {
            const n = o[1],
              s = o[3].split(" ").join("").split(",");
            return (
              s.map((e) => e.split(".")[0]).forEach((e) => (r[e] = !0)),
              void (l[t] = (o) => {
                const r = s.map((t) => Slim.lookup(e, t, o)),
                  l = e[n],
                  a = l ? l.apply(e, r) : void 0;
                void 0 !== a && (i = i.split(t).join(a || ""));
              })
            );
          }
          const s = /\{\{(.+[^(\((.+)\))])\}\}/.exec(t);
          if (s) {
            const o = s[1];
            (r[o] = !0),
              (l[t] = (s) => {
                const r = Slim.lookup(e, o, n);
                void 0 !== r && (i = i.split(t).join(r || ""));
              });
          }
        });
      const a = () => {
        (i = t[_$].sourceText),
          Object.keys(l).forEach((e) => {
            l[e](t);
          }),
          (t.nodeValue = i);
      };
      Object.keys(r).forEach((t) => {
        Slim.bind(e, n, t, a);
      });
    }
  });
};
Slim.customDirective(
  (e) => "s:id" === e.nodeName,
  (e, t, i) => {
    Slim._$(t).boundParent[i.value] = t;
  },
),
  Slim.customDirective(
    (e) => /^(bind):(\S+)/.exec(e.nodeName),
    (e, t, i, n) => {
      const o = n[2],
        s = Slim.dashToCamel(o),
        r = i.value,
        l = Slim.rxMethod.exec(r);
      if (l) {
        const i = l[3].split(" ").join("").split(",");
        return void i.forEach((n) => {
          Slim.bind(e, t, n, () => {
            const n = Slim.lookup(e, l[1], t),
              r = i.map((i) => Slim.lookup(e, i, t)),
              a = n.apply(e, r);
            void 0 !== a &&
              (isReadOnly(t, s) || (t[s] = a), t.setAttribute(o, a));
          });
        });
      }
      const a = Slim.rxProp.exec(r);
      if (a) {
        const i = a[1];
        Slim.bind(e, t, i, () => {
          const i = Slim.lookup(e, r, t);
          void 0 !== i &&
            (t.setAttribute(o, i), isReadOnly(t, s) || (t[s] = i));
        });
      }
    },
  ),
  !alreadyExists && window && (window.Slim = Slim);