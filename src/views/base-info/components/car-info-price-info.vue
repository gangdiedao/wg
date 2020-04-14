<template>
  <div>
    <el-table :data="priceTableData" border style="width: 100%" :show-header="false">
      <el-table-column v-for="(item,index) in tableLabel" :key="index" :prop="item.prop" :label="item.name" align="center">
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
          <el-button v-else-if="$index === priceTableData.length-1" type="text" @click="clearAll">-清空</el-button>
          <el-button v-else type="text" @click="YDelete($index)">-删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('i18nView.information.cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('i18nView.information.save') }}</el-button>
    </template>
  </div>
</template>

<script>
import mixin from '../mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      data: [],
      visible: false,
      nameArr: '新车型',
      x: 0,
      y: 0,
      priceTableData: [
        {
          id: 0,
          num: 0,
          name: '新类型'
        },
        {
          id: 999,
          num: 0,
          name: '占位',
          flag: 0
        }
      ],
      tableLabel: [
        {
          id: 0,
          name: '新车型',
          prop: ''
        }
      ]
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
        // _arr.push({value: `${this.y}-${this.x}`})
        _arr.push({ value: '' })
      }
      this.data.push(_arr)
      var obj = { ...this.priceTableData[0], ...{ id: this.priceTableData.length - 1, name: '新类型' }}
      this.priceTableData.splice(this.priceTableData.length - 1, 0, obj)
      this.priceTableData = JSON.parse(JSON.stringify(this.priceTableData))
      // console.log(this.priceTableData)
      // console.log(this.tableLabel)
      console.log(this.data)
    },
    // 横坐标的删除
    XDelete() {
      alert(333)
    },
    // 纵坐标的添加
    YAdd() {
      this.x += 1
      this.data.forEach(item => {
        // item.push({value: `${this.y}-${this.x}`})
        item.push({ value: '' })
      })
      this.priceTableData.map((item, index) => {
        item.num = item.num + 1
        item['name' + item.num] = '新类型'
      })
      this.priceTableData = JSON.parse(JSON.stringify(this.priceTableData))
      this.tableLabel.push({ id: this.tableLabel.length, name: '新车型', prop: '', col: this.x })
      // console.log(this.priceTableData)
      // console.log(this.tableLabel)
      console.log(this.data)
    },
    // 纵坐标的删除
    YDelete(i) {
      console.log(i)
      this.priceTableData.splice(i, 1)
    },
    // 清空
    clearAll() {
      this.priceTableData = [
        {
          id: 1,
          name: '新类型'
        },
        {
          name: '占位',
          flag: 0
        }
      ]
      this.tableLabel = [
        {
          id: 0,
          name: '新车型',
          prop: ''
        }
      ]
    },
    dataFormSubmitHandle() {}
  }
}
</script>
