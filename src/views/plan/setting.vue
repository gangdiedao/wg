<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="width: 680px;">
      <el-form-item label="活动形式" prop="code_sign1">
        <el-input type="textarea" :rows="3" v-model="ruleForm.code_sign1"></el-input>
      </el-form-item>
      <el-form-item label="活动形式" prop="code_sign2">
        <el-input type="textarea" :rows="3" v-model="ruleForm.code_sign2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="$closeTag()">关闭页面</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mixin from './mixin'
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style>

</style>