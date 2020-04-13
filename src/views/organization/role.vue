<template>
  <div class="app-container">
    <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-button type="primary" size="mini" @click="handleAdd">{{ $t('actions.create') }}</el-button>
          <el-button type="danger" :disabled="!multipleSelection.length" size="mini" @click="handleDelete('all')">{{ $t('actions.delete') }}</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-input placeholder="请输入内容" v-model="listQuery.keyword" size="mini" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search">{{ $t('actions.search') }}</el-button>
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
          prop="name"
          :label="$t('organization.roleModules.field.name')">
        </el-table-column>
        <el-table-column
          prop="name_en"
          :label="$t('organization.roleModules.field.nameEn')">
        </el-table-column>
        <el-table-column
          prop="slug"
          :label="$t('organization.roleModules.field.mark')">
        </el-table-column>
        <!-- <el-table-column
          prop="province"
          :label="$t('organization.roleModules.field.remark')">
        </el-table-column> -->
        <el-table-column
          fixed="right"
          :label="$t('organization.roleModules.field.action')">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">{{ $t('actions.edit') }}</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row)">{{ $t('actions.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-row>
      <edit-role :show.sync="showEditRole" :item="roleItem" @success="getList"/>
  </div>
</template>

<script>
import EditRole from './components/edit-role'
import mixin from './mixin'
import Pagination from '@/components/Pagination'
import { getRoleList, deleteRole } from '@/api/organization'
export default {
  name: 'roleManage',
  mixins: [mixin],
  components: {
    Pagination,
    EditRole
  },
  created() {
    this.getList()
  },
  data() {
    return {
      showEditRole: false,
      roleItem: '',
      total: 10,
      listQuery: {
        page: 1,
        limit: 20,
        keyword: ''
      },
      multipleSelection: [],
      tableData: []
    }
  },
  methods: {
    handleAdd() {
      this.showEditRole = true
      this.roleItem = ''
    },
    handleEdit(item) {
      this.roleItem = item
      this.showEditRole = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    search() {
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      getRoleList(this.listQuery).then(res => {
        this.total = res.data.count
        this.tableData = res.data.data
      })
    },
    handleDelete(item) {
      let ids
      if (item === 'all') {
        ids = this.multipleSelection.map(item => item.id)
      } else {
        ids = [item.id]
      }
      this.$confirm('确定要删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole({id: ids}).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      }).catch(() => {})
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