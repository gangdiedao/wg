<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <!-- <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" /> -->
      </el-select>
      <el-input v-model="listQuery.title" :placeholder="$t('other.keyword')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('actions.search') }}
      </el-button>
    </div>
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="12">
        <el-button type="primary" size="mini" @click="handleCreate">{{ $t('actions.create') }}</el-button>
        <el-button type="danger" size="mini" @click="setStatusAll" :disabled="!multipleSelection.length">{{ $t('actions.delete') }}</el-button>
        <el-button size="mini" @click="setStatusAll">{{ $t('actions.export') }}</el-button>
        <el-button size="mini" @click="setStatusAll">{{ $t('actions.import') }}</el-button>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" tabPosition="top">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="list"
            stripe
            border
            fit
            highlight-current-row
            style="width: 100%;"
            @selection-change="handleSelectionChange"
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
                <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.company')" min-width="250px">
              <template slot-scope="{row}">
                <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.price')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.telePhone')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.fax')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.contacts')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.city')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.hotelType')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.hotelLevel')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.address')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.email')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.website')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.payType')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.creator')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.files')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.remarks')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.modifier')" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.actions')" fixed="right" align="center" width="230" class-name="small-padding fixed-width">
              <template slot-scope="{row,$index}">
                <el-button type="primary" size="mini" @click="handleUpdate(row)">
                  {{ $t('i18nView.information.edit') }}
                </el-button>
                <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
                  {{ $t('i18nView.status.publish') }}
                </el-button>
                <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
                  {{ $t('i18nView.status.draft') }}
                </el-button>
                <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
                  {{ $t('i18nView.information.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>

    <el-row type="flex" class="row-bg" justify="end">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-row>

    <edit-hotel :show.sync="showEditHotel"/>

  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import EditHotel from './components/edit-hotel'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import mixin from './mixin'
import { getHotelList } from '@/api/hotel'

export default {
  mixins: [mixin],
  name: 'HotelMange',
  components: { Pagination, EditHotel },
  directives: { waves },
  filters: {},
  data() {
    return {
      tabMapOptions: [],
      multipleSelection: [],
      activeName: 'all',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        status: 'all'
      },
      statusOptions: [],
      showEditHotel: false,
      
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
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
    this.setOptions()
    this.setStatusOptions()
    this.getList()
  },
  methods: {
    setOptions() {
      this.tabMapOptions = this.setCityOptions()
    },
    setStatusOptions() {
      this.statusOptions = [
        { key: 'all', label: this.$t('i18nView.status.all') },
        { key: 'publish', label: this.$t('i18nView.status.publish') },
        { key: 'draft', label: this.$t('i18nView.status.draft') }
      ]
    },
    getList() {
      this.listLoading = true
      getHotelList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.count
      }).finally(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSelectionChange() {
      this.multipleSelection = val;
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
    handleCreate() {
      this.showEditHotel = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    handleUpdate(row) {
      // this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      // this.dialogStatus = 'update'
      this.showEditHotel = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    setStatusAll() {

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
