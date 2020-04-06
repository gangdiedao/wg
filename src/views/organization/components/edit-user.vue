<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :destroy-on-close="true" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item :label="$t('organization.userModules.field.name')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.userModules.field.username')" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.userModules.field.email')" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.userModules.field.phone')" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.userModules.field.role')">
        <el-select v-model="ruleForm.role" multiple filterable style="width: 100%" placeholder="请选择角色">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('organization.userModules.field.status')">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('organization.userModules.field.remark')">
        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
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
</template>

<script>
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
    }
  },
  data() {
    return {
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')} ${this.$t('organization.userModules.field.user')}`,
        create: `${this.$t('actions.create')} ${this.$t('organization.userModules.field.user')}`,
      },
      ruleForm: {
        id: '',
        name: '',
        username: '',
        email: '',
        phone: '',
        role: [],
        status: 1,
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '长度最少3个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请选正确的emial', trigger: 'blur' }
        ],
        phone: [
          { type: 'phone', message: '请填写正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    createData() {

    },
    updateData() {

    }
  }
}
</script>

<style>

</style>