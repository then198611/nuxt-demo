import S from '~/s'
import qs from 'qs'

const methods = ['delete', 'get', 'head', 'options', 'post', 'postQs', 'put', 'patch']

export default ({$axios, redirect}) => {

  $axios.interceptors.request.use(
    config => {
      config.timeout = 1000
      config.baseURL = process.server ? S.env.baseURL : ''
      config.url = process.env.MOCK ? `${S.mock.prefix}${config.url}` : config.url
      return config
    },
  )

  $axios.interceptors.response.use(
    res => {
      return res.data
    },
    error => {
      if (process.title === 'node') {
        redirect('/404')
      }
    }
  )

  $axios.onRequest(config => {
    console.log(`【${config.method}】->${config.url}, data: ${JSON.stringify(config.params || config.data)}`)
  })

  // $axios.onError(error => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     redirect('/400')
  //   }
  // })
  
  for (let method of methods) {
    $axios[method] = (url, data) => {
      let opt = {
        method: method === 'postQs' ? 'post' : method,
        url,
      }
      if (method === 'get') {
        opt.params = data
      } else {
        opt.data = data
      }

      if (method === 'postQs') {
        opt.header = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        opt.data = qs.stringify(data)
      }
      return $axios(opt)
    }
  }

}