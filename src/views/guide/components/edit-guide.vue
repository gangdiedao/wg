<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :destroy-on-close="true" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="内部代号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="排团经理">
        <el-select v-model="ruleForm.role" filterable style="width: 100%">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="编号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="护照号/身份证号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="国籍">
        <el-select v-model="ruleForm.role" style="width: 100%">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="导游证号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="导游证照" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="联系号码" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="微信号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="name">
        <el-select v-model="ruleForm.role" style="width: 100%">
          <el-option label="男" value="shanghai"></el-option>
          <el-option label="女" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="护照" prop="name">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
      <el-form-item label="出生日期" prop="name">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="等级" prop="name">
        <el-select v-model="ruleForm.role" style="width: 100%">
          <el-option label="男" value="shanghai"></el-option>
          <el-option label="女" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出团状态" prop="name">
        <el-select v-model="ruleForm.role" style="width: 100%">
          <el-option label="男" value="shanghai"></el-option>
          <el-option label="女" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="不良记录">
        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item label="历史押金" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="新押金" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="总押金" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
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
      fileList: [],
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')}`,
        create: `${this.$t('actions.create')}`,
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
    handleChange() {

    },
    createData() {

    },
    updateData() {

    }
  }
}
</script>

<style>

</style>