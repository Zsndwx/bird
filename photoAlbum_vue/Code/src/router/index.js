import Vue from 'vue'
import Router from 'vue-router'
import Demo1 from '@/pages/demo1/index.vue'
import Photo from '@/pages/demo1/photo.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo1',
      component: Demo1
    },
    {
      path: '/photo/:imgurl',
      name: 'Photo',
      component: Photo
    }
  ]
})
