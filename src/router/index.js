import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import {
  getToken,
  canTurnTo,
  getUsername,
  getUrl
} from '@/libs/util'

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
  const username = getUsername()
  const baseurl = getUrl()
  
  
  // if (username) {
    // next({})
  // }else{
  //   next({
  //         name: LOGIN_PAGE_NAME // 跳转到登录页
  //       })
  // }
  // const token = getToken() 

  if (!username && !baseurl && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!username && !baseurl && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (username && baseurl && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: 'main' // 跳转到home页
    })
  }else{
    next()
  }

 

  


  // } else {
  //   store.dispatch('getUserInfo').then(user => {
  //     if (user) {
  //       if (canTurnTo(to.name, user.access, routes)) next() // 有权限，可访问
  //       else {
  //         next({
  //           replace: true,
  //           name: 'error_401'
  //         })
  //       } // 无权限，重定向到401页面
  //     }else{
  //       next({
         
  //       })
  //     }
  //     // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：[1] [1, 2]
  //   })
  // }
})

router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router
