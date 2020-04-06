<template>
  <div class="app-container">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="12">
        <el-button type="primary" size="mini" @click="handleAddMenu">添加</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="date"
        label="部门名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="部门英文名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="上级部门"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="排序">
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
    <edit-department :show.sync="showEditDepartment" :item="deptItem"/>
  </div>
</template>

<script>
import EditDepartment from './components/edit-department'
import mixin from './mixin'
export default {
  mixins: [mixin],
  name: 'menuManage',
  components: {
    EditDepartment
  },
  data() {
    return {
      showEditDepartment: false,
      deptItem: '',
      tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableData1: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          hasChildren: true
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  methods: {
    handleAddMenu() {
      this.showEditDepartment = true
    }
  }
}
</script>

<style>
  .row-bg {
    margin: 10px 0;
  }
</style>