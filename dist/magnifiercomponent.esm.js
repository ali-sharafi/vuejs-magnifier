//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: "Magnifier",
  props: {
    src: String,
    width: { type: Number, default: 400 },
    height: {
      type: Number,
      default: 550
    },
    zoomLevel: {
      type: Number,
      default: 3
    },
    glassWidth: {
      type: Number,
      default: 100
    },
    glassHeight: {
      type: Number,
      default: 100
    }
  },
  data: function data() {
    return {
      image: "",
      semiGlassWidth: "",
      semiGlassHeight: "",
      glass: "",
      bw: 1,
      isHover: false
    };
  },
  mounted: function mounted() {
    this.image = this.$refs.myImg;
    this.magnify();
  },
  methods: {
    moveMagnifier: function moveMagnifier(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = this.getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /*prevent the magnifier glass from being positioned outside the image:*/
      if (x > this.image.width - this.semiGlassWidth / this.zoomLevel) {
        x = this.image.width - this.semiGlassWidth / this.zoomLevel;
      }
      if (x < this.semiGlassWidth / this.zoomLevel) {
        x = this.semiGlassWidth / this.zoomLevel;
      }
      if (y > this.image.height - this.semiGlassHeight / this.zoomLevel) {
        y = this.image.height - this.semiGlassHeight / this.zoomLevel;
      }
      if (y < this.semiGlassHeight / this.zoomLevel) {
        y = this.semiGlassHeight / this.zoomLevel;
      }
      /*set the position of the magnifier this.glass:*/
      this.glass.style.left = x - this.semiGlassWidth + "px";
      this.glass.style.top = y - this.semiGlassHeight + "px";
      /*display what the magnifier this.glass "sees":*/
      this.glass.style.backgroundPosition =
        "-" +
        (x * this.zoomLevel - this.semiGlassWidth + this.bw) +
        "px -" +
        (y * this.zoomLevel - this.semiGlassHeight + this.bw) +
        "px";
    },
    getCursorPos: function getCursorPos(e) {
      var a,
        x = 0,
        y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = this.image.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    },
    magnify: function magnify() {
      this.glass = this.$refs.glass;
      this.semiGlassWidth = this.glass.offsetWidth / 2;
      this.semiGlassHeight = this.glass.offsetHeight / 2;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) { style.element.setAttribute('media', css.media); }
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) { style.element.removeChild(nodes[index]); }
      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"img-magnifier-container",on:{"mouseleave":function($event){_vm.isHover = false;},"mouseenter":function($event){_vm.isHover = true;}}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isHover),expression:"isHover"}],ref:"glass",staticClass:"img-magnifier-glass",style:(("background-image:url(" + (this.src) + ");width:" + _vm.glassWidth + "px;height:" + _vm.glassHeight + "px;background-size:" + (_vm.width*_vm.zoomLevel) + "px " + (_vm.height*_vm.zoomLevel) + "px")),on:{"mousemove":_vm.moveMagnifier}}),_vm._v(" "),_c('img',{ref:"myImg",attrs:{"src":_vm.src,"width":_vm.width,"height":_vm.height},on:{"mousemove":_vm.moveMagnifier}})])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-52ff0594_0", { source: "*[data-v-52ff0594]{box-sizing:border-box}.img-magnifier-container[data-v-52ff0594]{position:relative}.img-magnifier-glass[data-v-52ff0594]{position:absolute;border-radius:50%;background-repeat:no-repeat;cursor:none}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-52ff0594";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var Magnifier = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

function install(Vue) {
    if (install.installed) { return }
    install.installed = true;
    Vue.component('Magnifier', Magnifier);
  }
  
  var plugin = {
    install: install
  };
  
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.vue;
  }
  
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
  
  Magnifier.install = install;

export default Magnifier;
