<template>
  <div class="app-container">
    <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-button type="primary" size="mini" @click="handleAdd">{{ $t('actions.create') }}</el-button>
          <el-button type="danger" size="mini" :disabled="!multipleSelection.length" @click="handleDelete">{{ $t('actions.delete') }}</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-input placeholder="请输入内容" size="mini" v-model="listQuery.keyword" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search">{{ $t('actions.search') }}</el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        :data="list"
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
          prop="key"
          :label="$t('system.field.tag')">
        </el-table-column>
        <el-table-column
          prop="cn"
          :label="$t('system.field.cn')">
        </el-table-column>
        <el-table-column
          prop="en"
          :label="$t('system.field.en')">
        </el-table-column>
        <el-table-column
          prop="th"
          :label="$t('system.field.th')">
        </el-table-column>
        <el-table-column
          fixed="right"
          :label="$t('system.field.action')">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)" size="small">{{ $t('actions.edit') }}</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-row>
      <edit-lang :show.sync="showEditLang" :item="item" @success="getList"/>
  </div>
</template>

<script>
import EditLang from './components/edit-lang'
import mixin from './mixin'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { langList, deleteLang } from '@/api/system'
export default {
  name: 'roleManage',
  mixins: [mixin],
  components: {
    Pagination,
    EditLang
  },
  created() {
    this.getList()
  },
  data() {
    return {
      loading: false,
      showEditLang: false,
      item: '',
      total: 20,
      list: [],
      listQuery: {
        type: undefined,
        page: 1,
        limit: 10,
        keyword: undefined
      },
      multipleSelection: []
    }
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
      langList(this.listQuery).then(res => {
        this.total = res.data.count
        this.list = res.data.data
      }).finally(() => {
        this.loading = false
      })
    },
    handleAdd() {
      this.item = ''
      this.showEditLang = true
    },
    handleEdit(item) {
      this.item = item
      this.showEditLang = true
    },
    handleDelete(item) {
      let ids
      if (item.id) {
        ids = [item.id]
      } else {
        ids = this.multipleSelection(item => item.id)
      }
      this.$confirm('确定要删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteLang({id: ids}).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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