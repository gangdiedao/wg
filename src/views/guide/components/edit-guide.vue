<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
      <el-form-item :label="$t('guide.field.name')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('guide.field.insideId')" prop="">
        <el-input v-model="ruleForm.inner_code"></el-input>
      </el-form-item>
      <el-form-item :label="$t('guide.field.id')" prop="">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item :label="$t('guide.field.arranger')" prop="op_user_id">
        <el-select v-model="ruleForm.op_user_id" filterable @change="handleChangeUser" style="width: 100%">
          <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('guide.field.idCard')" prop="passport_no">
        <el-input v-model="ruleForm.passport_no"></el-input>
      </el-form-item>
      <el-form-item :label="$t('guide.field.nationality')">
        <el-select v-model="ruleForm.nationality_id" @change="handleChangeNationality" clearable style="width: 100%">
          <el-option v-for="item in nationalityList" :key="item.id" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('guide.field.guideId')" prop="">
        <el-input v-model="ruleForm.guide_card_no"></el-input>
      </el-form-item>
      <el-form-item :label="$t('guide.field.guideImage')"  prop="">
        <upload :accept="$config.imageAccept" list-type="picture-card" :limit="1" :files.sync="ruleForm.imagesArr"/>
      </el-form-item>
      <el-form-item :label="$t('guide.field.phone')" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item :label="$t('guide.field.wechat')" prop="">
        <el-input v-model="ruleForm.wechat"></el-input>
      </el-form-item>
      <el-form-item :label="$t('guide.field.email')" prop="">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('guide.field.sex')" prop="">
        <el-select v-model="ruleForm.gender" style="width: 100%">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
          <el-option label="其他" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('guide.field.passportImage')" prop="">
        <upload :accept="$config.imageAccept" list-type="picture-card" :limit="1" :files.sync="ruleForm.passport_copy_imagesArr"/>
      </el-form-item>
      <el-form-item :label="$t('guide.field.birthday')" prop="">
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('guide.field.level')" prop="">
        <el-select v-model="ruleForm.level" style="width: 100%">
          <el-option label="特优" :value="1"></el-option>
          <el-option label="优秀" :value="2"></el-option>
          <el-option label="中等" :value="3"></el-option>
          <el-option label="一般" :value="4"></el-option>
          <el-option label="差" :value="5"></el-option>
          <el-option label="实习" :value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('guide.field.workStatus')" prop="">
        <el-select v-model="ruleForm.assign_status" style="width: 100%">
          <el-option label="正常出团" :value="1"></el-option>
          <el-option label="请假" :value="2"></el-option>
          <el-option label="离职" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('guide.field.badRecord')">
        <el-input type="textarea" v-model="ruleForm.bad_notes"></el-input>
      </el-form-item>
      <el-form-item :label="$t('guide.field.remark')">
        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <!-- <el-form-item label="历史押金" prop="">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="新押金" prop="">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="总押金" prop="">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        {{ $t('actions.cancel') }}
      </el-button>
      <el-button :loading="submitLoading" type="primary" @click="dialogStatus==='create'?createData():updateData()">
        {{ $t('actions.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getOtherDictList } from '@/api/system'
import { getUserList } from '@/api/organization'
import { addGuide, editGuide } from '@/api/guide'
import upload from '@/components/Upload/index'
export default {
  components: {
    upload
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
          Object.assign(this.ruleForm, this.item)
          this.dialogStatus = 'update'
        } else {
          this.$refs[formName].resetFields();
          this.ruleForm = {
            id: undefined,
            name: '',
            inner_code: '',
            op_user_id: '',
            op_organization_id: '',
            op_user_name: '',
            code: '',
            passport_no: '',
            nationality_id: '',
            nationality_name: '',
            guide_card_no: '',
            guide_card_img: '',
            phone: '',
            email: '',
            wechat: '',
            gender: '',
            birthday: '',
            status: 1,
            login_password: '',
            level: 3,
            assign_status: 1,
            bad_notes: '',
            bookremark: '',
            remark: '',
            filesArr: [],
            imagesArr: [],
            passport_copy_imagesArr: []
          }
          this.dialogStatus = 'create'
        }
      }
    }
  },
  created() {
    this.init()
  },
  data() {
    return {
      submitLoading: false,
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')}`,
        create: `${this.$t('actions.create')}`,
      },
      ruleForm: {
        id: undefined,
        name: '',
        inner_code: '',
        op_user_id: '',
        op_organization_id: '',
        op_user_name: '',
        code: '',
        passport_no: '',
        nationality_id: '',
        nationality_name: '',
        guide_card_no: '',
        guide_card_img: '',
        phone: '',
        email: '',
        wechat: '',
        gender: '',
        birthday: '',
        status: 1,
        login_password: '',
        level: 3,
        assign_status: 1,
        bad_notes: '',
        bookremark: '',
        remark: '',
        filesArr: [],
        imagesArr: [],
        passport_copy_imagesArr: []
      },
      nationalityList: [],
      userList: [],
      rules: {
        name: [
          { required: true, message: 'required', trigger: 'blur' }
        ],
        passport_no: [
          { required: true, message: 'required', trigger: 'blur' }
        ],
        op_user_id: [
          { required: true, message: 'required', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'required', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init() {
      this.getNationality()
      this.getUserList()
    },
    getNationality() {
      getOtherDictList({type: 'nationality'}).then(res => {
        this.nationalityList = res.data
      })
    },
    getUserList() {
      getUserList({page: 1, limit: 1000}).then(res => {
        this.userList = res.data.data
      })
    },
    // 选择排团经理
    handleChangeUser(id) {
      let res = this.userList.filter(item => item.id === id)
      if (res.length > 0) {
        this.ruleForm.op_organization_id = res[0]['department_id']
        this.ruleForm.op_user_name = res[0]['name']
      }
    },
    handleChangeNationality(id) {
      let res = this.nationalityList.filter(item => item.id === id)
      if (res.length > 0) {
        this.ruleForm.nationality_name = res[0]['value']
      }
    },
    handleChange() {

    },
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          addGuide(this.ruleForm).then(() => {
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
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          editGuide(this.ruleForm).then(() => {
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
    }
  }
}
</script>

<style>

</style>