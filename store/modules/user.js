export default {
  // state: {

  // },
  actions: {
    async getUserList ({commit}, data) {
      return await this.$axios.get('/api/users', data)
    }
  },
  // mutations: {

  // },
  // getters: {

  // }
}