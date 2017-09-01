<template>
  <div id="app">
    <address-cascader @choosed="show"></address-cascader>
    <div class="msg" v-show="data.province">{{dataString}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
import AddressCascader from 'components/address-cascader/address-cascader'
export default {
  data() {
    return {
      data: {
        province: '',
        city: '',
        area: ''
      }
    }
  },
  computed: {
    dataString() {
      let ret = ''
      this.data.province && (ret += this.data.province)
      this.data.city && (ret += '-' + this.data.city)
      this.data.area && (ret += '-' + this.data.area)

      return ret
    }
  },
  components: {
    AddressCascader
  },
  methods: {
    show(data) {
      this.data = data
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .msg
    font-size:12px
    color:#666
</style>
