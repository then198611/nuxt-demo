import {getCookie} from '../utils/cookie'

/**
 * 读取request cookie|同步登录 获取登录信息 并写入全局store中
 */

export default ({req, res, store, route, $axios}) => {
  /**
   * 获取cookie中的key
   */
  const getFromCookie = (key = 'lp', cookie = req.headers.cookie) => {
    return getCookie(key, cookie)
  }
  /**
   *   触发store commit 存储到store全局
   */
  const storeCommit = (isLogin = false, uid = -1, uname = '') => {
    store.commit('setIsLogin', isLogin)
    store.commit('setUid', uid)
    store.commit('setUname', uname)
  }
  /**
   *  如果有token走同步登录
   */
  // const syncLogin = (token, app) => {
  //   let url = '/user/checkLoginFast'
  //   let res = store.dispatch('authSyncLogin', {
  //     h5token: token,
  //     h5app: app
  //   })
  //   console.log(res)
  //   if (res && res.code === 1) {
  //     let [isLogin, uid, uname] = [true, res.bean.id, res.bean.nickName]
  //     console.log(isLogin, uid, uname)
  //     commit('setIsLogin', isLogin)
  //     commit('setUid', uid)
  //     commit('setUname', uname)
  //     console.log(state)
  //   } else {
  //     console.error(`同步登录失败:${res.message},code${res.code}`)
  //   }
  // }
  /**
   * 没有token 走正常的读取cookie 判断登录状态
   */
  const setAuth = () => {
    let cookie = req.headers.cookie
    let [isLogin, uid, uname, lp] = [false, -1, '', getFromCookie()]
    if (lp) {
      isLogin = true
      let uArr = lp ? lp.split(lp.substring(lp.length,lp.length - 7)) : []
      uid = uArr && uArr[1] ? uArr[1] : -1
      uname = uArr && uArr[0] ? uArr[0] : ''
      storeCommit(isLogin, uid, uname)
    }
  }

  // let [from, appToken, token = '', app = ''] = [route.query.from || '' , getFromCookie('appToken')]
  // if (appToken) {
  //   token = appToken.split('&')[0]
  //   app = appToken.split('&')[1].split('=')[1]
  // } else {
  //   token = route.query.token || ''
  //   app = route.query.h5app || ''
  // }
  // if(from && from == 'app'){
  //   res.setHeader('Set-Cookie', [`from=2;max-age=${24 * 360};path='/'`])
  // }
  /**
   *  先读取request cookie中是否有lp 有点话直接根据lp来判断是否登录 
   *  否则的话 判断是否有token 有的话走同步登录
   */

  // if (process.server) {
    // if (getFromCookie()) {
      setAuth()
    // } else if (token) {
      // syncLogin(token, app)
    // } else {
      // storeCommit()
    // }
  // }
}