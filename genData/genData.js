var fs = require('fs')
var path = require('path')
fs.readFile(path.join(__dirname, 'data-20160731.txt'), 'utf-8', (err, data) => {
  if (!err) {
    var contArr = data.split('\r\n')
    var kv = []
    var ret = []
    contArr.forEach((item) => {
      var temp = item.trim().split(/\s+/)
      temp && kv.push({ id: temp[0], name: temp[1] })
    })

    ret.push({ name: '请选择', sub: [{ name: '请选择' }] })

    var flag = false

    kv.forEach((item, index) => {
      if (item.id.substring(2) === '0000') {
        if (kv[index + 1] && kv[index + 1].id.substring(4) === '00' && kv[index + 1].name === '市辖区') {
          ret.push({ name: trimEnd(item.name), sub: [{ name: '请选择' }], isMunicipality: 1 })
          flag = true
        } else {
          ret.push({ name: trimEnd(item.name), sub: [{ name: '请选择', sub: [] }] })
          flag = false
        }
      } else {
        if (item.name === '市辖区') {
          return
        }
        if (flag) {
          ret[ret.length - 1].sub.push({ name: item.name })
        } else {
          if (item.id.substring(4) === '00') {
            ret[ret.length - 1].sub.push({ name: trimEnd(item.name), sub: [{ name: '请选择' }] })
          } else {
            var len = ret[ret.length - 1].sub.length
            ret[ret.length - 1].sub[len - 1].sub.push({ name: item.name })
          }
        }
      }
    })


    // 生成文件
    fs.writeFile(path.join(__dirname, 'regions.json'), JSON.stringify(ret), 'utf-8', (err) => {
      if (err) { console.log(err) }
    })
  } else {
    console.log(err)
  }
})

function trimEnd(str) {
  if (str.indexOf('市') > 0 || str.indexOf('省') > 0) {
    return str.slice(0, -1)
  }

  if (str.indexOf('新疆') > -1 || str.indexOf('宁夏') > -1 || str.indexOf('西藏') > -1 || str.indexOf('广西') > -1 || str.indexOf('香港') > -1 || str.indexOf('澳门') > -1) {
    return str.slice(0, 2)
  }

  if (str.indexOf('内蒙古') > -1) {
    return str.slice(0, 3)
  }
  return str
}
