<template>
  <div>
    <el-table :data="priceinfo" border style="width: 100%" :show-header="false">
      <el-table-column v-for="(item,index) in types" :key="index" :prop="item.prop" :label="item.name" align="center">
        <template slot-scope="{row,$index}">
          <span v-if="index == 0 && $index == 0">类型/车型</span>
          <el-button v-else-if="row.flag === 0 && index == 0" type="text" @click="XAdd">+添加</el-button>
          <el-button v-else-if="row.flag === 0 && index != 0" type="text" @click="XDelete(index)">-删除</el-button>
          <el-input v-else-if="index == 0" v-model="row.name" />
          <el-input v-else-if="$index == 0" v-model="item.name" />
          <el-input v-else v-model="data[$index-1][item.col-1]['value']" :value="item.col-1" />
        </template>
      </el-table-column>
      <el-table-column prop="date" label="xxx" align="center">
        <template slot-scope="{row,$index}">
          <el-button v-if="$index === 0" type="text" @click="YAdd">+添加</el-button>
          <el-button v-else-if="$index === priceinfo.length-1" type="text" @click="clearAll">-清空</el-button>
          <el-button v-else type="text" @click="YDelete(index)">-删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import mixin from '../mixin'

export default {
  mixins: [mixin],
  props: {
    types: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    price_info: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      datas: this.data,
      typess: this.types,
      visible: false,
      nameArr: '新车型',
      x: 0,
      y: 0,
      priceinfo: this.price_info
    }
  },
  computed: {},
  created() {},
  methods: {
    // 横坐标的添加
    XAdd() {
      this.y += 1
      const _arr = []
      for (let i = 0; i < this.x; i++) {
        _arr.push({ value: '' })
      }
      this.datas.push(_arr)
      var obj = { ...this.priceinfo[0], ...{ id: this.priceinfo.length - 1, name: '新类型' }}
      this.priceinfo.splice(this.priceinfo.length - 1, 0, obj)
      this.priceinfo = JSON.parse(JSON.stringify(this.priceinfo))
      this.$emit('refreshDataList', this.typess, this.datas, this.priceinfo)
    },
    // 横坐标的删除
    XDelete(e) {
      this.datas.map(item => {
        item.splice(e, 1)
      })
      this.typess.splice(e, 1)
      console.log(this.datas)
      console.log(this.typess)
      console.log(this.priceinfo)
    },
    // 纵坐标的添加
    YAdd() {
      this.x += 1
      this.datas.forEach(item => {
        item.push({ value: '' })
      })
      this.typess.push({ id: this.typess.length, name: '新车型', prop: '', col: this.x })
      this.$emit('refreshDataList', this.typess, this.datas, this.priceinfo)
    },
    // 纵坐标的删除
    YDelete(i) {
      this.priceinfo.splice(i, 1)
    },
    // 清空
    clearAll() {
      this.priceinfo = [
        {
          id: 1,
          name: '新类型'
        },
        {
          id: 999,
          name: '占位',
          flag: 0
        }
      ]
      this.typess = [
        {
          id: 0,
          name: '新车型',
          prop: ''
        }
      ]
    }
  }
}
</script>
