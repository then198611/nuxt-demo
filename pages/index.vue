<style>

</style>

<template>
  <div class="container-view welcome-view">
    {{message}}

    <button @click="getData" v-logger="'get'">get</button>
    <button @click="postTest">post</button>
    <button @click="putTest">put</button>
    <button @click="postQsTest">postQs</button>
    <button @click="deleteTest">delete</button>
    <button @click="patchTest">patch</button>
  </div>
</template>

<script>

export default {
  async asyncData ({store}) {
    return store.dispatch('getUserList').then(res => {
      return {
        message: res.message
      }
    })
  },
  mounted () {
    console.log(this.$axios.prototype)
    // this.getData()
  },
  data (){
    return {
      form: {
        a: 'ces',
        b: 2
      }
    }
  },
  methods: {
    getData () {
      this.$store.dispatch('getUserList', this.form).then(res => {
        console.log(res)
      })
    },
    postTest () {
      this.$axios.post('/api/users', this.form)
    },
    postQsTest () {
      this.$axios.postQs('/api/users', this.form)
    },
    putTest () {
      this.$axios.put('/api/users', this.form)
    },
    deleteTest () {
      this.$axios.delete('/api/users', this.form)
    },
    patchTest () {
      this.$axios.patch('/api/users', this.form)
    }
  }
}
</script>
