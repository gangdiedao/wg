<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
      <el-form-item label="汇率设置" prop="exchange_rate">
        <el-input-number v-model="ruleForm.exchange_rate" :precision="3" :step="0.01" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="计算人数" prop="exchange_rate">
        <el-input-number v-model="ruleForm.exchange_rate" :precision="2" :step="0.5" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="导游佣金扣税(%)" prop="exchange_rate">
        <el-input-number v-model="ruleForm.exchange_rate" :precision="2" :step="0.01" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="导游预支">

      </el-form-item>
      <el-form-item label="导游工资" prop="exchange_rate">
        <el-input-number v-model="ruleForm.exchange_rate" :step="1" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="导游工资扣税(%)" prop="exchange_rate">
        <el-input-number v-model="ruleForm.exchange_rate" :precision="2" :step="0.01" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="导游押金" prop="exchange_rate">
        <el-input-number v-model="ruleForm.exchange_rate" :step="1" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="其他收入" prop="exchange_rate">
        <el-input-number v-model="ruleForm.exchange_rate" :step="1" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="其他支出" prop="exchange_rate">
        <el-input-number v-model="ruleForm.exchange_rate" :step="1" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="结账单备注" prop="exchange_rate">
        <el-input type="textarea" :rows="3" v-model="ruleForm.guide_confirm_remark" style="width: 480px;"></el-input>
      </el-form-item>
      <el-form-item label="交账日期">
        <span></span>
      </el-form-item>
      <el-form-item label="导游预付">
        <span></span>
      </el-form-item>
      <!-- <el-form-item :label="$t('system.field.planDateLimit')" prop="plan_date_limit">
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.plan_date_limit"></el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
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
    // this.paramDetail()
  },
  methods: {
    paramDetail() {
      
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // saveParam(this.ruleForm).then(() => {
          //   this.$message({
          //     message: 'success',
          //     type: 'success'
          //   })
          // })
        }
      })
    }
  }
}
</script>

<style>

</style>