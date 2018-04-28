import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'


import {getCookie} from '../utils/cookie'

Vue.use(Vuex)

/**
 *  全局 store 
 *  用于存储用户信息
 */
const store = () => new Vuex.Store({
  state: {
    isLogin: false, // 是否登录
    uid: 0,         // 用户id
    uname: ''       // 用户名
  },
  mutations: {
    setIsLogin (state, is) {
      state.isLogin = is
    },
    setUid (state, is) {
      state.uid = is
    },
    setUname (state, is) {
      state.uname = is
    }
  },
  actions: {
    /**
     * 同步登录 
     */
    async nuxtServerInit ({ commit, state}, {req, res, route}) {
      const getFromCookie = (key = 'lp', cookie = req.headers.cookie) => {
        return getCookie(key, cookie)
      }
      let [from, appToken, token = '', app = ''] = [route.query.from || '' , getFromCookie('appToken')]
      if (appToken) {
        token = appToken.split('&')[0]
        app = appToken.split('&')[1].split('=')[1]
      } else {
        token = route.query.token || ''
        app = route.query.h5app || ''
      }
      if(from && from == 'app'){
        res.setHeader('Set-Cookie', [`from=2;max-age=${24 * 360};path='/'`])
      }
      /**
       *  只在cookie lp无效且有token的情况下调用
       */
      if (!getFromCookie() && token) {
        let res = await this.$axios.get('/user/checkLoginFast', {
          h5token: token,
          h5app: app
        })
        if (res && res.code === 1) {
          let [isLogin, uid, uname] = [true, res.bean.id, res.bean.nickName]
          commit('setIsLogin', isLogin)
          commit('setUid', uid)
          commit('setUname', uname)
        } else {
          console.error(`同步登录失败:${res.message ? res.message : ''},code${res.code ? res.code : -1}`)
        }
      }
    }
  },
  getters: {
    isLogin: state => state.isLogin,
    uid: state => state.uid,
    uname: state => state.uname
  },
  /**
   *  分模块，避免命名冲突
   *  模块中主要进行api actions及部分局部变量填充
   */
  modules: {
    user
  }
})

export default store
