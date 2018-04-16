const fs = require('fs')
const fse = require('fs-extra')
const cp = require('child_process')
const S = require('./s')

const Sub = function (s, o) {
  let SUBREGEX = /\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g
  return s.replace ? s.replace(SUBREGEX, function (m, k) {
    return typeof o[k] === 'undefined' ? m : o[k]
  }) : s
}


fs.readFile('./nginx.demo.conf', 'utf-8', (err1, data) => {
  if(!err1) {
    let wait = ''
    for (let key in S.proxy) {
      wait += `
      location ${key} {
          proxy_pass ${S.proxy[key]};
      }
    `
    }
    fse.outputFile(`./nginx.conf`, Sub(data, {WAIT: wait}), (err2) => {
      if (!err2) {
        console.log('写入nginx完成')
      }
    })
  }
})
