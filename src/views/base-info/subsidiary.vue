<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.sort" class="filter-item" :placeholder="'请选择'+$t('i18nView.information.infoType')" @change="handleFilter">
        <el-option v-for="item in infoTypeList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-input v-model="listQuery.title" :placeholder="'请输入'+$t('i18nView.information.keyword')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('i18nView.information.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreateUpdate">
        {{ $t('i18nView.information.add') }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        {{ $t('i18nView.information.export') }}
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
      <el-table-column :label="$t('i18nView.information.id')" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.name')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.englishName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.enname }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.fullName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fullname }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.key')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.namekey }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.companyManager')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.manager }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.operationsManager')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.op_manager }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.charger')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.principal }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.telePhone')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.fax')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fax }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.groupNumberPrefix')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.preffix }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.businessLicenseNo')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.licenceno }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('i18nView.information.companyAddress')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
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
    <subsidiaryAddOrUpdate ref="subsidiaryAddOrUpdate" @callBcak="callBcak" />
  </div>
</template>

<script>
import { fetchList } from '@/api/subsidiary'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import subsidiaryAddOrUpdate from './components/subsidiary-add-or-update' // secondary package based on el-pagination
import mixin from './mixin'

export default {
  name: 'HotelMange',
  components: { Pagination, subsidiaryAddOrUpdate },
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
        name: '',
        namekey: '',
        fullname: '',
        enname: '',
        type: 1,
        status: 1,
        tel: '',
        preffix: '',
        manager_user_id: '',
        manager: '',
        op_manager_user_id: '',
        op_manager: '',
        principal: '',
        licenceno: '',
        fax: '',
        address: '',
        remark: ''
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
      this.setOptions()
    }
  },
  created() {
    this.infoTypeList = this.infoTypeListData()
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
    this.setOptions()
    this.getList()
  },
  methods: {
    callBcak(e) {
      console.log(e)
      this.getList()
    },
    setOptions() {
      this.tabMapOptions = [
        { key: 'all', label: this.$t('i18nView.areas.all') },
        { key: 'bangkok', label: this.$t('i18nView.areas.bangkok') },
        { key: 'pattaya', label: this.$t('i18nView.areas.pattaya') },
        { key: 'samed', label: this.$t('i18nView.areas.samed') },
        { key: 'rayong', label: this.$t('i18nView.areas.rayong') },
        { key: 'ayutthaya', label: this.$t('i18nView.areas.ayutthaya') },
        { key: 'huahin', label: this.$t('i18nView.areas.huahin') },
        { key: 'kanchanaburi', label: this.$t('i18nView.areas.kanchanaburi') },
        { key: 'samui', label: this.$t('i18nView.areas.samui') },
        { key: 'surat', label: this.$t('i18nView.areas.surat') },
        { key: 'kohchang', label: this.$t('i18nView.areas.kohchang') }
      ]
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
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
      this.$refs.subsidiaryAddOrUpdate.init(item ? JSON.parse(JSON.stringify(item)) : item)
    },
    // 删除
    handleDelete(row, index) {
      this.$confirm('确定要删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.list.splice(index, 1)
      }).catch(() => {})
    },
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
