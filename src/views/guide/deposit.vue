<template>
  <div class="app-container">
    <el-row type="flex" class="filter-container">
      <el-select v-model="listQuery.date_type" style="width: 140px" class="filter-item">
        <el-option v-for="item in [{id: 1, label: '支票日期'}, {id: 2, label: '支付日期'}, {id: 3, label: '创建日期'}]" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-date-picker
        v-model="listQuery.date"
        type="daterange"
        align="right"
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
    </el-row>
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="12">
        <el-button type="primary" size="mini" @click="handleCreate">{{ $t('actions.create') }}</el-button>
        <el-button type="danger" size="mini" :disabled="!multipleSelection.length">{{ $t('actions.delete') }}</el-button>
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
      show-summary
      style="margin-top:15px;"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
      />
      <el-table-column :label="$t('guide.field.createDate')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.id')" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.guide')" width="110px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.historicalDeposit')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.deposit')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.totalDeposit')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.credentials')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.remark')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.reviewer')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.log')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.depositDoc')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.actions')" fixed="right" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('actions.edit') }}
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            {{ $t('actions.open') }}
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            {{ $t('actions.close') }}
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
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

    <!-- <edit-guide :show.sync="showEditGuide"/> -->
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  // import EditGuide from './components/edit-guide'
  import mixin from './mixin'
  import { depositList, setDepositStatus } from '@/api/guide'

  export default {
    mixins: [mixin],
    name: 'settlement',
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        showEditGuide: false,
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
        this.showEditGuide = true
      },
      handleUpdate(row) {
        this.showEditGuide = true
      },
      handleDelete(row, index) {
        let listData = {listData: [{id: row.id, status: status}]}
        setDepositStatus(listData).then(() => {
          this.$message({
            type: 'success',
            message: 'success!'
          })
          this.getList()
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
