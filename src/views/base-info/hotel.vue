<template>
  <div class="app-container">
    <div style="margin-bottom: 15px;">
      <small>{{$t('i18nView.information.status')}}</small>
      <el-select v-model="listQuery.status" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key" />
      </el-select>
      <el-input v-model="listQuery.name" clearable :placeholder="$t('other.keyword') + $t('actions.search')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('actions.search') }}
      </el-button>
    </div>
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="12">
        <el-button type="primary" size="mini" @click="handleCreate">{{ $t('actions.create') }}</el-button>
        <el-button type="success" @click="setStatusAll(1)" :disabled="!multipleSelection.length" size="mini">{{ $t('actions.open') }}</el-button>
        <el-button size="mini" @click="setStatusAll(2)" :disabled="!multipleSelection.length">{{ $t('actions.close') }}</el-button>
        <el-button size="mini" :disabled="total < 1" @click="handleExport">{{ $t('actions.export') }}</el-button>
        <!-- <el-button size="mini" @click="setStatusAll">{{ $t('actions.import') }}</el-button> -->
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" tabPosition="left">
      <el-tab-pane v-for="item in cityOptions" :key="item.id" :label="item.value" :name="item.id + ''">
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
          >
            <el-table-column
              type="selection"
              align="center"
              width="55"
            />
            <el-table-column :label="$t('i18nView.information.id')" fixed prop="id" align="center" width="80"></el-table-column>
            <el-table-column :label="$t('i18nView.information.hotelName')" fixed prop="name"  width="180px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.infoType')" prop="info_type_name"  width="140px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.company')" prop="company" min-width="250px"></el-table-column>
            <el-table-column :label="$t('i18nView.information.price')" prop="company" width="140px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.telePhone')" prop="telphone" width="140px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.fax')" prop="fax" width="140px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.contacts')" prop="contact" width="140px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.city')" prop="city_name" width="240px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.hotelType')" prop="hotel_type_name" width="180px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.hotelLevel')" prop="level" width="140px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.address')" prop="address" width="140px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.email')" prop="email" width="140px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.website')" prop="url" width="140px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.payType')" prop="pay_type_name" width="140px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.creator')" prop="created_user_name" width="140px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.files')" width="140px" align="center">
              <template slot-scope="{row}">
                <div v-for="item in row.filesArr" :key="item.url">
                  <a class="link-type" :href="item.url" :download="item.name">{{item.name}}</a>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.remarks')" prop="remark" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.modifier')" prop="updated_user_name" width="110px" align="center"></el-table-column>
            <el-table-column
              prop="status"
              :label="$t('i18nView.information.status')"
              width="80">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">{{scope.row.status === 1 ? $t('actions.open') : $t('actions.close')}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.actions')" fixed="right" align="center" width="160" class-name="small-padding fixed-width">
              <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="handleUpdate(row)">
                  {{ $t('actions.edit') }}
                </el-button>
                <el-button v-if="row.status == 2" size="mini" type="success" @click="setStatus(row, 1)">
                  {{ $t('actions.open') }}
                </el-button>
                <el-button v-if="row.status == 1" size="mini" @click="setStatus(row, 2)">
                  {{ $t('actions.close') }}
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

    <edit-hotel :show.sync="showEditHotel" :item="hotelItem" @success="getList"/>

  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import EditHotel from './components/edit-hotel'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import mixin from './mixin'
import { getHotelList, setStatus } from '@/api/hotel'
import { mapGetters } from 'vuex'

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
      hotelItem: '',
      activeName: '',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        city_id: undefined,
        status: 1,
        name: ''
      },
      showEditHotel: false,
      
      downloadLoading: false
    }
  },
  computed: {
    ...mapGetters(['cityList']),
    cityOptions: {
      get() {
        return [{id: '', value: 'All/全部'}, ...this.cityList]
      }
    },
    lang: {
      get() {
        return this.$store.state.app.language
      }
    }
  },
  watch: {
    activeName(val) {
      if (val !== '0') {
        this.$router.push(`${this.$route.path}?cityid=${val}`)
        this.listQuery.city_id = val * 1
      } else {
        this.$router.push(`${this.$route.path}`)
        this.listQuery.city_id = ''
      }
      this.getList(1)
    },
    lang() {
      this.setOptions()
    }
  },
  created() {
    const cityid = this.$route.query.cityid
    if (cityid) {
      this.activeName = cityid
      this.listQuery.city_id = cityid * 1
    }
    this.setOptions()
    // this.setStatusOptions()
    this.getCityList()
    this.getList()
  },
  methods: {
    getCityList() {
      // if (!this.cityList.length) {
      //   this.$store.dispatch('system/getCity')
      // }
      this.$store.dispatch('system/getCity')
    },
    setOptions() {
      // this.tabMapOptions = this.setCityOptions()
      this.getStatus()
    },
    getList(page) {
      if (/\d+/.test(page)) {
        this.listQuery.page = page
      }
      this.listLoading = true
      getHotelList(this.listQuery).then(response => {
        this.total = response.data.count
        this.list = response.data.data
      }).finally(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      this.hotelItem = ''
      this.showEditHotel = true
    },
    handleUpdate(row) {
      this.hotelItem = row
      this.showEditHotel = true
    },
    setStatusAll(status) {
      let data = this.multipleSelection.map(item => {
        return {
          id: item.id,
          status: status
        }
      })
      this.updateStatus({listData: data})
    },
    setStatus(row, status) {
      this.updateStatus({listData: [{id: row.id, status: status}]})
    },
    updateStatus(params) {
      setStatus(params).then(() => {
        this.$message({
          type: 'success',
          message: 'success!'
        })
        this.getList()
      })
    },
    handleExport() {
      location.href = `${process.env.VUE_APP_BASE_API}/admin/factordata/hotel/down?status=${this.listQuery.status}&city_id=${this.listQuery.city_id}`
    }
    // handleDownload() {
    //   this.downloadLoading = true
    //   import('@/vendor/Export2Excel').then(excel => {
    //     const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
    //     const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
    //     const data = this.formatJson(filterVal)
    //     excel.export_json_to_excel({
    //       header: tHeader,
    //       data,
    //       filename: 'table-list'
    //     })
    //     this.downloadLoading = false
    //   })
    // },
    // formatJson(filterVal) {
    //   return this.list.map(v => filterVal.map(j => {
    //     if (j === 'timestamp') {
    //       return parseTime(v[j])
    //     } else {
    //       return v[j]
    //     }
    //   }))
    // },
    // getSortClass: function(key) {
    //   const sort = this.listQuery.sort
    //   return sort === `+${key}` ? 'ascending' : 'descending'
    // }
  }
}
</script>
