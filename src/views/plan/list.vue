<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.op_user_id" style="width: 180px" class="filter-item" @change="handleFilter" placeholder="按排团经理搜索">
        <el-option v-for="item in []" :key="item.id" :label="item.name" :value="item.id" clearable/>
      </el-select>
      <el-input v-model="listQuery.keyword" :placeholder="$t('other.keyword') + $t('actions.search')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-checkbox v-model="listQuery.ismy">仅显示我的</el-checkbox>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('actions.search') }}
      </el-button>
    </div>
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="12">
        <el-button type="primary" size="mini" @click="handleCreate">{{ $t('plan.action.create') }}</el-button>
        <el-dropdown>
          <el-button size="mini" type="warning">
            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="success" :disabled="!multipleSelection.length" size="mini">{{ $t('actions.open') }}</el-button>
        <el-button size="mini" :disabled="!multipleSelection.length">{{ $t('actions.close') }}</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      @selection-change="handleSelectionChange"
      style="margin-top:15px;">
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="code"
        width="180"
        :label="$t('plan.field.code')">
      </el-table-column>
      <el-table-column
        prop="type"
        width="180"
        :label="$t('plan.field.zhutuan')">
        <template slot-scope="{row}">
          <span>{{{1: '单团', 2: '主团', 3: '子团'}[row.type]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.zituan')">
      </el-table-column>
      <el-table-column
        prop="company_name"
        width="140"
        :label="$t('plan.field.jiafang')">
      </el-table-column>
      <el-table-column
        prop="code_a"
        width="140"
        :label="$t('plan.field.jiafangCode')">
      </el-table-column>
      <el-table-column
        prop="foundation_prodcut_name"
        width="140"
        :label="$t('plan.field.product')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.productType')">
      </el-table-column>
      <el-table-column
        prop="cal_people_num"
        width="140"
        :label="$t('plan.field.number')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.room')">
      </el-table-column>
      <el-table-column
        prop="plan_day"
        width="140"
        :label="$t('plan.field.days')">
      </el-table-column>
      <el-table-column
        prop="from_city"
        width="140"
        :label="$t('plan.field.fromCity')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.outlayRemark')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.outlayDetail')">
      </el-table-column>
      <el-table-column
        prop="op_user_name"
        width="140"
        :label="$t('plan.field.op')">
      </el-table-column>
      <el-table-column
        prop="deal_user_name"
        width="140"
        :label="$t('plan.field.manager')">
      </el-table-column>
      <el-table-column
        prop="guide_name"
        width="140"
        :label="$t('plan.field.guide')">
      </el-table-column>
      <el-table-column
        prop="leader"
        width="140"
        :label="$t('plan.field.lingdui')">
      </el-table-column>
      <el-table-column
        prop="flight"
        width="140"
        :label="$t('plan.field.flight')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.flight1')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.flight2')">
      </el-table-column>
      <el-table-column
        prop="operator_a"
        width="140"
        :label="$t('plan.field.jiafangOp')">
      </el-table-column>
      <el-table-column
        prop="source"
        width="140"
        :label="$t('plan.field.source')">
      </el-table-column>
      <el-table-column
        prop="market"
        width="140"
        :label="$t('plan.field.market')">
      </el-table-column>
      <el-table-column
        prop="in_code"
        width="140"
        :label="$t('plan.field.inCode')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.shopping')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.selfCost')">
      </el-table-column>
      <el-table-column
        prop="one_price"
        width="140"
        :label="$t('plan.field.onePrice')">
      </el-table-column>
      <el-table-column
        prop="pass_order"
        width="140"
        :label="$t('plan.field.passOrder')">
      </el-table-column>
      <el-table-column
        prop="others_money"
        width="140"
        :label="$t('plan.field.othersMoney')">
      </el-table-column>
      <el-table-column
        prop="leader_ret_pay"
        width="140"
        :label="$t('plan.field.lingduiYj')">
      </el-table-column>
      <el-table-column
        prop="service_pay"
        width="140"
        :label="$t('plan.field.guideXf')">
      </el-table-column>
      <el-table-column
        prop="settlement"
        width="140"
        :label="$t('plan.field.settlement')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.customerInfo')">
      </el-table-column>
      <el-table-column
        prop="shopping_team_no"
        width="140"
        :label="$t('plan.field.shoppingTeamCode')">
      </el-table-column>
      <el-table-column
        prop="kingpower_team_no"
        width="140"
        :label="$t('plan.field.kingpowerTeamCode')">
      </el-table-column>
      <el-table-column
        prop="financeDate"
        width="140"
        :label="$t('plan.field.financeDate')">
      </el-table-column>
      <el-table-column
        prop="take_date"
        width="140"
        :label="$t('plan.field.takeDate')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.carRemark')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.roomRemark')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.hotel')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.car')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.speedboat')">
      </el-table-column>
      <el-table-column
        prop="status"
        width="140"
        :label="$t('plan.field.status')">
      </el-table-column>
      <el-table-column
        prop="out_status"
        width="140"
        :label="$t('plan.field.qrstatus')">
      </el-table-column>
      <el-table-column
        prop="remark"
        width="140"
        :label="$t('plan.field.remark')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.updater')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('plan.field.updateDate')">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="140"
        :label="$t('plan.field.action')">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">{{ $t('actions.edit') }}</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">{{ $t('actions.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-row>
    <keep-alive>
      <div v-if="loadEditModal"><edit-plan :show.sync="showEditPlan" :item="planItem" @success="getList"/></div>
    </keep-alive>
  </div>
</template>

<script>
import EditPlan from './components/edit-plan'
import mixin from './mixin'
import Pagination from '@/components/Pagination'
import { getPlanList } from '@/api/plan'
export default {
  name: 'planList',
  mixins: [mixin],
  components: {
    Pagination,
    EditPlan
  },
  created() {
    this.getList()
  },
  data() {
    return {
      loadEditModal: false,
      showEditPlan: false,
      planItem: '',
      total: 10,
      listQuery: {
        page: 1,
        limit: 20,
        keyword: ''
      },
      multipleSelection: [],
      tableData: []
    }
  },
  methods: {
    handleFilter() {

    },
    handleCreate() {
      this.loadEditModal = true
      this.showEditPlan = true
      this.planItem = ''
    },
    handleEdit(item) {
      this.loadEditModal = true
      this.planItem = item
      this.showEditPlan = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    search() {
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      getPlanList(this.listQuery).then(res => {
        this.total = res.data.count
        this.tableData = res.data.data
      })
    }
  }
}
</script>

<style></style>