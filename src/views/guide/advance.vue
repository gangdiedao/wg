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
      <el-table-column :label="$t('guide.field.date')" prop="bill_date" width="150px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.guide')" width="140px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.guide.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.groupNumber')" prop="group_code" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.amount')" prop="amount" width="140px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.yuzhihao')" prop="advance_no" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.credentials')" width="140px" align="center">
         <template slot-scope="scope">
            <viewer :images="scope.row.imagesArr">
              <el-avatar v-for="item in scope.row.imagesArr" fit="cover" :key="item.url" shape="square" :src="item.url"></el-avatar>
            </viewer>
          </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.remark')" prop="remark" width="140px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.reviewer')" width="180px" align="center">
        <template slot-scope="{row}">
          <!-- <span>{{ row.author }}</span> -->
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.log')" width="140px" align="center">
        <template slot-scope="{row}">
          <!-- <span>{{ row.author }}</span> -->
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.actions')" fixed="right" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('actions.edit') }}
          </el-button>
          <el-button size="mini" type="success">
            {{ $t('actions.reviewer') }}
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
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

    <edit-advance :show.sync="showEditAdvance" :item="advanceItem" @success="getList"/>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import EditAdvance from './components/edit-advance'
  import mixin from './mixin'
  import { advanceList, setAdvanceStatus } from '@/api/guide'

  export default {
    mixins: [mixin],
    name: 'settlement',
    components: { Pagination, EditAdvance },
    directives: { waves },
    data() {
      return {
        showEditAdvance: false,
        advanceItem: '',
        multipleSelection: [],
        activeName: 'open',
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 10,
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
      getList() {
        this.listLoading = true
        advanceList(this.listQuery).then(res => {
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
        this.advanceItem = ''
        this.showEditAdvance = true
      },
      handleUpdate(row) {
        this.advanceItem = row
        this.showEditAdvance = true
      },
      handleDelete(row, index) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      },
      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        return sums
      }
    }
  }
</script>
