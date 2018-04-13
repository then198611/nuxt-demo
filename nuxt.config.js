const S = require('./s')

let obj = {}
if (process.env.MOCK && S.mock.prefix && S.mock.baseURL) {
  obj[S.mock.prefix] = S.mock.baseURL
}
let proxyObj = Object.assign(S.proxy, obj)

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt_demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vender: [
      'axios'
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config.devtool = 'eval-source-map'
      }
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true
  },
  proxy: proxyObj,
  cache: {
    max: 1000,
    maxAge: 900000
  },
  plugins: [
    { src: '~plugins/axios.js', ssr: true },
    { src: '~plugins/filters.js', ssr: false },
    { src: '~plugins/directives.js', ssr: false }
  ],
  css: [

  ]
}
