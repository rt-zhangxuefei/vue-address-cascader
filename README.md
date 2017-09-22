# vue-address-cascader

> 基于vue 2.x的省市区级联选择组件，已经包含了最新全国省市区基础数据<http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/201703/t20170310_1471429.html>
genData.js是个node程序，把国标的文本数据生成json格式，方便在程序里面引入使用

# 立即使用
> 引入src/components/address-cascader

# 默认属性

``` json
props: {
    defaultProvince: {
      type: String,
      default: ''
    },
    defaultCity: {
      type: String,
      default: ''
    },
    defaultArea: {
      type: String,
      default: ''
    }
  }
```

# 获取组件选中的数据
> 在父组件监听事件：choosed，事件函数接收一个参数作为返回的对象
```
{province:{name,isMunicipality},city,area}
```
> 注意返回结果如（北京，四川）不包含（省和市字样），如果你希望返回，可以修改genData里面的genData.js，这是个node程序，用来生产基础数据的json文件
> isMunicipality:是否为直辖市

# 安装依赖及运行

``` bash
  npm install
```
``` bash
  npm run dev
```
