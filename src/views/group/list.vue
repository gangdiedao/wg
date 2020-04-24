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
        :label="$t('group.field.code')">
      </el-table-column>
      <el-table-column
        prop="type"
        width="180"
        :label="$t('group.field.zhutuan')">
        <template slot-scope="{row}">
          <span>{{{1: '单团', 2: '主团', 3: '子团'}[row.type]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.zituan')">
      </el-table-column>
      <el-table-column
        prop="company_name"
        width="140"
        :label="$t('group.field.jiafang')">
      </el-table-column>
      <el-table-column
        prop="code_a"
        width="140"
        :label="$t('group.field.jiafangCode')">
      </el-table-column>
      <el-table-column
        prop="foundation_prodcut_name"
        width="140"
        :label="$t('group.field.product')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.productType')">
      </el-table-column>
      <el-table-column
        prop="cal_people_num"
        width="140"
        :label="$t('group.field.number')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.room')">
      </el-table-column>
      <el-table-column
        prop="plan_day"
        width="140"
        :label="$t('group.field.days')">
      </el-table-column>
      <el-table-column
        prop="from_city"
        width="140"
        :label="$t('group.field.fromCity')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.outlayRemark')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.outlayDetail')">
      </el-table-column>
      <el-table-column
        prop="op_user_name"
        width="140"
        :label="$t('group.field.op')">
      </el-table-column>
      <el-table-column
        prop="deal_user_name"
        width="140"
        :label="$t('group.field.manager')">
      </el-table-column>
      <el-table-column
        prop="guide_name"
        width="140"
        :label="$t('group.field.guide')">
      </el-table-column>
      <el-table-column
        prop="leader"
        width="140"
        :label="$t('group.field.lingdui')">
      </el-table-column>
      <el-table-column
        prop="flight"
        width="140"
        :label="$t('group.field.flight')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.flight1')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.flight2')">
      </el-table-column>
      <el-table-column
        prop="operator_a"
        width="140"
        :label="$t('group.field.jiafangOp')">
      </el-table-column>
      <el-table-column
        prop="source"
        width="140"
        :label="$t('group.field.source')">
      </el-table-column>
      <el-table-column
        prop="market"
        width="140"
        :label="$t('group.field.market')">
        <template slot-scope="{row}">
          <el-popover
            placement="top-start"
            title=""
            width="400"
            trigger="hover"
            :content="row.market">
            <div class="text-ellipsis" slot="reference">{{row.market}}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="in_code"
        width="140"
        :label="$t('group.field.inCode')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.shopping')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.selfCost')">
      </el-table-column>
      <el-table-column
        prop="one_price"
        width="140"
        :label="$t('group.field.onePrice')">
      </el-table-column>
      <el-table-column
        prop="pass_order"
        width="140"
        :label="$t('group.field.passOrder')">
      </el-table-column>
      <el-table-column
        prop="others_money"
        width="140"
        :label="$t('group.field.othersMoney')">
      </el-table-column>
      <el-table-column
        prop="leader_ret_pay"
        width="140"
        :label="$t('group.field.lingduiYj')">
      </el-table-column>
      <el-table-column
        prop="service_pay"
        width="140"
        :label="$t('group.field.guideXf')">
      </el-table-column>
      <el-table-column
        prop="settlement"
        width="140"
        :label="$t('group.field.settlement')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.customerInfo')">
      </el-table-column>
      <el-table-column
        prop="shopping_team_no"
        width="140"
        :label="$t('group.field.shoppingTeamCode')">
      </el-table-column>
      <el-table-column
        prop="kingpower_team_no"
        width="140"
        :label="$t('group.field.kingpowerTeamCode')">
      </el-table-column>
      <el-table-column
        prop="financeDate"
        width="140"
        :label="$t('group.field.financeDate')">
      </el-table-column>
      <el-table-column
        prop="take_date"
        width="140"
        :label="$t('group.field.takeDate')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.carRemark')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.roomRemark')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.hotel')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.car')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.speedboat')">
      </el-table-column>
      <el-table-column
        prop="status"
        width="140"
        :label="$t('group.field.status')">
      </el-table-column>
      <el-table-column
        prop="out_status"
        width="140"
        :label="$t('group.field.qrstatus')">
      </el-table-column>
      <el-table-column
        prop="remark"
        width="140"
        :label="$t('group.field.remark')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.updater')">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        :label="$t('group.field.updateDate')">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="140"
        :label="$t('group.field.action')">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDelete(scope.row)">{{ $t('actions.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-row>
  </div>
</template>

<script>
import mixin from './mixin'
import Pagination from '@/components/Pagination'
import { getGroupList } from '@/api/plan'
export default {
  name: 'planList',
  mixins: [mixin],
  components: {
    Pagination
  },
  created() {
    this.getList()
  },
  data() {
    return {
      loadEditModal: false,
      showEditPlan: false,
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
    // 删除
    handleDelete() {

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 搜索
    search() {
      this.listQuery.page = 1
      this.getList()
    },
    // 获取列表
    getList() {
      getGroupList(this.listQuery).then(res => {
        this.total = res.data.count
        this.tableData = res.data.data
      })
    }
  }
}
</script>

<style></style>