import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import './assets/css/normalize.css'
import { Search, Swipe, SwipeItem, Lazyload, Dialog, Image as VanImage } from 'vant'

Vue.config.productionTip = false;
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Dialog);
Vue.use(VanImage);

Vue.prototype.$video = Video;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
