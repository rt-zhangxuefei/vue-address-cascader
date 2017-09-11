# vue-address-cascader

> 基于vue 2.x的省市区级联选择组件，已经包含了地址基础数据

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
{province,city,area}
```
> 注意返回结果如（北京，四川）不包含（省和市字样）

# 安装依赖及运行

``` bash
  npm install
```
``` bash
  npm run dev
```
