<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.sort" class="filter-item" :placeholder="'请选择'+$t('i18nView.information.shop')" @change="handleFilter">
        <el-option v-for="item in infoTypeList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-input v-model="listQuery.title" :placeholder="'请输入'+$t('i18nView.information.keyword')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('i18nView.information.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreateUpdate()">
        {{ $t('i18nView.information.add') }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        {{ $t('i18nView.information.export') }}
      </el-button>
      <el-button class="filter-item" type="danger" icon="el-icon-lock" @click="handleLock">
        {{ $t('i18nView.information.lock') }}
      </el-button>
      <el-button class="filter-item" type="success" icon="el-icon-unlock" @click="handleUnLock">
        {{ $t('i18nView.information.unLock') }}
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      stripe
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
      />
      <el-table-column :label="$t('i18nView.information.id')" type="index" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <!-- <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template> -->
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.name')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.shop')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.shop.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.shopspot')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.shop_point.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.companyRoyalty')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.companyrate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.tourGuideRoyalty')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.guiderate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.leaderRoyalty')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.leaderrate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.companySecondRoyalty')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.companyrate2 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.calculationType')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.money_type }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.showType')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.show_type }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.commissionType')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.modifier')" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.updated_user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.actions')" fixed="right" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleCreateUpdate(row)">
            {{ $t('i18nView.information.edit') }}
          </el-button>
          <!-- <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
                  {{ $t('i18nView.information.delete') }}
                </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <commissionAddOrUpdate ref="commissionAddOrUpdate" @callBcak="callBcak" />
  </div>
</template>

<script>
import { fetchList } from '@/api/commission'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import commissionAddOrUpdate from './components/commission-add-or-update' // secondary package based on el-pagination
import mixin from './mixin'

export default {
  name: 'HotelMange',
  components: { Pagination, commissionAddOrUpdate },
  directives: { waves },
  filters: {},
  mixins: [mixin],
  data() {
    return {
      tabMapOptions: [],
      activeName: 'all',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        start_date: '',
        end_date: '',
        orderByColumn: 'updated_at',
        orderByDirection: 'desc',
        foundation_shop_id: '',
        foundation_shop_point_id: '',
        name: '',
        status: 1, // 状态 1:激活 2：锁定
        money_type: '',
        companyrate: '',
        guiderate: '',
        leaderrate: '',
        companyrate2: '',
        show_type: '',
        type: ''
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      infoTypeList: [], // 信息类型
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getList()
  },
  methods: {
    callBcak(e) {
      if (e === 'add') {
        this.listQuery.page = 1
        this.getList()
      } else {
        this.getList()
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.count

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 锁定
    handleLock() {},
    // 激活
    handleUnLock() {},
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    // 新增、编辑
    handleCreateUpdate(item) {
      this.$refs.commissionAddOrUpdate.init(item ? JSON.parse(JSON.stringify(item)) : item)
    },
    // 删除
    // handleDelete(row, index) {
    //   this.$confirm('确定要删除该数据?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功!'
    //     })
    //     this.list.splice(index, 1)
    //   }).catch(() => {})
    // },
    // 导出
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
