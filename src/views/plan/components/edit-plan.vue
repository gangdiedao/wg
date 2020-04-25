<template>
  <el-dialog :fullscreen="false" top="0" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="1280px" center>
    <el-form style="height: 80vh;overflow-y: auto" ref="dataForm" :rules="rules" :model="formData" label-position="right" label-width="160px">
      <el-form-item :label="$t('plan.field.product')">
        <el-input v-model="formData.foundation_prodcut_name" v-show="false"/>
        <el-button>选择产品</el-button>
      </el-form-item>
      <el-form-item :label="$t('plan.field.setGroup')">
        <el-select v-model="formData.code_sign1" class="filter-item" placeholder="选择主团号">
          <el-option v-for="item in planCodeOptions1" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-if="formData.code_sign1" v-model="formData.code_sign2" class="filter-item" clearable placeholder="选择副团号">
          <el-option v-for="item in planCodeOptions2" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.dateNum')">
        <div>
          <label>日期:</label><el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formData.plan_date"></el-date-picker>
          <label style="margin-left: 10px;">团数:</label><el-input-number controls-position="right" :min="1"></el-input-number>
        </div>
        <div style="margin-top: 10px;">
          <label>甲方团号:</label><el-input class="plan-edit-input" v-model="formData.code_a" clearable/>
        </div>
        <div style="margin-top: 10px;">
          <div>
            <label>成人:</label><el-input-number style="width: 100px;" v-model="formData.adult_num" controls-position="right" :min="0"></el-input-number>
            <label style="margin-left: 10px;">小孩占:</label><el-input-number style="width: 100px;" v-model="formData.bedkid_num" controls-position="right" :min="0"></el-input-number>
            <label style="margin-left: 10px;">小孩不占:</label><el-input-number style="width: 100px;" v-model="formData.nobedkid_num" controls-position="right" :min="0"></el-input-number>
            <label style="margin-left: 10px;">婴儿:</label><el-input-number style="width: 100px;" v-model="formData.baby_num" controls-position="right" :min="0"></el-input-number>
            <label style="margin-left: 10px;">领队:</label><el-input-number style="width: 100px;" v-model="formData.leader_num" controls-position="right" :min="0"></el-input-number>
            <label style="margin-left: 10px;">余位:</label><el-input-number style="width: 100px;" v-model="formData.remain_num" controls-position="right" :min="0"></el-input-number>
          </div>
          <div style="margin-top: 10px;">
            <label>预定房间数：SGL:</label><el-input-number style="width: 100px;" v-model="formData.sgl" controls-position="right" :min="0"></el-input-number>
            <label style="margin-left: 10px;">TWN:</label><el-input-number style="width: 100px;" v-model="formData.twn" controls-position="right" :min="0"></el-input-number>
            <label style="margin-left: 10px;">TRP:</label><el-input-number style="width: 100px;" v-model="formData.trp" controls-position="right" :min="0"></el-input-number>
            <label style="margin-left: 10px;">DBL:</label><el-input-number style="width: 100px;" v-model="formData.dbl" controls-position="right" :min="0"></el-input-number>
            <label style="margin-left: 10px;">HNM:</label><el-input-number style="width: 100px;" v-model="formData.honeymood" controls-position="right" :min="0"></el-input-number>
            <label style="margin-left: 10px;">TL:</label><el-input-number style="width: 100px;" v-model="formData.tl" controls-position="right" :min="0"></el-input-number>
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('plan.field.subsidiary')">
        <el-select v-model="formData.sub_company_id" class="filter-item" @change="handleChangeSelect('subsidiaryOptions', {'sub_company_name': 'name'}, $event)" placeholder="">
          <el-option v-for="item in subsidiaryOptions" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.op')">
        <el-select v-model="formData.op_user_id" class="filter-item" @change="handleChangeSelect('opList', {'op_organization_id': 'department_id', 'op_user_name': 'name'}, $event)" placeholder="">
          <el-option v-for="item in opList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.manager')">
        <el-select v-model="formData.deal_user_id" class="filter-item" @change="handleChangeSelect('manageList', {'deal_user_name': 'name', 'deal_organization_id': 'department_id'}, $event)" placeholder="">
          <el-option v-for="item in manageList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.days')">
        <el-input class="plan-edit-input" clearable v-model="formData.plan_day"/>
        <span>(Exp:2-2-1 5N7D)</span>
      </el-form-item>
      <el-form-item :label="$t('plan.field.guide')">
        <div @click="showSelectGuid = !showSelectGuid"><el-input class="plan-edit-input" v-model="formData.guide_name" readonly/></div>
      </el-form-item>
      <el-form-item :label="$t('plan.field.fromCity')">
        <el-input class="plan-edit-input" v-model="formData.from_city" clearable/>
        <span>(Exp: 杭州 - 曼谷)</span>
      </el-form-item>
      <el-form-item :label="$t('plan.field.lingdui')">
        <el-input class="plan-edit-input" v-model="formData.leader" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.flight')">
        <el-input class="plan-edit-input" v-model="formData.flight" clearable/>
        <span>(Exp:FT1 1530/1700; FT3 2300/0100+1 次日凌晨1点)</span>
      </el-form-item>
      <el-form-item :label="$t('plan.field.flight1')">
        <el-input type="textarea" :rows="1" v-model="formData.detail.other_flight" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.flight2')">
        <el-input type="textarea" :rows="1" v-model="formData.detail.other_flight2" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.jiafang')">
        <el-select v-model="formData.company_id" class="filter-item" @change="handleChangeSelect('partnerList', {'company_name': 'name'}, $event)" placeholder="">
          <el-option v-for="item in partnerList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.jiafangOp')">
        <el-input class="plan-edit-input" v-model="formData.operator_a" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.source')">
        <el-select
          v-model="formData.source"
          filterable
          allow-create
          default-first-option
          clearable
          placeholder="">
          <el-option
            v-for="item in customersource"
            :key="item.id"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.market')">
        <el-select
          v-model="formData.market"
          filterable
          allow-create
          default-first-option
          clearable
          placeholder="">
          <el-option
            v-for="item in shichangrex"
            :key="item.id"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.inCode')">
        <el-select
          v-model="formData.in_code"
          filterable
          allow-create
          default-first-option
          clearable
          placeholder="">
          <el-option
            v-for="item in incodeex"
            :key="item.id"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.shopping')">
        <el-select
          v-model="formData.detail.shoppingArr"
          allow-create
          multiple
          filterable
          default-first-option
          placeholder=""
          style="width: 100%">
          <el-option
            v-for="item in shopping"
            :key="item.id"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.selfCost')">
        <el-select
          v-model="formData.detail.self_costArr"
          allow-create
          multiple
          filterable
          default-first-option
          placeholder=""
          style="width: 100%">
          <el-option
            v-for="item in selfcost"
            :key="item.id"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.onePrice')">
        <el-input class="plan-edit-input" v-model="formData.one_price" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.passOrder')">
        <el-input class="plan-edit-input" v-model="formData.pass_order" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.othersMoney')">
        <el-input class="plan-edit-input" v-model="formData.others_money" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.lingduiYj')">
        <el-select
          v-model="formData.leader_ret_pay"
          allow-create
          clearable
          placeholder="">
          <el-option
            v-for="item in settlement"
            :key="item.id"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.guideXf')">
        <el-select
          v-model="formData.service_pay"
          allow-create
          clearable
          placeholder="">
          <el-option
            v-for="item in service"
            :key="item.id"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.settlement')">
        <el-select
          v-model="formData.settlement"
          allow-create
          clearable
          placeholder="">
          <el-option
            v-for="item in settlement"
            :key="item.id"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.customerInfo')">
        <el-input type="textarea" :rows="1" v-model="formData.detail.customer_info" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.shoppingTeamCode')">
        <el-input class="plan-edit-input" v-model="formData.shopping_team_no" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.kingpowerTeamCode')">
        <el-input class="plan-edit-input" v-model="formData.kingpower_team_no" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.financeDate')">
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formData.finance_date"></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('plan.field.takeDate')">
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formData.take_date"></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('plan.field.outlayRemark')">
        <el-input type="textarea" :rows="1" v-model="formData.detail.outlay" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.carRemark')">
        <el-input type="textarea" :rows="1" v-model="formData.detail.car_remark" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.roomRemark')">
        <el-input type="textarea" :rows="1" v-model="formData.detail.room_remark" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.remark')">
        <el-input type="textarea" :rows="1" v-model="formData.detail.remark" clearable/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        {{ $t('actions.cancel') }}
      </el-button>
      <el-button :loading="submitLoading" type="primary" @click="dialogStatus==='create'?createData():updateData()">
        {{ $t('actions.confirm') }}
      </el-button>
    </div>
    <SelectGuide :show.sync="showSelectGuid" @row-click="handleSelectGuid"/>
  </el-dialog>
</template>>

<script>
import { getOtherDictList } from '@/api/system'
import { fetchList } from '@/api/subsidiary'
import { getPlanCodeDetail, addPlan, editPlan } from '@/api/plan'
import { addScenic, editScenic } from '@/api/scenic'
import { getUserList } from '@/api/organization'
import { fetchList as getPartnerList } from '@/api/partner'
import SelectGuide from '@/views/guide/components/select-guide'
import { parseTime } from '@/utils/index'

export default {
  components: {
    SelectGuide
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    item: ''
  },
  watch: {
    dialogFormVisible(bool) {
      if (!bool) {
        this.$emit('update:show', false)
      }
    },
    show(bool) {
      this.dialogFormVisible = bool
      if (bool) {
        if (this.item) {
          Object.assign(this.formData, this.item)
          this.dialogStatus = 'update'
        } else {
          this.resetformData()
          this.dialogStatus = 'create'
        }
      }
    }
  },
  data() {
    return {
      submitLoading: false,
      showSelectGuid: false,
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')}`,
        create: `${this.$t('actions.create')}`,
      },
      formData: {
        id: undefined,
        foundation_prodcut_id: undefined,
        foundation_prodcut_name: '',
        code_sign1: '',
        code_sign2: '',
        sub_company_id: undefined,
        sub_company_name: '',
        op_user_id: undefined,
        op_organization_id: undefined,
        op_user_name: '',
        op_manager_user_id: undefined,
        op_manager_organization_id: undefined,
        op_manager_user_name: '',
        deal_user_id: undefined,
        deal_organization_id: undefined,
        deal_user_name: '',
        company_id: undefined,
        company_name: '',
        operator_a: '',
        source: '',
        market: '',
        in_code: '',
        shopping: '',
        self_cost: '',
        leader_ret_pay: '',
        service_pay: '',
        settlement: '',
        guide_id: undefined,
        guide_name: '',
        from_city: '',
        plan_day: '',
        leader: '',
        flight: '',
        one_price: '',
        pass_order: '',
        others_money: '',
        shopping_team_no: '',
        kingpower_team_no: '',
        finance_date: '',
        take_date: '',
        plan_date: parseTime(new Date(), '{y}-{m}-{d}'),
        code_a: '',
        adult_num: '',
        bedkid_num: '',
        nobedkid_num: '',
        baby_num: '',
        leader_num: '',
        remain_num: '',
        sgl: '',
        twn: '',
        trp: '',
        dbl: '',
        honeymood: '',
        tl: '',
        detail: {
          outlay: '',
          other_flight: '',
          other_flight2: '',
          shoppingArr: '',
          self_costArr: '',
          customer_info: '',
          car_remark: '',
          room_remark: '',
          remark: '',
          checkout_remark: ''
        }
      },
      rules: {
        // plan_date: [{ required: true, message: this.$t('rules.required'), trigger: 'blur' }]
      },
      customersource: [],
      shichangrex: [],
      incodeex: [],
      shopping: [],
      selfcost: [],
      settlement: [],
      service: [],
      subsidiaryOptions: [],
      planCodeOptions1: [],
      planCodeOptions2: [],
      partnerList: [],
      opList: [],
      manageList: [],
      options: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getDictList('customersource')
      this.getDictList('shichangrex')
      this.getDictList('incodeex')
      this.getDictList('shopping')
      this.getDictList('selfcost')
      this.getDictList('settlement')
      this.getDictList('service')
      this.getSubsidiary()
      this.getPlanCodeDetail()
      this.getOpUserList()
      this.getManageUserList()
      this.getPartnerList()
    },
    // 获取字典列表
    getDictList(name) {
      if (name) {
        getOtherDictList({type: name}).then(res => {
          this[name] = res.data
        })
      }
    },
    // 获取子公司
    getSubsidiary() {
      fetchList({page: 1, limit: 1000, status: 1}).then(res => {
        this.subsidiaryOptions = res.data.data
      })
    },
    // 获取团号
    getPlanCodeDetail() {
      getPlanCodeDetail().then(res => {
        this.planCodeOptions1 = res.data.code_sign1Arr
        this.planCodeOptions2 = res.data.code_sign2Arr
      })
    },
    // 获取操作op
    getOpUserList() {
      getUserList({page: 1, limit: 1000, role_slugs: ['op']}).then(res => {
        this.opList = res.data.data
      })
    },
    // 获取排团经理
    getManageUserList() {
      getUserList({page: 1, limit: 1000, role_slugs: ['administrator']}).then(res => {
        this.manageList = res.data.data
      })
    },
    // 获取合作伙伴
    getPartnerList() {
      getPartnerList({page: 1, limit: 1000}).then(res => {
        this.partnerList = res.data.data
      })
    },
    resetformData() {
      this.formData = {
        id: undefined,
        foundation_prodcut_id: undefined,
        foundation_prodcut_name: '',
        code_sign1: '',
        code_sign2: '',
        sub_company_id: undefined,
        sub_company_name: '',
        op_user_id: undefined,
        op_organization_id: undefined,
        op_user_name: '',
        op_manager_user_id: undefined,
        op_manager_organization_id: undefined,
        op_manager_user_name: '',
        deal_user_id: undefined,
        deal_organization_id: undefined,
        deal_user_name: '',
        company_id: undefined,
        company_name: '',
        operator_a: '',
        source: '',
        market: '',
        in_code: '',
        shopping: '',
        self_cost: '',
        leader_ret_pay: '',
        service_pay: '',
        settlement: '',
        guide_id: undefined,
        guide_name: '',
        from_city: '',
        plan_day: '',
        leader: '',
        flight: '',
        one_price: '',
        pass_order: '',
        others_money: '',
        shopping_team_no: '',
        kingpower_team_no: '',
        finance_date: '',
        take_date: '',
        plan_date: parseTime(new Date(), '{y}-{m}-{d}'),
        code_a: '',
        adult_num: '',
        bedkid_num: '',
        nobedkid_num: '',
        baby_num: '',
        leader_num: '',
        remain_num: '',
        sgl: '',
        twn: '',
        trp: '',
        dbl: '',
        honeymood: '',
        tl: '',
        detail: {
          outlay: '',
          other_flight: '',
          other_flight2: '',
          shoppingArr: '',
          self_costArr: '',
          customer_info: '',
          car_remark: '',
          room_remark: '',
          remark: '',
          checkout_remark: ''
        }
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          addPlan(this.formData).then(() => {
            this.$message({
              message: 'success',
              type: 'success'
            })
            this.$emit('success')
            this.dialogFormVisible = false
          }).finally(() => {
            this.submitLoading = false
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          editPlan(this.formData).then(() => {
            this.$message({
              message: 'success',
              type: 'success'
            })
            this.$emit('success')
            this.dialogFormVisible = false
          }).finally(() => {
            this.submitLoading = false
          })
        }
      })
    },
    // 选择更改
    handleChangeSelect(dataname, keys, id) {
      let res = this[dataname].filter(item => item.id === id)
      if (res.length > 0) {
        for (let key in keys) {
          this.formData[key] = res[0][keys[key]]
        }
      }
    },
    // 选择导游
    handleSelectGuid(item) {
      this.formData.guide_id = item.id
      this.formData.guide_name = item.name
    }
  }
}
</script>

<style>
  .plan-edit-input {
    width: 250px;
  }
</style>