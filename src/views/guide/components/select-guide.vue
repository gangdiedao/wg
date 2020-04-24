<template>
  <el-dialog append-to-body title="选择导游" :visible.sync="dialogTableVisible" width="760px">
    <div class="filter-container">
      <el-select v-model="listQuery.op_user_id" style="width: 180px" class="filter-item" @change="handleFilter" placeholder="按排团经理搜索">
        <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id" clearable/>
      </el-select>
      <el-input v-model="listQuery.keyword" :placeholder="$t('other.keyword') + $t('actions.search')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('actions.search') }}
      </el-button>
    </div>
    <el-table v-loading="listLoading" stripe :data="list" @row-click="handleClick">
      <el-table-column property="name" :label="$t('guide.field.name')" width="150"></el-table-column>
      <el-table-column property="op_user_name" :label="$t('guide.field.arranger')" width="150"></el-table-column>
      <el-table-column property="gender" :label="$t('guide.field.sex')" width="120">
        <template slot-scope="scope">
          <span>{{ {1: '男', 2: '女', 3: '其他'}[scope.row.gender]}}</span>
        </template>
      </el-table-column>
      <el-table-column property="level" :label="$t('guide.field.level')" width="120">
        <template slot-scope="scope">
          <span>{{ {1: '特优', 2: '优秀', 3: '中等', 4: '一般', 5: '差', 6: '实习'}[scope.row.level]}}</span>
        </template>
      </el-table-column>
      <el-table-column property="assign_status" :label="$t('guide.field.workStatus')" width="150">
        <template slot-scope="scope">
          <span>{{ {1: '正常出团', 2: '请假', 3: '离职'}[scope.row.assign_status]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" class="row-bg" justify="end">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-row>
</el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { guideList } from '@/api/guide'
import { getUserList } from '@/api/organization'
import mixin from '../mixin'
export default {
  components: {
    Pagination
  },
  mixins: [mixin],
  props: {
    show: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    dialogTableVisible(bool) {
      if (!bool) {
        this.$emit('update:show', false)
      }
    },
    show(bool) {
      this.dialogTableVisible = bool
    }
  },
  data() {
    return {
      dialogTableVisible: this.show,
      listLoading: false,
      total: 0,
      list: [],
      userList: [],
      listQuery: {
        page: 1,
        limit: 10,
        status: 1,
        op_user_id: undefined,
        keyword: ''
      }
    }
  },
  created() {
    this.getUserList()
    this.getList()
  },
  methods: {
    getUserList() {
      getUserList({page: 1, limit: 1000}).then(res => {
        this.userList = res.data.data
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      guideList(this.listQuery).then(res => {
        this.total = res.data.count
        this.list = res.data.data
      }).finally(() => {
        this.listLoading = false
      })
    },
    handleClick(row) {
      this.$emit('row-click', row)
      this.dialogTableVisible = false
    }
  }
}
</script>

<style>

</style>