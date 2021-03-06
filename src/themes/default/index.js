import './mdc-init'
import 'regenerator-runtime/runtime'
import UniqueId from 'vue-unique-id'
import App from './App'
import hooks from './hooks'
import QTitle from './QTitle'
import QInvalidTip from './QInvalidTip'
import { locale, messages } from '@vote/locale'

const root = document.createElement('div')
root.id = 'app'
document.body.appendChild(root)

Vue.use(UniqueId)
Vue.use(VueI18n)
const i18n = new VueI18n({ locale, messages })

Vue.component('QTitle', QTitle)
Vue.component('QInvalidTip', QInvalidTip)

window.onload = () => {
  window.voteHooks = hooks
  window.dispatchEvent(new Event('vote:ready'))

  window.vm = new Vue({
    el: '#app',
    i18n,
    render: h => h(App),
  })
}
