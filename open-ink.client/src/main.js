import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import 'lodash'
import {Tooltip} from 'bootstrap'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import { router } from './router'


const root = createApp(App)
registerGlobalComponents(root)

root
.directive('tooltip', {
  mounted: (el, binding) => {
    el.title = binding.value
    let tip = new Tooltip(el, {
      trigger: 'hover',
      placement: binding.arg || 'auto', // left, right, top, bottom
      // offset: [10, 0],
      popperConfig: {}
    })
    el.addEventListener('onmouseleave', tip.hide())
  },
  unmounted: (el, binding) =>{
    let tooltip = Tooltip.getOrCreateInstance(el)
    tooltip.dispose()
  }
  // FIXME gets stuck on clicked elements
  // updated: (el, binding) => {
  //   el.title = binding.value
  //   let tip = new Tooltip(el, {
  //     trigger: 'hover',
  //     placement: binding.arg
  //   })
  //   el.addEventListener('onmouseleave', tip.hide())
  // }
})
  .use(router)
  .mount('#app')
