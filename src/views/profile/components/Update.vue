<template>
  <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-form-item :label="$t('profile.field.password')" prop="password">
      <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item :label="$t('profile.field.confirm')" prop="confirm">
      <el-input v-model="ruleForm.confirm" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button :loading="submitLoading" type="primary" @click="submitForm('ruleForm')">{{ $t('actions.confirm') }}</el-button>
      <el-button @click="$closeTag()">{{ $t('actions.closePage') }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { updatePwd } from '@/api/user'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.confirm !== '') {
          this.$refs.ruleForm.validateField('confirm')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      submitLoading: false,
      ruleForm: {
        password: '',
        confirm: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirm: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          updatePwd(this.ruleForm).then(() => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }).finally(() => {
            this.submitLoading = false
          })
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
