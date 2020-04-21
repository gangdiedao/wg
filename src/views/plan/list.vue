<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.op_user_id" style="width: 180px" class="filter-item" @change="handleFilter" placeholder="按排团经理搜索">
        <el-option v-for="item in []" :key="item.id" :label="item.name" :value="item.id" clearable/>
      </el-select>
      <el-input v-model="listQuery.keyword" :placeholder="$t('other.keyword') + $t('actions.search')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-checkbox v-model="checked">仅显示我的</el-checkbox>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('actions.search') }}
      </el-button>
    </div>
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="12">
        <el-button type="primary" size="mini" @click="handleCreate">{{ $t('plan.action.create') }}</el-button>
        <el-dropdown>
          <el-button size="mini" type="warning">
            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="success" :disabled="!multipleSelection.length" size="mini">{{ $t('actions.open') }}</el-button>
        <el-button size="mini" :disabled="!multipleSelection.length">{{ $t('actions.close') }}</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      @selection-change="handleSelectionChange"
      style="margin-top:15px;">
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="name"
        :label="$t('plan.field.name')">
      </el-table-column>
      <el-table-column
        fixed
        prop="name"
        :label="$t('plan.field.name')">
      </el-table-column>
      <el-table-column
        fixed
        prop="name"
        :label="$t('plan.field.name')">
      </el-table-column>
      <el-table-column
        fixed="right"
        :label="$t('plan.field.action')">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">{{ $t('actions.edit') }}</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">{{ $t('actions.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-row>
    <edit-plan :show.sync="showEditPlan" :item="planItem" @success="getList"/>
  </div>
</template>

<script>
import EditPlan from './components/edit-plan'
import mixin from './mixin'
import Pagination from '@/components/Pagination'
// import { getRoleList, deleteRole } from '@/api/organization'
export default {
  name: 'planList',
  mixins: [mixin],
  components: {
    Pagination,
    EditPlan
  },
  created() {
    this.getList()
  },
  data() {
    return {
      showEditPlan: false,
      planItem: '',
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
    handleFilter() {

    },
    handleCreate() {
      this.showEditPlan = true
      this.planItem = ''
    },
    handleEdit(item) {
      this.planItem = item
      this.showEditPlan = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    search() {
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      // getRoleList(this.listQuery).then(res => {
      //   this.total = res.data.count
      //   this.tableData = res.data.data
      // })
    }
  }
}
</script>

<style></style>