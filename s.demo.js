const S = {
  env: {
    baseURL: '',
  },
  proxy: {
    '/api/': 'http://127.0.0.1:8066'
  },
  mock: {
    prefix: '/api_mock',
    baseURL: 'http://127.0.0.1:8066'
  }
}

module.exports = S
