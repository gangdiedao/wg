<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.op_user_id" style="width: 180px" class="filter-item" @change="handleFilter" placeholder="按排团经理搜索">
        <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id" clearable/>
      </el-select>
      <el-select v-model="listQuery.nationality_id" style="width: 140px" class="filter-item" clearable @change="handleFilter" placeholder="按国籍搜索">
        <el-option v-for="item in nationalityList" :key="item.id" :label="item.value" :value="item.id" />
      </el-select>
      <el-input v-model="listQuery.keyword" :placeholder="$t('guide.field.keyword') + $t('actions.search')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('guide.button.search') }}
      </el-button>
    </div>
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="12">
        <el-button type="primary" size="mini" @click="handleCreate">{{ $t('actions.create') }}</el-button>
        <el-button type="success" @click="setStatusAll(1)" v-if="activeName == 2" :disabled="!multipleSelection.length" size="mini">{{ $t('actions.open') }}</el-button>
        <el-button size="mini" @click="setStatusAll(2)" v-if="activeName == 1" :disabled="!multipleSelection.length">{{ $t('actions.close') }}</el-button>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" style="margin-top:15px;" @tab-click="getList" type="border-card">
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
            :summary-method="getSummaries"
            show-summary
            @selection-change="handleSelectionChange"
            style="width: 100%;"
          >
            <el-table-column
              type="selection"
              align="center"
              width="55"
            />
            <el-table-column :label="$t('guide.field.name')" fixed prop="name" width="150px" align="center">
              <!-- <template slot-scope="{row}">
                <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
              </template> -->
            </el-table-column>
            <el-table-column :label="$t('guide.field.id')" prop="code" align="center" width="80"></el-table-column>
            <el-table-column :label="$t('guide.field.insideId')" prop="inner_code" width="110px"></el-table-column>
            <el-table-column :label="$t('guide.field.arranger')" prop="op_user_name" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('guide.field.idCard')" prop="passport_no" width="180px" align="center"></el-table-column>
            <el-table-column :label="$t('guide.field.nationality')" prop="nationality_name" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('guide.field.guideId')" prop="guide_card_no" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('guide.field.phone')" prop="phone" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('guide.field.email')" prop="email" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('guide.field.wechat')" prop="wechat" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('guide.field.sex')" prop="gender" width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ {1: '男', 2: '女', 3: '其他'}[scope.row.gender]}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('guide.field.birthday')" prop="birthday" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('guide.field.level')" prop="level" width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ {1: '特优', 2: '优秀', 3: '中等', 4: '一般', 5: '差', 6: '实习'}[scope.row.level]}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('guide.field.workStatus')" prop="assign_status" width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ {1: '正常出团', 2: '请假', 3: '离职'}[scope.row.assign_status]}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('guide.field.guideImage')" prop="" width="110px" align="center">
              <template slot-scope="scope">
                <viewer :images="scope.row.imagesArr">
                  <el-avatar v-for="item in scope.row.imagesArr" fit="cover" :key="item.url" shape="square" :src="item.url"></el-avatar>
                </viewer>
              </template>
            </el-table-column>
            <el-table-column :label="$t('guide.field.badRecord')" prop="bad_notes" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('guide.field.passportImage')" prop="" width="110px" align="center">
              <template slot-scope="scope">
                <viewer :images="scope.row.passport_copy_imagesArr">
                  <el-avatar v-for="item in scope.row.passport_copy_imagesArr" fit="cover" :key="item.url" shape="square" :src="item.url"></el-avatar>
                </viewer>
              </template>
            </el-table-column>
            <el-table-column :label="$t('guide.field.remark')" prop="remark" width="110px" align="center"></el-table-column>
            <!-- <el-table-column :label="$t('guide.field.historicalDeposit')" prop="inner_code" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('guide.field.deposit')" prop="inner_code" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('guide.field.totalDeposit')" prop="inner_code" width="110px" align="center"></el-table-column>
            <el-table-column :label="$t('guide.field.log')" prop="inner_code" width="110px" align="center"></el-table-column> -->
            <el-table-column :label="$t('guide.field.actions')" fixed="right" align="center" width="230" class-name="small-padding fixed-width">
              <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="handleUpdate(row)">
                  {{ $t('actions.edit') }}
                </el-button>
                <el-button v-if="row.status!='1'" size="mini" type="success" @click="setStatus(row, 1)">
                  {{ $t('actions.open') }}
                </el-button>
                <el-button v-if="row.status!='2'" size="mini" @click="setStatus(row, 2)">
                  {{ $t('actions.close') }}
                </el-button>
                <!-- <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
                  {{ $t('actions.delete') }}
                </el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>

    <el-row type="flex" class="row-bg" justify="end">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-row>

    <edit-guide :show.sync="showEditGuide" :item="guideItem" @success="getList"/>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import EditGuide from './components/edit-guide'
  import mixin from './mixin'
  import { guideList, setGuideStatus } from '@/api/guide'
  import { getOtherDictList } from '@/api/system'
import { getUserList } from '@/api/organization'

  export default {
    mixins: [mixin],
    name: 'guideList',
    components: { Pagination, EditGuide },
    directives: { waves },
    data() {
      return {
        showEditGuide: false,
        tabMapOptions: [],
        activeName: '1',
        tableKey: 0,
        list: [],
        guideItem: '',
        multipleSelection: [],
        total: 0,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 10,
          op_user_id: undefined,
          nationality_id: undefined,
          keyword: undefined
        },
        nationalityList: [],
        userList: []
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
        this.listQuery.status = val
      },
      lang() {
        this.setOptions()
      }
    },
    created() {
      const tab = this.$route.query.tab
      if (tab) {
        this.activeName = tab
        this.listQuery.status = tab
      }
      this.init()
      this.setOptions()
      this.getList()
    },
    methods: {
      init() {
        this.getNationality()
        this.getUserList()
      },
      getNationality() {
        getOtherDictList({type: 'nationality'}).then(res => {
          this.nationalityList = res.data
        })
      },
      getUserList() {
        getUserList({page: 1, limit: 1000}).then(res => {
          this.userList = res.data.data
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      setOptions() {
        this.tabMapOptions = this.setTabOptions()
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
      handleCreate() {
        this.guideItem = ''
        this.showEditGuide = true
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].clearValidate()
        // })
      },
      handleUpdate(row) {
        this.guideItem = row
        this.showEditGuide = true
      },
      setStatusAll(status) {
        let data = this.multipleSelection.map(item => {
          return {
            id: item.id,
            status: status
          }
        })
        setGuideStatus({listData: data}).then(() => {
          this.$message({
            type: 'success',
            message: 'success!'
          })
          this.getList()
        }).catch(() => {})
      },
      setStatus(row, status) {
        let listData = {listData: [{id: row.id, status: status}]}
        setGuideStatus(listData).then(() => {
          this.$message({
            type: 'success',
            message: 'success!'
          })
          this.getList()
        }).catch(() => {})
      },
      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        // sums[0] = '总价'
        // columns.forEach((column, index) => {
        //   if (index === 0) {
        //     sums[index] = '总价'
        //     return
        //   }
        //   const values = data.map(item => Number(item[column.property]))
        //   if (!values.every(value => isNaN(value))) {
        //     sums[index] = values.reduce((prev, curr) => {
        //       const value = Number(curr)
        //       if (!isNaN(value)) {
        //         return prev + curr
        //       } else {
        //         return prev
        //       }
        //     }, 0)
        //     sums[index] += ' 元'
        //   } else {
        //     sums[index] = 'N/A'
        //   }
        // })
        return sums
      }
    }
  }
</script>
