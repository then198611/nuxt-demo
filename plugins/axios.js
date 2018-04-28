import S from '~/s'
import qs from 'qs'

const methods = ['delete', 'get', 'head', 'options', 'post', 'postQs', 'put', 'patch']

export default ({$axios, redirect, req}) => {

  // request拦截
  $axios.interceptors.request.use(
    config => {
      if (process.server) {
          config.headers.common.cookie = req.headers.cookie
      }
      config.timeout = 1000
      config.baseURL = process.server ? S.env.baseURL : ''
      config.url = process.env.MOCK ? `${S.mock.prefix}${config.url}` : config.url
      return config
    },
  )
  // response 拦截
  $axios.interceptors.response.use(
    res => {
      return res.data
    },
    error => {
      // 服务端失败直接跳转404
      if (process.server) {
        redirect('/404')
      }
    }
  )
  
  // 添加log
  $axios.onRequest(config => {
    if (process.server) {
      console.log(`【${config.method}】->${config.url}, data: ${JSON.stringify(config.params || config.data)}`)
    }
  })

  // $axios.onError(error => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     redirect('/400')
  //   }
  // })
  
  // 覆写并增加postQs方法
  for (let method of methods) {
    $axios[method] = (url, data) => {
      let isPostQs = method === 'postQs'
      let opt = {
        method: isPostQs ? 'post' : method,
        url,
      }
      opt[method === 'get' ? 'params' : 'data'] = isPostQs ? qs.stringify(data) : data

      if (isPostQs) {
        opt.header = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      return $axios(opt)
    }
  }

}