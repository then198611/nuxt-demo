// import axios from '~/utils/axios'

import $axios from '@nuxtjs/axios'

console.log($axios)

export default {
  getUserList: (data) => {
    return $axios.get('/api/users', data)
  }
}