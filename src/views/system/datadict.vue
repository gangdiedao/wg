<template>
  <div class="app-container">
    <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-button type="primary" size="mini" @click="handleAdd">{{ $t('actions.create') }}</el-button>
          <el-button type="success" @click="handleChangeStatus(1)" :disabled="!multipleSelection.length" size="mini">{{ $t('actions.open') }}</el-button>
          <el-button size="mini" @click="handleChangeStatus(2)" :disabled="!multipleSelection.length">{{ $t('actions.close') }}</el-button>
          <!-- <el-button type="danger" size="mini">删除</el-button> -->
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-select v-model="listQuery.type" clearable size="mini" @change="getList(1)" placeholder="请选择类型">
            <el-option
              v-for="(value, name) in dictTypeList"
              :key="name"
              :label="value"
              :value="name">
            </el-option>
          </el-select>
          <el-input placeholder="请输入内容" size="mini" v-model="listQuery.keyword" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search">{{ $t('actions.search') }}</el-button>
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
          :label="$t('system.field.type')">
          <template slot-scope="scope">
            <span>{{dictTypeList[scope.row.type]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="key"
          :label="$t('system.field.key')">
        </el-table-column>
        <el-table-column
          prop="value"
          :label="$t('system.field.value')">
        </el-table-column>
        <el-table-column
          prop="status"
          :label="$t('system.field.status')">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">{{scope.row.status === 1 ? $t('actions.open') : $t('actions.close')}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          :label="$t('system.field.action')">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)" size="small">{{ $t('actions.edit') }}</el-button>
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
    if (this.dictTypeList.length < 1) {
      this.$store.dispatch('system/getDictTypeList')
    }
    this.getList()
  },
  data() {
    return {
      loading: false,
      showEditDatadict: false,
      item: '',
      total: 10,
      listQuery: {
        type: undefined,
        page: 1,
        limit: 10,
        keyword: undefined
      },
      multipleSelection: []
    }
  },
  computed: {
    ...mapGetters(['dictList', 'dictTypeList'])
  },
  methods: {
    search() {
      this.listQuery.page = 1
      this.getList()
    },
    getList(page) {
      if (/\d+/.test(page)) {
        this.listQuery.page = page
      }
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