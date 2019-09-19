import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 需要左方向动画的路由用this.$router.to('****')
Router.prototype.togo = function (path) {
  this.isleft = true
  this.isright = false
  this.push(path)
}
// 需要右方向动画的路由用this.$router.goRight('****')
Router.prototype.goRight = function (path) {
  this.isright = true
  this.isleft = false
  this.push(path)
}
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
Router.prototype.goBack = function () {
  this.isright = true
  this.isleft = false
  this.go(-1)
}
// 点击浏览器返回按钮执行，此时不需要路由回退
Router.prototype.togoback = function () {
  this.isright = true
  this.isleft = false
}
// 点击浏览器前进按钮执行
Router.prototype.togoin = function () {
  this.isright = false
  this.isleft = true
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['@/pages/index'], resolve),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: (resolve) => require(['@/pages/index/home'], resolve)
        },
        {
          path: '/gift',
          name: 'gift',
          component: (resolve) => require(['@/pages/index/gift'], resolve)
        },
        {
          path: '/footprints',
          name: 'footprints',
          component: (resolve) => require(['@/pages/index/footprints'], resolve)
        },
        {
          path: '/me',
          name: 'me',
          component: (resolve) => require(['@/pages/index/me'], resolve)
        },
        {
          path: '/login',
          name: 'login',
          component: (resolve) => require(['@/pages/index/login'], resolve)
        },
        {
          path: '/reg',
          name: 'reg',
          component: (resolve) => require(['@/pages/index/reg'], resolve)
        }
      ]
    },
    {
      path: '/Home/Detail/:id',
      name: 'Detail',
      props: true,
      component: (resolve) => require(['@/pages/detail'], resolve)
    },
    {
      path: '/Home/addTask',
      name: 'addTask',
      // props: true,
      component: (resolve) => require(['@/pages/index/addTaskForm'], resolve)
    }
  ]
})
