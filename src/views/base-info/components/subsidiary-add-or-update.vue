<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('i18nView.information.add') : $t('i18nView.information.edit')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    center
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      label-width="120px"
      @keyup.enter.native="dataFormSubmitHandle()"
    >
      <el-form-item prop="name" :label="$t('i18nView.information.name')">
        <el-input v-model="dataForm.name" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.name')" />
      </el-form-item>
      <el-form-item prop="fullname" :label="$t('i18nView.information.fullName')">
        <el-input v-model="dataForm.fullname" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.fullName')" />
      </el-form-item>
      <el-form-item prop="enname" :label="$t('i18nView.information.englishName')">
        <el-input v-model="dataForm.enname" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.englishName')" />
      </el-form-item>
      <el-form-item prop="namekey" :label="$t('i18nView.information.key')">
        <el-input v-model="dataForm.namekey" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.key')" />
      </el-form-item>
      <el-form-item prop="manager_user_id" :label="$t('i18nView.information.companyManager')">
        <el-select v-model="dataForm.manager_user_id" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.companyManager')" @change="coChange">
          <el-option
            v-for="item in infoTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="op_manager_user_id" :label="$t('i18nView.information.operationsManager')">
        <el-select v-model="dataForm.op_manager_user_id" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.operationsManager')" @change="opChange">
          <el-option
            v-for="item in infoTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="principal" :label="$t('i18nView.information.charger')">
        <el-input v-model="dataForm.principal" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.charger')" />
      </el-form-item>
      <el-form-item prop="tel" :label="$t('i18nView.information.telePhone')">
        <el-input v-model="dataForm.tel" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.telePhone')" />
      </el-form-item>
      <el-form-item prop="fax" :label="$t('i18nView.information.fax')">
        <el-input v-model="dataForm.fax" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.fax')" />
      </el-form-item>
      <el-form-item prop="preffix" :label="$t('i18nView.information.groupNumberPrefix')">
        <el-input v-model="dataForm.preffix" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.groupNumberPrefix')" />
      </el-form-item>
      <el-form-item prop="licenceno" :label="$t('i18nView.information.businessLicenseNo')">
        <el-input v-model="dataForm.licenceno" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.businessLicenseNo')" />
      </el-form-item>
      <el-form-item prop="address" :label="$t('i18nView.information.companyAddress')">
        <el-input v-model="dataForm.address" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.companyAddress')" />
      </el-form-item>
      <el-form-item prop="remark" :label="$t('i18nView.information.maskInfo')">
        <el-input v-model="dataForm.remark" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.maskInfo')" type="textarea" />
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('i18nView.information.cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()" :loading="saveBtn">{{ $t('i18nView.information.save') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { companyList, createArticle, updateArticle } from '@/api/subsidiary'
import mixin from '../mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      visible: false,
      saveBtn: false,
      dataForm: {
        fullName: '',
        name: '',
        enname: '',
        namekey: '',
        status: 1, // 状态 1:激活 2：锁定
        manager_user_id: '',
        manager: '',
        op_manager_user_id: '',
        op_manager: '',
        fax: '',
        tel: '',
        preffix: '',
        principal: '', // 负责人
        licenceno: '',
        address: '',
        remark: ''
      },
      listQuery: {
        page: 1,
        limit: 1000,
        keyword: '',
        status: 1
      },
      dataRule: {
        name: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.name'), trigger: 'blur' }
        ],
        fullname: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.companyRoyalty'), trigger: 'blur' }
        ],
        enname: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.tourGuideRoyalty'), trigger: 'blur' }
        ],
        namekey: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.key'), trigger: 'blur' }
        ],
        manager_user_id: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.companyManager'), trigger: 'blur' }
        ],
        op_manager_user_id: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.operationsManager'), trigger: 'blur' }
        ],
        principal: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.charger'), trigger: 'blur' }
        ],
        tel: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.telePhone'), trigger: 'blur' }
        ],
        fax: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.fax'), trigger: 'blur' }
        ],
        address: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.companyAddress'), trigger: 'blur' }
        ],
        licenceno: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.businessLicenseNo'), trigger: 'blur' }
        ],
        remark: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.maskInfo'), trigger: 'blur' }
        ],
        preffix: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.groupNumberPrefix'), trigger: 'blur' }
        ]
      },
      infoTypeList: []
    }
  },
  computed: {},
  created() {},
  methods: {
    init(item) {
      this.visible = true
      this.companyListData() // 操作经理，公司经理数据
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        // 编辑
        if (item) {
          this.dataForm = item
        } else {
          // 新增
          this.dataForm = {
            fullname: '',
            name: '',
            enname: '',
            namekey: '',
            status: 1, // 状态 1:激活 2：锁定
            manager_user_id: '',
            manager: '',
            op_manager_user_id: '',
            op_manager: '',
            fax: '',
            tel: '',
            preffix: '',
            principal: '', // 负责人
            licenceno: '',
            address: '',
            remark: ''
          }
        }
      })
    },
    // 操作经理，公司经理数据
    companyListData() {
      companyList(this.listQuery).then(response => {
        this.infoTypeList = response.data.data
      })
    },
    // 公司经理改变
    coChange(id) {
      let obj = {}
      obj = this.infoTypeList.find(item => {
        return item.id === id
      })
      this.dataForm.manager = obj.name
    },
    // 操作经理改变
    opChange(id) {
      let obj = {}
      obj = this.infoTypeList.find(item => {
        return item.id === id
      })
      this.dataForm.op_manager = obj.name
    },
    // 表单提交
    dataFormSubmitHandle() {
      this.$refs['dataForm'].validate(async valid => {
        this.saveBtn = true
        if (valid) {
          if (this.dataForm.id) {
            updateArticle(this.dataForm).then(response => {
              if (response.code === 2000) {
                this.$message({
                  type: 'success',
                  duration: 1000,
                  message: this.$t('i18nView.information.edit') + this.$t('i18nView.information.success'),
                  onClose: () => {
                    this.visible = false
                    this.saveBtn = false
                    this.$emit('callBcak', 'edit')
                  }
                })
              } else {
                this.$message.error(response.msg)
                this.saveBtn = false
              }
            })
          } else {
            createArticle(this.dataForm).then(response => {
              if (response.code === 2000) {
                this.$message({
                  type: 'success',
                  duration: 1000,
                  message: this.$t('i18nView.information.add') + this.$t('i18nView.information.success'),
                  onClose: () => {
                    this.visible = false
                    this.saveBtn = false
                    this.$emit('callBcak', 'add')
                  }
                })
              } else {
                this.$message.error(response.msg)
                this.saveBtn = false
              }
            })
          }
        }
      })
    }
  }
}
</script>
