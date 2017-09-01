<template>
  <div class="address">
    <select class="option province" v-model="currProvince">
      <option v-for="(item,index) in provinces" :key="index">{{item.name}}</option>
    </select>
    <select class="option city" v-model="currCity" v-show="cities.length">
      <option v-for="(item,index) in cities" :key="index">{{item.name}}</option>
    </select>
    <select class="option area" v-model="currArea" v-show="areas.length">
      <option v-for="(item,index) in areas" :key="index">{{item.name}}</option>
    </select>
  </div>
</template>
<script>
import { REGIONS } from './regions'

const REGION_NAME = '请选择'

export default {
  name: 'address-cascader',
  data() {
    return {
      currProvince: '',
      currCity: '',
      currArea: '',
      provinces: [],
      cities: [],
      areas: []
    }
  },
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
  },
  created() {
    REGIONS.forEach((item) => {
      this.provinces.push(item)
    })
    this.currProvince = REGIONS[0].name
  },
  watch: {
    defaultProvince(newValue) {
      newValue && (this.currProvince = newValue)
    },
    defaultCity(newValue) {
      newValue && (this.currCity = newValue)
    },
    defaultArea(newValue) {
      newValue && (this.currArea = newValue)
    },
    currProvince(newValue) {
      if (newValue === REGION_NAME) {
        this.currCity = ''
        this.cities = []
        this.currArea = ''
        this.areas = []
      } else {
        this.changeProvince()
      }
    },
    currCity() {
      this.changeCity()
    },
    currArea() {
      this.changeArea()
    }
  },
  methods: {
    changeProvince() {
      this.provinces.some((item) => {
        if (item.name === this.currProvince) {
          if (item.sub && item.sub.length) {
            this.cities = item.sub
            let ret = this.cities.find((item) => {
              return item.name === this.currCity
            })
            ret || (this.currCity = this.cities[0].name)
          } else {
            this.currCity = ''
            this.cities = []
          }
          return true
        }
      })
    },
    changeCity() {
      this.cities.some((item) => {
        if (item.name === this.currCity) {
          if (item.sub && item.sub.length) {
            this.areas = item.sub
            let ret = this.areas.find((item) => {
              return item.name === this.currArea
            })
            ret || (this.currArea = this.areas[0].name)
          } else {
            this.currArea = ''
            this.areas = []
          }
          return true
        }
      })
      this._emitChoosed()
    },
    changeArea() {
      this._emitChoosed()
    },
    _emitChoosed() {
      this.$emit('choosed', { province: this.currProvince, city: this.currCity, area: this.currArea })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .address
    display:flex
    flex:1
    align-items:center
    .province
      flex:0 0 68px
    .city
      flex:1 1 68px
      width:68px
    .area
      width:68px
    .option
      border: 1px solid #b8b8b8
      font-size: 12px
      color: #333
      height: 26.7px
</style>
