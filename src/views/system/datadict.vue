<template>
  <div class="app-container">
    <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-button type="primary" size="mini" @click="handleAdd">添加</el-button>
          <el-button type="success" @click="handleChangeStatus(1)" :disabled="!multipleSelection.length" size="mini">开启</el-button>
          <el-button size="mini" @click="handleChangeStatus(2)" :disabled="!multipleSelection.length">关闭</el-button>
          <!-- <el-button type="danger" size="mini">删除</el-button> -->
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-input placeholder="请输入内容" size="mini" class="input-with-select">
            <el-button slot="append" icon="el-icon-search">搜索</el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        :data="dictList"
        border
        @selection-change="handleSelectionChange"
        :loading="loading"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="key"
          label="键">
        </el-table-column>
        <el-table-column
          prop="value"
          label="数据">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.status === 1 ? '开启' : '关闭'}}</span>
            </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <!-- <el-button type="text" size="small" @click="handleDelete(scope.row, scope.index)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-row>
      <edit-datadict :show.sync="showEditDatadict" :item="item" @success="getList"/>
  </div>
</template>

<script>
import EditDatadict from './components/edit-datadict'
import mixin from './mixin'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { changeStatus } from '@/api/system'
export default {
  name: 'roleManage',
  mixins: [mixin],
  components: {
    Pagination,
    EditDatadict
  },
  created() {
    this.getList()
  },
  data() {
    return {
      loading: false,
      showEditDatadict: false,
      item: '',
      total: 10,
      listQuery: {
        page: 1,
        limit: 10
      },
      multipleSelection: []
    }
  },
  computed: {
    ...mapGetters(['dictList'])
  },
  methods: {
    getList() {
      this.loading = true
      this.$store.dispatch('system/getDictList', this.listQuery).then(res => {
        this.total = res.data.count
      }).finally(() => {
        this.loading = false
      })
    },
    handleAdd() {
      this.item = ''
      this.showEditDatadict = true
    },
    handleEdit(item) {
      this.item = item
      this.showEditDatadict = true
    },
    handleDelete(item, index) {
      this.$confirm('确定要删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getList()
      }).catch(() => {})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleChangeStatus(type) {
      let ids = this.multipleSelection.map(item => item.id)
      changeStatus({id: ids, status: type}).then(() => {
        this.getList()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    }
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