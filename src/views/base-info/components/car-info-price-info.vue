<template>
  <div>
    <el-table :data="priceTableData" border style="width: 100%" :show-header="false">
      <el-table-column v-for="(item,index) in tableLabel" :key="item.id" :prop="item.prop" :label="item.name" align="center">
        <template slot-scope="{row,$index}">
          <el-input v-if="!(row.flag == 0 && $index == 0 && index == 0)" v-model="row.name" />
          <span v-if="index == 0 && $index == 0">类型/车型</span>
          <el-button v-if="row.flag === 0 && row.id === 1" type="text" @click="XAdd">添加</el-button>
          <el-button v-if="row.flag === 0 && row.id != 1" type="text" @click="XDelete">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="xxx" align="center">
        <template slot-scope="{row,$index}">
          <el-button v-if="$index === 0" type="text" @click="YAdd">添加</el-button>
          <el-button v-else type="text" @click="YDelete">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center">
        <template slot-scope="{row}">
          <el-input v-if="row.flag != 0" v-model="row.name" />
          <el-button v-if="row.flag === 0" type="text" @click="XDelete">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="司机" align="center">
        <template slot-scope="{row}">
          <el-input v-if="row.flag != 0" v-model="row.name" />
          <el-button v-if="row.flag === 0" type="text" @click="XDelete">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="电话" align="center">
        <template slot-scope="{row}">
          <el-input v-if="row.flag != 0" v-model="row.name" />
          <el-button v-if="row.flag === 0" type="text" @click="XDelete">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="类型" align="center">
        <template slot-scope="{row}">
          <el-input v-if="row.flag != 0" v-model="row.name" />
          <el-button v-if="row.flag === 0" type="text" @click="XDelete">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="状态" align="center">
        <template slot-scope="{row}">
          <el-input v-if="row.flag != 0" v-model="row.name" />
          <el-button v-if="row.flag === 0" type="text" @click="XDelete">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="备注" align="center">
        <template slot-scope="{row}">
          <el-input v-if="row.flag != 0" v-model="row.name" />
          <el-button v-if="row.flag === 0" type="text" @click="XDelete">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="备注" align="center">
        <template slot-scope="{row,$index}">
          <el-button v-if="$index === 0" type="text" @click="YAdd">添加</el-button>
          <el-button v-else type="text" @click="YDelete">删除</el-button>
        </template>
      </el-table-column> -->
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
      visible: false,
      priceTableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 3,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 4,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '',
          name: '',
          address: '',
          flag: 0
        }
      ],
      tableLabel: [
        {
          id: 0,
          name: '表1',
          prop: ''
        },
        {
          id: 1,
          name: '表2',
          prop: ''
        }
      ]
    }
  },
  computed: {},
  created() {
    this.infoTypeList = this.infoTypeListData()
    this.prorateTypeList = this.prorateTypeListData()
  },
  methods: {
    // 横坐标的添加
    XAdd() {
      alert(11)
    },
    // 横坐标的删除
    XDelete() {
      alert(333)
    },
    // 纵坐标的添加
    YAdd() {
      alert(22)
    },
    // 纵坐标的删除
    YDelete() {
      alert(444)
    },
    dataFormSubmitHandle() {}
  }
}
</script>
