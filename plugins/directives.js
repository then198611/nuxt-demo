import Vue from 'vue'

// demo
const directives = [
  {
    name: 'logger',
    entry: {
      bind (el, binding) {
        el.addEventListener('click', () => {
          // <button v-logger="abc"></button>
          let value = binding.value // value is abc
          // do something
          console.log(value)
        }, false)
      }
    }
  }
]

directives.forEach(item => {
  Vue.directive(item.name, item.entry)
})