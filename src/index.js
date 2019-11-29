import Magnifier from "./components/Magnifier.vue";

function install(Vue) {
    if (install.installed) return
    install.installed = true
    Vue.component('Magnifier', Magnifier)
  }
  
  const plugin = {
    install
  }
  
  let GlobalVue = null
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.vue
  }
  
  if (GlobalVue) {
    GlobalVue.use(plugin)
  }
  
  Magnifier.install = install

  export default Magnifier