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
        <el-button type="primary" size="mini" @click="handleCreateUpdate('')">{{ $t('actions.create') }}</el-button>
        <el-button type="success" @click="setStatusAll(1)" :disabled="!multipleSelection.length" size="mini">{{ $t('actions.open') }}</el-button>
        <el-button size="mini" @click="setStatusAll(2)" :disabled="!multipleSelection.length">{{ $t('actions.close') }}</el-button>
        <el-button size="mini" @click="setStatusAll" :disabled="total < 1">{{ $t('actions.export') }}</el-button>
        <el-button size="mini" @click="setStatusAll">{{ $t('actions.import') }}</el-button>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <!-- <tab-pane v-if="activeName==item" :type="item" /> -->
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
            <el-table-column :label="$t('i18nView.information.id')" fixed type="index" sortable="custom" align="center" prop="id" width="60"></el-table-column>
            <el-table-column :label="$t('i18nView.information.name')" fixed prop="name" width="150px" align="center"></el-table-column>
            <!-- <el-table-column :label="$t('i18nView.information.infoType')" prop="" width="110px" align="center"></el-table-column> -->
            <el-table-column :label="$t('i18nView.information.pic')" width="110px" align="center">
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
            <el-table-column :label="$t('i18nView.information.website')" prop="url" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.company')" prop="company" min-width="250px"></el-table-column>
            <el-table-column :label="$t('i18nView.information.city')" prop="city_name" width="240px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.address')" prop="address" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.contacts')" prop="contact" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.telePhone')" prop="telphone" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.fax')" prop="fax" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.email')" prop="email" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.price')" prop="" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.valuationMethod')" prop="money_type_name" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.payType')" prop="pay_type_name" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.files')" width="110px" align="center">
              <template slot-scope="{row}">
                <div v-for="item in row.filesArr" :key="item.url">
                  <a class="link-type" :href="item.url" :download="item.name">{{item.name}}</a>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.remarks')" prop="remark" width="110px" align="center"></el-table-column>
            <el-table-column
              prop="status"
              :label="$t('i18nView.information.status')"
              width="80">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">{{scope.row.status === 1 ? $t('actions.open') : $t('actions.close')}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('i18nView.information.creator')" prop="created_user_name" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.modifier')" prop="updated_user_name" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('i18nView.information.actions')" fixed="right" align="center" width="160px" class-name="small-padding fixed-width">
              <template slot-scope="{row,$index}">
                <el-button type="primary" size="mini" @click="handleCreateUpdate(row)">
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
    <restaurantAddOrUpdate :show.sync="showEditScenic" :item="scenicItem" @success="getList" />
  </div>
</template>

<script>
import mixin from './mixin'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import restaurantAddOrUpdate from './components/restaurant-add-or-update'
import { getDiningList, setStatus } from '@/api/dining'

export default {
  mixins: [mixin],
  name: 'HotelMange',
  components: { Pagination, restaurantAddOrUpdate },
  directives: { waves },
  filters: {},
  data() {
    return {
      showEditScenic: false,
      scenicItem: '',
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
      },
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
    this.getList()
  },
  methods: {
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
      getDiningList(this.listQuery).then(response => {
        this.total = response.data.count
        this.list = response.data.data
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    // 新增、编辑
    handleCreateUpdate(item) {
      this.scenicItem = item
      this.showEditScenic = true
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
  }
}
</script>
