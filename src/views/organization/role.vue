<template>
  <div class="app-container">
    <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-button type="primary" size="mini">添加</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-input placeholder="请输入内容" size="mini" class="input-with-select">
            <el-button slot="append" icon="el-icon-search">搜索</el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="date"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="标识">
        </el-table-column>
        <el-table-column
          prop="province"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="city"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="更新时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'roleManage',
  components: {
    Pagination
  },
  data() {
    return {
      total: 10,
      listQuery: {
        page: 1,
        limit: 20
      },
      multipleSelection: [],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getList() {

    },
  }
}
</script>

<style>
  .row-bg {
    margin: 10px 0;
  }
  .input-with-select {
    width: 350px;
  }
</style>