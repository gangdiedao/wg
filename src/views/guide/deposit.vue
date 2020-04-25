<template>
  <div class="app-container">
    <div style="margin-bottom: 15px;">
      <el-select v-model="listQuery.date_type" style="width: 140px" class="filter-item">
        <el-option v-for="item in [{id: 1, label: '支票日期'}, {id: 2, label: '支付日期'}, {id: 3, label: '创建日期'}]" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-date-picker
        v-model="listQuery.date"
        type="daterange"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-input v-model="listQuery.keyword" :placeholder="$t('guide.field.keyword') + $t('actions.search')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('guide.button.search') }}
      </el-button>
    </div>
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="12">
        <el-button type="primary" size="mini" @click="handleCreate">{{ $t('actions.create') }}</el-button>
        <el-button type="danger" size="mini" :disabled="!multipleSelection.length" @click="handleDeleteAll">{{ $t('actions.delete') }}</el-button>
      </el-col>
    </el-row>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      stripe
      border
      fit
      highlight-current-row
      :summary-method="getSummaries"
      :show-summary="false"
      @selection-change="handleSelectionChange"
      style="margin-top:15px;"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
      />
      <el-table-column :label="$t('guide.field.createDate')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.created_at | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.id')" prop="code" align="center" width="120px">
        <template slot-scope="{row}">
          <span>{{ row.guide && row.guide.code }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.guide')" prop="guide_name" width="110px"></el-table-column>
      <el-table-column :label="$t('guide.field.historicalDeposit')" width="110px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.deposit')" width="110px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.totalDeposit')" width="110px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.credentials')" width="110px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.remark')" width="110px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.reviewer')" width="110px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.log')" width="110px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.depositDoc')" width="110px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.actions')" fixed="right" align="center" width="230px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button :disabled="true" size="mini" type="success">
            {{ $t('actions.reviewer') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            {{ $t('actions.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="12">
      </el-col>
      <el-col :span="12">
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-col>
    </el-row>

    <edit-deposit :show.sync="showEditDeposit" @success="getList"/>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import EditDeposit from './components/add-deposit'
  import mixin from './mixin'
  import { depositList, removeDeposit } from '@/api/guide'

  export default {
    mixins: [mixin],
    name: 'deposit',
    components: { Pagination, EditDeposit },
    directives: { waves },
    data() {
      return {
        showEditDeposit: false,
        multipleSelection: [],
        activeName: 'open',
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 10,
          date_type: 3,
        }
      }
    },
    computed: {
      lang: {
        get() {
          return this.$store.state.app.language
        }
      }
    },
    watch: {
      activeName(val) {
        this.$router.push(`${this.$route.path}?tab=${val}`)
      },
      lang() {
        // this.setOptions()
      }
    },
    created() {
      const tab = this.$route.query.tab
      if (tab) {
        this.activeName = tab
      }
      this.getList()
    },
    methods: {
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      getList() {
        this.listLoading = true
        depositList(this.listQuery).then(res => {
          this.total = res.data.count
          this.list = res.data.data
        }).finally(() => {
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleCreate() {
        this.showEditDeposit = true
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDeleteAll() {
        let ids = this.multipleSelection.map(item => item.id)
        this.remove({idArr: ids})
      },
      handleDelete(row) {
        this.remove({idArr: [row.id]})
      },
      remove(params) {
        this.$confirm('确定要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeDeposit(params).then(() => {
            this.$message({
              type: 'success',
              message: 'success!'
            })
            this.getList()
          })
        })
      },
      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        return sums
      }
    }
  }
</script>
