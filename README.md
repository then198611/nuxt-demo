# 配置文件
根目录复制s.demo.js为s.js,编辑自己的配置

```javascript
{
  base: '/n/', //路径
  env: {   // 服务端渲染 默认为空
    baseURL: ''
  },      
  proxy: {  //代理，可以设置多个
    '/api/': 'http://127.0.0.1:8066'
  },      
  mock: { // mock 需要的话请自行设置,需要启动npm run mock
    prefix: '/api_mock',
    baseURL: 'http://127.0.0.1:8066'
  }
}
```

# 安装依赖
npm config set @nuxtjs:registry https://registry.npm.taobao.org/

npm config set @babel:registry https://registry.npm.taobao.org/

npm config set ai-i:registry http://npm.iqianjin.com/

npm config set ai-ui:registry http://npm.iqianjin.com/

npm config set ai-act-ui:registry http://npm.iqianjin.com/

npm install

# 启动项目
dev:npm run dev 

需要m站登录支持，请绑定本地host,访问路径为http://m.iqianjin.com/n/..., 

不需要的直接访问127.0.0.1:8022/n/


mock:npm run mock 

build:npm run build 

start:npm run start 

# nuxt为vue增加的方法

api: https://zh.nuxtjs.org/api/

> asyncData
```javascript
export default {
  data () {
    return { project: 'default' }
  },
  asyncData (context) {
    return { project: 'nuxt' }
  }
}
```


# 服务端渲染说明

>async asyncData(context) 进在pages目录中使用 不可在components中使用


| 属性字段 | 类型 | 描述
| --------   | -----:  | :----: |
|app | Root vue | 可以调取Root所有东西|
|isClient | Boolean | 是否来自客户端渲染|
|isServer|Boolean|是否来自服务端渲染|
|isDev|Boolean|是否是开发(dev) 模式，在生产环境的数据缓存中用到|
|route|vue-router|vue-router 路由实例|
|store|vuex|vuex 实例|
|env|Object|nuxt.config.js 中配置的环境变量|
|params|Object|route.params 的别名|
|query|Object|route.query 的别名|
|redirect|Function|用这个方法重定向用户请求到另一个路由|
|req|Request|Node.js API 的 Request 对象。如果 nuxt 以中间件形式使用的话，这个对象就根据你所使用的框架而定,仅限服务端使用|
|res|Response|Node.js API 的 Response 对象。如果 nuxt 以中间件形式使用的话，这个对象就根据你所使用的框架而定,仅限服务端使用|

# fetch

>fetch 方法用于在渲染页面前填充应用的状态树（store）数据

```javascript
fetch ({ store, params }) {
  return axios.get('***')
  .then((res) => {
    store.commit('***', res)
  })
}
```

# axios使用说明

#### axios 已注入vue和app 具体使用供参考如下
1. axios methods: 'delete', 'get', 'head', 'options', 'post', 'postQs', 'put', 'patch',新增 postQs方法
2. axios所有方法已封装，只需传入axios.[method] (url, data)即可
3. axios返回值直接返回data对象

> asyncData中使用

```javascript
async asyncData({ app }) {
  const userList = await app.$axios.get('/api/users')
  return { userList }
}
```
> vue client  methods/created/mounted ... 中使用

```javascript
methods: {
  async getUserList() {
    const userList = await this.$axios.get('/api/users')
    this.userList = userList
  }
}
```

> store中使用, 所有api请写入store module action中 

 
```javascript
actions: {
  async getUserList ({ commit }) {
    const userList = await this.$axios.get('/api/users')
    commit('SET_USER_LIST', userList)
  }
}
```

# 路由

pages

--| users/

------ _id.vue

--| _num/

------ index.vue

------ commonts.vue

-- index.uve

生成路由如下：

```javascript
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'num',
      path: '/:num',
      component: 'pages/_num/index.vue'
    },
    {
      name: 'num-comments',
      path: '/:num/comments',
      component: 'pages/_num/comments.vue'
    }
  ]
}
```

#### 你会发现名称为 users-id 的路由路径带有 :id? 参数，表示该路由是可选的。如果你想将它设置为必选的路由，需要在 users/_id 目录内创建一个 index.vue 文件

#### 路由参数检测

pages/users/_id.vue

```javascript
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
```

# 中间件

```javascript
export default (context) => {
  //中间件入参有上下文 可以直接使用相关操作
}
```

#### 你的 nuxt.config.js  layouts 或者 pages 中都可以使用中间件

> nuxt.config.js中使用中间件

```javascript
module.exports = {
  router: {
    middleware: 'name'
  }  
}
```

> layouts或pages中使用中间件

```javascript
export default {
  middleware: 'name'
}
```

# head

> head中可以使用this获取

```javascript
data (){
  return {
    title: 'xxx'
  }
},
head () {
  return {
    title: this.title,
    meta: [
      { hid: 'description', name: 'description', content: 'My custom description' }
    ]
  }
}
```

# scrollToTop

> scrollToTop 属性用于控制页面渲染前是否滚动至页面顶部

```javascript
export default {
  scrollToTop: true
}
```

# 视图使用

> 一般应用在页面公用部分提出

layouts/nav.vue
```html
<template>
  <div>
    <nav>
      <a href="1">1</a>
      <a href="2">2</a>
    </nav>
    <nuxt/>
  </div>
</template>
```
```javascript
export default {
  layout: 'nav'
}
```

# plugins-directives plugins-filters

> 请在plugins中对应目录添加即可, 注意所有三方模块都在plugins中添加

# 静态目录文件夹static

> 访问路径 为 S.base/  参考s.js文件

# 组件或者资源文件引入方法

```javascript
img:   <img src="~assets/**/*.png">

import ** from '~components/**/*.vue'

data: () => {
  img: require('~assets/**/*.png')
}

```