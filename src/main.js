// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import firebase from './firebase'

let app = '';

Vue.use(Vuetify)
Vue.config.productionTip = false
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'video.js/dist/video-js.css'

/* eslint-disable no-new */
firebase.auth().onAuthStateChanged(() => {
  if(!app){
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
  }
})

