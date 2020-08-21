import VuikitIcons from '@vuikit/icons'
import '@vuikit/theme'
import netlifyIdentity from 'netlify-identity-widget'
import Vue from 'vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import Vuex from 'vuex'
import Vuikit from 'vuikit'
import App from './App.vue'
import router from './router.js'
import actions from './store/actions'
import getters from './store/getters'
import mutations from './store/mutations'
import state from './store/state'

Vue.use(Vuex)
Vue.use(Vuikit)
Vue.use(VuikitIcons)
Vue.use(VueSidebarMenu)

Vue.config.productionTip = false

netlifyIdentity.init({
  APIUrl: 'http://localhost:8085/.netlify/identity'
})

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
