import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Template from '@/components/Template'
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Template',
      component: Template
    }
  ]
})
