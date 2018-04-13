const S = {
  env: {
    baseURL: 'http://127.0.0.1:3000'
  },
  proxy: {
    '/api/': 'http://127.0.0.1:8066'
  },
  mock: {
    prefix: '/api_mock',
    baseURL: 'http://10.10.178.49:3008'
  },
  axios: {
    console: true
  }
}

module.exports = S