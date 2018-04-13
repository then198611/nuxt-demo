import Vue from 'vue'
// demo
const filters = {
  saveTwo: (num) => {
    if (num > 0) {
      if (num % 1 === 0) {
        return num
      } else {
        return num.toFixed(2)
      }
    }
  }
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})