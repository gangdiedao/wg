<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
      <el-form-item :label="$t('plan.field.code_sign1')" prop="code_sign1">
        <el-input type="textarea" :rows="3" v-model="ruleForm.code_sign1" style="width: 480px;"></el-input>
        <span style="color: #C0C4CC">(用 ; 号间隔)</span>
      </el-form-item>
      <el-form-item :label="$t('plan.field.code_sign2')" prop="code_sign2">
        <el-input type="textarea" :rows="3" v-model="ruleForm.code_sign2" style="width: 480px;"></el-input>
        <span style="color: #C0C4CC">(用 ; 号间隔)</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('plan.action.saveOrUpdate') }}</el-button>
        <el-button @click="$closeTag()">{{ $t('plan.action.closePage') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mixin from './mixin'
import { setPlanCode, getPlanCodeDetail } from '@/api/plan'
export default {
  name: 'setplan',
  mixins: [mixin],
  data() {
    return {
      ruleForm: {
        code_sign1: '',
        code_sign2: ''
      },
      rules: {
        code_sign1: [
          { required: true, message: 'required', trigger: 'blur' },
        ],
        code_sign2: [
          { required: true, message: 'required', trigger: 'blur' },
        ]
      }
    }
  },
  created() {
    this.getPlanCodeDetail()
  },
  methods: {
    getPlanCodeDetail() {
      getPlanCodeDetail().then(res => {
        this.ruleForm.code_sign1 = res.data.code_sign1
        this.ruleForm.code_sign2 = res.data.code_sign2
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setPlanCode(this.ruleForm).then(() => {
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