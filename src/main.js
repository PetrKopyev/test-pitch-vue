import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/_main.scss';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI, {locale});

window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
