<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
      <el-form-item :label="$t('system.field.chairman')">
        <el-input type="text" v-model="ruleForm.chairman" style="width: 480px;"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.dijie_manager')">
        <el-input type="text" v-model="ruleForm.dijie_manager" style="width: 480px;"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.fu_manager')">
        <el-input type="text" v-model="ruleForm.fu_manager" style="width: 480px;"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.kantuan_fu_manager')">
        <el-input type="text" v-model="ruleForm.kantuan_fu_manager" style="width: 480px;"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.team_op')">
        <el-input type="text" v-model="ruleForm.team_op" style="width: 480px;"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.op_manager')">
        <el-input type="text" v-model="ruleForm.op_manager" style="width: 480px;"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.company_phone')">
        <el-input type="text" v-model="ruleForm.company_phone" style="width: 480px;"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.company_fax')">
        <el-input type="text" v-model="ruleForm.company_fax" style="width: 480px;"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.jieji_name')">
        <el-input type="text" v-model="ruleForm.jieji_name" style="width: 480px;"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.jieji_phone')">
        <el-input type="text" v-model="ruleForm.jieji_phone" style="width: 480px;"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.team_confirm_remark')">
        <el-input type="textarea" :rows="3" v-model="ruleForm.team_confirm_remark"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.guide_confirm_remark')">
        <el-input type="textarea" :rows="3" v-model="ruleForm.guide_confirm_remark"></el-input>
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
import { saveConfirmTemp, confirmDetail } from '@/api/system'
export default {
  name: 'parameter',
  mixins: [mixin],
  data() {
    return {
      ruleForm: {
        chairman: '',
        dijie_manager: '',
        fu_manager: '',
        kantuan_fu_manager: '',
        team_op: '',
        op_manager: '',
        company_phone: '',
        company_fax: '',
        jieji_name: '',
        jieji_phone: '',
        team_confirm_remark: '',
        guide_confirm_remark: ''
      },
      rules: {
        // exchange_rate: [
        //   { required: true, message: this.$t('rules.required'), trigger: 'blur' },
        // ]
      }
    }
  },
  created() {
    this.confirmDetail()
  },
  methods: {
    confirmDetail() {
      confirmDetail().then(res => {
        Object.assign(this.ruleForm, res.data)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveConfirmTemp(this.ruleForm).then(() => {
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