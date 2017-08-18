import Vue from 'vue'
import Router from 'vue-router'
import hots from '@/components/hots'
import main from '@/components/main'
import topic from '@/components/topic'
import search from '@/components/search'
import navResult from '@/components/navResult'
import announcementnews from '@/components/announcementnews'

Vue.use(Router)

window.eventBus = new Vue();	//定义一个全局Vue实例进行数据借助$on和$emit进行数据传输

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    }, {
      path: '/nav:value',
      name: 'nav',
      component: navResult
    }, {
      path: '/topic',
      name: 'topic',
      component: topic
    }, {
      path: '/search:filterKey',
      name: 'search',
      component: search
    }, {
      path: '/hots',
      name: 'hots',
      component: hots
    }
  ]
})
