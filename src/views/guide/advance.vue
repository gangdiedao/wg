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
        @change="handleFilter"
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
        <el-button type="danger" size="mini" @click="setStatusAll" :disabled="!multipleSelection.length">{{ $t('actions.delete') }}</el-button>
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
      <el-table-column :label="$t('guide.field.date')" prop="bill_date" width="150px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.guide')" width="140px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.guide && row.guide.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.groupNumber')" prop="group_code" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.amount')" prop="amount" width="140px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.yuzhihao')" prop="advance_no" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.credentials')" width="140px" align="center">
        <template slot-scope="scope">
          <viewer :images="scope.row.imagesArr">
            <el-row type="flex" style="overflow-x: auto;">
              <div v-for="item in scope.row.imagesArr" :key="item.url" style="margin-right: 10px;width: 80px;" >
                <el-avatar fit="cover"  shape="square" :src="item.url"></el-avatar>
              </div>
            </el-row>
          </viewer>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.remark')" prop="remark" width="140px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.reviewer')" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.log')" width="140px" align="center"></el-table-column>
      <el-table-column :label="$t('guide.field.actions')" fixed="right" align="center" width="230px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('actions.edit') }}
          </el-button>
          <el-button :disabled="true" size="mini" type="success">
            {{ $t('actions.reviewer') }}
          </el-button>
          <el-button size="mini" type="danger" @click="setStatus(row)">
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
          keyword: '',
          date_type: 3
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
      setStatusAll() {
        let data = this.multipleSelection.map(item => {
          return {
            id: item.id,
            is_delete: 2
          }
        })
        this.updateStatus({listData: data})
      },
      setStatus(row) {
        this.updateStatus({listData: [{id: row.id, is_delete: 2}]})
      },
      updateStatus(params) {
        this.$confirm('确定要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setAdvanceStatus(params).then(() => {
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
