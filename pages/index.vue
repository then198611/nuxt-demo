<style lang="less">
  .red{
    color: red;
  }
</style>

<template>
  <div class="container-view welcome-view">
    <logo></logo>
    <no-ssr>
      <div>
      <ai-act-banner :class="message"></ai-act-banner>
      <ai-act-coin :class="message"></ai-act-coin>
      </div>
    </no-ssr>
    <van-icon name="close" />
    test
    <van-button @click="getData" v-logger="'get'" class="red">get {{message}}</van-button>
    <van-button @click="postTest">post</van-button>
    <van-button @click="putTest">put</van-button>
    <van-button @click="postQsTest">postQs</van-button>
    <van-button @click="deleteTest">delete</van-button>
    <van-button @click="patchTest">patch</van-button>
  </div>
</template>

<script>

import Logo from '~/components/AppLogo.vue'

export default {
  // async asyncData (context) {
  //   return context.store.dispatch('user/getUserList').then(res => {
  //     return {
  //       message: res.message
  //     }
  //   })
  // },
  layouts: 'default',
  components:{
    Logo
  },
  mounted () {
    // console.log(this.$store.state)
    // this.getData()
    // AI.isLogin().then(() => {
    //   console.log('login')
    // }, () => {
    //   console.log('unlogin')
    // })
  },
  data (){
    return {
      message: '123',
      form: {
        a: 'ces',
        b: 2
      }
    }
  },
  methods: {
    getData () {
      this.$store.dispatch('user/getUserList', this.form)
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
