// this theme is DEPRECATED, use theme:default!

import 'regenerator-runtime/runtime'
import UniqueId from 'vue-unique-id'
import App from './App'
import hooks from './hooks'
import { locale, messages } from '@vote/locale'

const root = document.createElement('div')
root.id = 'app'
document.body.appendChild(root)

Vue.use(UniqueId)
Vue.use(VueI18n)
const i18n = new VueI18n({ locale, messages })

window.onload = () => {
  window.voteHooks = hooks
  window.dispatchEvent(new Event('vote:ready'))

  window.vm = new Vue({
    el: '#app',
    i18n,
    render: h => h(App),
  })
}
