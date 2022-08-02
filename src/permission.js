import router from '@/router'
import store from '@/store'
//路由（全局）前置守卫
//会在所有路由进入之前触发
// to: 去哪里的路由信息
// from：来自于哪个路由信息
// next :是否进入
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    //1.登录
    //是否进入登录页
    if (to.path === '/login') {
      //1.1是 跳到首页
      next('/')
    } else {
      //1.2不是直接进入
      next()
    }
  } else {
    //2.未登录
    //访问的是否在白名单（未登录也能访问的页面
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      //2.1在白名单放行
      next()
    } else {
      //2.2不在白名单跳到登录页
      next('/login')
    }
  }
})
