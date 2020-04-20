<template>
  <el-dialog :fullscreen="false" top="0" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" center>
    <el-form style="height: 80vh;overflow-y: auto" ref="dataForm" :rules="rules" :model="formData" label-position="right" label-width="160px">
      <el-form-item :label="$t('plan.field.product')" prop="name">
        <el-input v-model="formData.name" v-show="flase"/>
        <el-button>选择产品</el-button>
      </el-form-item>
      <el-form-item :label="$t('plan.field.setGroup')" prop="name">
        <el-select v-model="formData.city_id" class="filter-item" @change="handleChangeCity" placeholder="">
          <el-option v-for="item in cityOptions" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
        <el-select v-model="formData.city_id" class="filter-item" @change="handleChangeCity" placeholder="">
          <el-option v-for="item in cityOptions" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.subsidiary')">
        <el-select v-model="formData.city_id" class="filter-item" @change="handleChangeCity" placeholder="">
          <el-option v-for="item in subsidiaryOptions" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.op')">
        <el-select v-model="formData.city_id" class="filter-item" @change="handleChangeCity" placeholder="">
          <el-option v-for="item in cityOptions" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.manager')">
        <el-select v-model="formData.city_id" class="filter-item" @change="handleChangeCity" placeholder="">
          <el-option v-for="item in cityOptions" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.days')">
        <el-input class="plan-edit-input" clearable v-model="formData.name"/>
        <span>(Exp:2-2-1 5N7D)</span>
      </el-form-item>
      <el-form-item :label="$t('plan.field.guide')">
        <el-input class="plan-edit-input" v-model="formData.name" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.fromCity')">
        <el-input class="plan-edit-input" v-model="formData.name" clearable/>
        <span>(Exp: 杭州 - 曼谷)</span>
      </el-form-item>
      <el-form-item :label="$t('plan.field.lingdui')">
        <el-input class="plan-edit-input" v-model="formData.name" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.flight')">
        <el-input class="plan-edit-input" v-model="formData.name" clearable/>
        <span>(Exp:FT1 1530/1700; FT3 2300/0100+1 次日凌晨1点)</span>
      </el-form-item>
      <el-form-item :label="$t('plan.field.flight1')">
        <el-input type="textarea" :rows="1" v-model="formData.name" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.flight2')">
        <el-input type="textarea" :rows="1" v-model="formData.name" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.jiafang')">
        <el-select v-model="formData.city_id" class="filter-item" @change="handleChangeCity" placeholder="">
          <el-option v-for="item in cityOptions" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.jiafangOp')">
        <el-input class="plan-edit-input" v-model="formData.name" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.source')">
        <el-select
          v-model="formData.name"
          filterable
          allow-create
          default-first-option
          clearable
          placeholder="">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.market')">
        <el-select
          v-model="formData.name"
          filterable
          allow-create
          default-first-option
          clearable
          placeholder="">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.inCode')">
        <el-select
          v-model="formData.name"
          filterable
          allow-create
          default-first-option
          clearable
          placeholder="">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.shopping')">
        <el-select
          v-model="formData.name"
          multiple
          placeholder=""
          style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.selfCost')">
        <el-select
          v-model="formData.name"
          multiple
          placeholder=""
          style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.onePrice')">
        <el-input class="plan-edit-input" v-model="formData.name" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.passOrder')">
        <el-input class="plan-edit-input" v-model="formData.name" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.othersMoney')">
        <el-input class="plan-edit-input" v-model="formData.name" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.lingduiYj')">
        <el-select
          v-model="formData.name"
          allow-create
          clearable
          placeholder="">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.guideXf')">
        <el-select
          v-model="formData.name"
          allow-create
          clearable
          placeholder="">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.settlement')">
        <el-select
          v-model="formData.name"
          allow-create
          clearable
          placeholder="">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plan.field.customerInfo')">
        <el-input type="textarea" :rows="1" v-model="formData.name" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.shoppingTeamCode')">
        <el-input class="plan-edit-input" v-model="formData.name" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.kingpowerTeamCode')">
        <el-input class="plan-edit-input" v-model="formData.name" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.financeDate')">
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formData.birthday"></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('plan.field.takeDate')">
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formData.birthday"></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('plan.field.outlayRemark')">
        <el-input type="textarea" :rows="1" v-model="formData.name" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.carRemark')">
        <el-input type="textarea" :rows="1" v-model="formData.name" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.roomRemark')">
        <el-input type="textarea" :rows="1" v-model="formData.name" clearable/>
      </el-form-item>
      <el-form-item :label="$t('plan.field.remark')">
        <el-input type="textarea" :rows="1" v-model="formData.name" clearable/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        {{ $t('actions.cancel') }}
      </el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
        {{ $t('actions.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>>

<script>
import { getOtherDictList } from '@/api/system'
import { fetchList } from '@/api/subsidiary'
import { getPlanCodeDetail } from '@/api/plan'
import { addScenic, editScenic } from '@/api/scenic'

export default {
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
      if (this.item) {
        Object.assign(this.formData, this.item)
        this.dialogStatus = 'update'
      } else {
        this.resetformData()
        this.dialogStatus = 'create'
      }
    }
  },
  data() {
    return {
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')}`,
        create: `${this.$t('actions.create')}`,
      },
      formData: {
        id: undefined,
        name: '',
        intro: '',
        info_type_id: undefined,
        info_type_name: '',
        pay_type_id: undefined,
        pay_type_name: '',
        city_id: undefined,
        city_name: '',
        company: '',
        address: '',
        remark: '',
        url: '',
        level: '',
        fax: '',
        telphone: '',
        contact: '',
        email: '',
        filesArr: [],
        imagesArr: [],
        hotel_type_id: undefined,
        hotel_type_name: '',
        money_type_id: undefined,
        money_type_name: '',
        priceDate: []
      },
      rules: {
        name: [{ required: true, message: this.$t('rules.required'), trigger: 'blur' }],
        city_id: [{ required: true, message: this.$t('rules.required'), trigger: 'blur' }],
      },
      cityOptions: [],
      subsidiaryOptions: [],
      planCodeOptions: [],
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
      this.getCity()
      this.getSubsidiary()
      this.getPlanCodeDetail()
    },
    getCity() {
      getOtherDictList({type: 'city'}).then(res => {
        this.cityOptions = res.data
      })
    },
    getSubsidiary() {
      fetchList({page: 1, limit: 1000, status: 1}).then(res => {
        this.subsidiaryOptions = res.data.data
      })
    },
    getPlanCodeDetail() {
      getPlanCodeDetail().then(res => {
        this.planCodeOptions = res.data
      })
    },
    resetformData() {
      this.formData = {
        id: undefined,
        name: '',
        intro: '',
        info_type_id: undefined,
        info_type_name: '',
        pay_type_id: undefined,
        pay_type_name: '',
        city_id: undefined,
        city_name: '',
        company: '',
        address: '',
        remark: '',
        url: '',
        level: '',
        fax: '',
        telphone: '',
        contact: '',
        email: '',
        filesArr: [],
        imagesArr: [],
        hotel_type_id: undefined,
        hotel_type_name: '',
        money_type_id: undefined,
        money_type_name: '',
        priceDate: []
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addScenic(this.formData).then(() => {
            this.$message({
              message: 'success',
              type: 'success'
            })
            this.$emit('success')
            this.dialogFormVisible = false
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          editScenic(this.formData).then(() => {
            this.$message({
              message: 'success',
              type: 'success'
            })
            this.$emit('success')
            this.dialogFormVisible = false
          })
        }
      })
    },
    // 选择更改
    handleChangeCity(id) {
      let res = this.cityOptions.filter(item => item.id === id)
      if (res.length > 0) {
        this.formData.city_name = res[0]['value']
      }
    }
  }
}
</script>

<style>
  .plan-edit-input {
    width: 250px;
  }
</style>