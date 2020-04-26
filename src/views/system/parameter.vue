<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
      <el-form-item :label="$t('system.field.phone')" prop="phone">
        <el-input type="text" v-model="ruleForm.phone" style="width: 480px;"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.fax')" prop="fax">
        <el-input type="text" v-model="ruleForm.fax" style="width: 480px;"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.exchangeRate')" prop="exchange_rate">
        <el-input-number v-model="ruleForm.exchange_rate" :precision="3" :step="0.01" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('system.field.guideCommission')" prop="guide_commission">
        <el-input-number v-model="ruleForm.guide_commission" :precision="3" :step="0.01" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('system.field.planDateLimit')" prop="plan_date_limit">
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.plan_date_limit"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('system.action.saveOrUpdate') }}</el-button>
        <el-button @click="$closeTag()">{{ $t('actions.closePage') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mixin from './mixin'
import { saveParam, paramDetail } from '@/api/system'
export default {
  name: 'parameter',
  mixins: [mixin],
  data() {
    return {
      ruleForm: {
        phone: '',
        fax: '',
        exchange_rate: '',
        guide_commission: '',
        plan_date_limit: ''
      },
      rules: {
        exchange_rate: [
          { required: true, message: this.$t('rules.required'), trigger: 'blur' },
        ],
        guide_commission: [
          { required: true, message: this.$t('rules.required'), trigger: 'blur' },
        ]
      }
    }
  },
  created() {
    this.paramDetail()
  },
  methods: {
    paramDetail() {
      paramDetail().then(res => {
        Object.assign(this.ruleForm, res.data)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveParam(this.ruleForm).then(() => {
            this.$message({
              message: 'success',
              type: 'success'
            })
          })
        }
      })
    }
  }
}
</script>

<style>

</style>