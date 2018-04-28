const S = require('./s')
//
// let obj = {}
// if (process.env.MOCK && S.mock.prefix && S.mock.baseURL) {
//   obj[S.mock.prefix] = S.mock.baseURL
// }
// let proxyObj = Object.assign(S.proxy, obj)

module.exports = {
  head: {
    title: 'nuxt_demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${S.base}/favicon.ico` }
    ]
  },
  router: {
    base: S.base,
    middleware: 'auth'
  },
  loading: { color: '#3B8070' },
  build: {
    // extractCSS: {
    //   allChunks: true
    // },
    vender: [
      'axios',
      'vant',
      'babel-polyfill',
      'ai-act-ui',
      'ai-i'
    ],
    babel: {
      // "presets": [
      //   ["env", {
      //     "modules": false,
      //     "targets": {
      //       "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      //     }
      //   }],
      //   "stage-2"
      // ],
      presets: ['es2015', 'stage-2'],
      plugins: [
        'transform-runtime', 
        'transform-es2015-modules-commonjs',
        ["import", {
          "libraryName": "vant",
          "libraryDirectory": "es",
          "style": true
        }]
      ]
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient,isServer }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config.devtool = 'eval-source-map'
      }
      // if (isServer) {
      //   config.externals = [
      //     require('webpack-node-externals')({
      //       whitelist: [/\.(?!(?:js|json)$).{1,5}$/i, /^ai-act-ui/, /^ai-i/]
      //     })
      //   ]
      // }
    }
  },
  modules: [
    '@nuxtjs/axios',
  ],
  // axios: {
  //   proxy: true
  // },
  // proxy: proxyObj,
  cache: {
    max: 1000,
    maxAge: 900000
  },
  plugins: [
    { src: '~plugins/axios', ssr: true },
    { src: '~plugins/filters', ssr: false },
    { src: '~plugins/directives', ssr: false },
    { src: '~plugins/fastclick', ssr: false },
    { src: '~plugins/vant', ssr: true },
    { src: '~plugins/ai-act', ssr: false },
    { src: '~plugins/ai-i', ssr: false }
  ],
  css: [
    'vant/lib/vant-css/index.css'
  ]
}
