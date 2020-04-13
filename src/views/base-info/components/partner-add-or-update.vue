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
      <el-form-item prop="info_type_id" :label="$t('i18nView.information.infoType')">
        <el-select v-model="dataForm.info_type_id" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.infoType')" @change="typeChange">
          <el-option
            v-for="item in infoTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="name" :label="$t('i18nView.information.name')">
        <el-input v-model="dataForm.name" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.name')" />
      </el-form-item>
      <el-form-item prop="logo" :label="$t('i18nView.information.icon')">
        <el-image
          v-if="dataForm.logo != ''"
          style="width: 100px; height: 100px"
          :src="dataForm.logo"
          fit="cover"
        />
        <el-upload
          ref="uploadIcon"
          class="upload-demo"
          style="display:inline-block"
          action="string"
          :show-file-list="false"
          :limit="1"
          :http-request="UploadIcon"
          :before-upload="onBeforeUploadImage"
          :on-exceed="handleExceed"
        >
          <el-button type="text" size="small">上传</el-button>
        </el-upload>
        <el-button type="text" size="small" style="display:inline-block" @click="deleteIcon">删除</el-button>
      </el-form-item>
      <el-form-item prop="imagesArr" :label="$t('i18nView.information.pic')">
        <el-upload
          class="upload-demo"
          action="string"
          :show-file-list="true"
          list-type="picture-card"
          :file-list="dataForm.imagesArr"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemoveImage"
          :http-request="UploadImage"
          :before-upload="onBeforeUploadImage"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item prop="url" :label="$t('i18nView.information.url')">
        <el-input v-model="dataForm.url" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.url')" />
      </el-form-item>
      <el-form-item prop="intro" :label="$t('i18nView.information.introduce')">
        <el-input v-model="dataForm.intro" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.introduce')" type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item prop="fullname" :label="$t('i18nView.information.fullName')">
        <el-input v-model="dataForm.fullname" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.fullName')" />
      </el-form-item>
      <el-form-item prop="code" :label="$t('i18nView.information.code')">
        <el-input v-model="dataForm.code" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.code')" />
      </el-form-item>
      <el-form-item prop="address" :label="$t('i18nView.information.address')">
        <el-input v-model="dataForm.address" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.address')" />
      </el-form-item>
      <el-form-item prop="contact" :label="$t('i18nView.information.contacts')">
        <el-input v-model="dataForm.contact" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.contacts')" />
      </el-form-item>
      <el-form-item prop="telphone" :label="$t('i18nView.information.telePhone')">
        <el-input v-model="dataForm.telphone" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.telePhone')" />
      </el-form-item>
      <el-form-item prop="fax" :label="$t('i18nView.information.fax')">
        <el-input v-model="dataForm.fax" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.fax')" />
      </el-form-item>
      <el-form-item prop="source" :label="$t('i18nView.information.touristDestination')">
        <el-select v-model="dataForm.source" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.touristDestination')">
          <el-option
            v-for="item in cityListData"
            :key="item.id"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="input_user_id" :label="$t('i18nView.information.creator')">
        <el-select v-model="dataForm.input_user_id" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.creator')" @change="userChange">
          <el-option
            v-for="item in userListData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="email" :label="$t('i18nView.information.email')">
        <el-input v-model="dataForm.email" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.email')" />
      </el-form-item>
      <el-form-item prop="filesArr" :label="$t('i18nView.information.files')">
        <el-upload
          class="upload-demo"
          action="string"
          :show-file-list="true"
          :http-request="UploadFile"
          :file-list="dataForm.filesArr"
          :on-remove="handleRemoveFile"
          :before-upload="onBeforeUploadFile"
        >
          <el-button type="primary" size="small">添加文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item prop="remark" :label="$t('i18nView.information.remarks')">
        <el-input v-model="dataForm.remark" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.remarks')" type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item prop="bookremark" :label="$t('i18nView.information.AccountBookRemark')">
        <el-input v-model="dataForm.bookremark" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.AccountBookRemark')" type="textarea" :rows="2" />
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('i18nView.information.cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('i18nView.information.save') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { create, update, upload, userList, cityList } from '@/api/partner'
import mixin from '../mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      visible: false,
      dialogVisible: false,
      currentDate: '',
      daterange: '',
      innerVisible: false,
      dataForm: {
        status: 1, // 状态 1:激活 2：锁定
        name: '',
        code: '',
        fullname: '',
        enname: '',
        info_type_id: '',
        info_type_name: '',
        fax: '',
        input_user_id: '',
        input_organization_id: '',
        input_user_name: '',
        logo: '',
        source: '',
        email: '',
        payType: '',
        address: '',
        url: '',
        contact: '',
        telphone: '',
        intro: '',
        remark: '',
        bookremark: '',
        filesArr: [],
        imagesArr: []
      },
      returnTypeFlag: 0,
      dataRule: {
        name: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.name'), trigger: 'blur' }
        ],
        info_type_id: [
          { required: true, message: this.$t('i18nView.information.select') + this.$t('i18nView.information.infoType'), trigger: 'blur' }
        ],
        logo: [
          { required: true, message: this.$t('i18nView.information.select') + this.$t('i18nView.information.icon'), trigger: 'blur' }
        ],
        imagesArr: [
          { required: true, message: this.$t('i18nView.information.select') + this.$t('i18nView.information.pic'), trigger: 'blur' }
        ],
        url: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.url'), trigger: 'blur' }
        ],
        intro: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.introduce'), trigger: 'blur' }
        ],
        fullname: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.fullName'), trigger: 'blur' }
        ],
        code: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.code'), trigger: 'blur' }
        ],
        address: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.address'), trigger: 'blur' }
        ],
        contact: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.contacts'), trigger: 'blur' }
        ],
        telphone: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.telePhone'), trigger: 'blur' }
        ],
        fax: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.fax'), trigger: 'blur' }
        ],
        source: [
          { required: true, message: this.$t('i18nView.information.select') + this.$t('i18nView.information.touristDestination'), trigger: 'blur' }
        ],
        input_user_id: [
          { required: true, message: this.$t('i18nView.information.select') + this.$t('i18nView.information.creator'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.email'), trigger: 'blur' }
        ],
        filesArr: [
          { required: true, message: this.$t('i18nView.information.select') + this.$t('i18nView.information.files'), trigger: 'blur' }
        ],
        remark: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.remarks'), trigger: 'blur' }
        ],
        bookremark: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.AccountBookRemark'), trigger: 'blur' }
        ]
      },
      infoTypeList: [],
      userListData: [],
      dialogImageUrl: '',
      cityListData: []
    }
  },
  computed: {},
  created() {
    this.infoTypeList = this.infoTypeListData()
  },
  methods: {
    init(item) {
      this.visible = true
      this.getUserList()
      this.getCityList()
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        if (item) {
          this.dataForm = item
        } else {
          this.dataForm = {
            status: 1, // 状态 1:激活 2：锁定
            name: '',
            code: '',
            fullname: '',
            enname: '',
            info_type_id: '',
            info_type_name: '',
            fax: '',
            input_user_id: '',
            input_organization_id: '',
            input_user_name: '',
            logo: '',
            source: '',
            email: '',
            payType: '',
            address: '',
            url: '',
            contact: '',
            telphone: '',
            intro: '',
            remark: '',
            bookremark: '',
            filesArr: [],
            imagesArr: []
          }
        }
      })
    },
    // 用户列表
    getUserList() {
      userList(this.listQuery).then(response => {
        this.userListData = response.data.data
      })
    },
    // 客源地列表
    getCityList() {
      cityList({ type: 'customersource' }).then(response => {
        this.cityListData = response.data
      })
    },
    // 信息类型改变
    typeChange(id) {
      let obj = {}
      obj = this.infoTypeList.find(item => {
        return item.id === id
      })
      this.dataForm.info_type_name = obj.name
    },
    // 创建者改变
    userChange(id) {
      let obj = {}
      obj = this.userListData.find(item => {
        return item.id === id
      })
      this.dataForm.input_user_name = obj.name
    },
    // 上传图片、图标之前
    onBeforeUploadImage(file) {
      if (
        file.type !== 'image/jpg' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/gif'
      ) {
        this.$message.error(this.$t('i18nView.information.uploadTip', { format: 'jpg、png、gif' }))
        return false
      }
      if (file.size / 1024 / 1024 > 10) {
        this.$message.error(this.$t('i18nView.information.uploadSize', { format: '10MB' }))
        return false
      }
    },
    // 上传图片、图标之前
    onBeforeUploadFile(file) {
      if (
        file.type !== 'application/vnd.ms-excel' &&
        file.type !== 'pplication/msword' &&
        file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
        file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        this.$message.error(this.$t('i18nView.information.uploadTip', { format: 'doc、docx、xls、xlsx' }))
        return false
      }
      if (file.size / 1024 / 1024 > 10) {
        this.$message.error(this.$t('i18nView.information.uploadSize', { format: '10MB' }))
        return false
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多只能上传1张图标`)
    },
    // 上传图标
    UploadIcon(param) {
      const formData = new FormData()
      formData.append('Filedata', param.file)
      upload(formData).then(response => {
        if (response.code === 2000) {
          this.$message({
            type: 'success',
            duration: 1000,
            message: this.$t('i18nView.information.upload') + this.$t('i18nView.information.success')
          })
          this.dataForm.logo = response.data.url
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    // 删除图标
    deleteIcon() {
      this.dataForm.logo = ''
      this.$refs.uploadIcon.clearFiles()
    },
    // 上传图片
    UploadImage(param) {
      const formData = new FormData()
      formData.append('Filedata', param.file)
      upload(formData).then(response => {
        if (response.code === 2000) {
          this.$message({
            type: 'success',
            duration: 1000,
            message: this.$t('i18nView.information.upload') + this.$t('i18nView.information.success')
          })
          this.dataForm.imagesArr.push(response.data)
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    // 查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 删除图片
    handleRemoveImage(file, fileList) {
      this.dataForm.imagesArr = fileList
    },
    // 上传文件
    UploadFile(param) {
      const formData = new FormData()
      formData.append('Filedata', param.file)
      upload(formData).then(response => {
        if (response.code === 2000) {
          this.$message({
            type: 'success',
            duration: 1000,
            message: this.$t('i18nView.information.upload') + this.$t('i18nView.information.success')
          })
          this.dataForm.filesArr.push(response.data)
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    // 删除文件
    handleRemoveFile(file, fileList) {
      this.dataForm.filesArr = fileList
    },
    // 表单提交
    dataFormSubmitHandle() {
      this.$refs['dataForm'].validate(async valid => {
        if (valid) {
          if (this.dataForm.id) {
            update(this.dataForm).then(response => {
              if (response.code === 2000) {
                this.$message({
                  type: 'success',
                  duration: 1000,
                  message: this.$t('i18nView.information.edit') + this.$t('i18nView.information.success'),
                  onClose: () => {
                    this.visible = false
                    this.$emit('callBcak', 'edit')
                  }
                })
              } else {
                this.$message.error(response.msg)
              }
            })
          } else {
            create(this.dataForm).then(response => {
              if (response.code === 2000) {
                this.$message({
                  type: 'success',
                  duration: 1000,
                  message: this.$t('i18nView.information.add') + this.$t('i18nView.information.success'),
                  onClose: () => {
                    this.visible = false
                    this.$emit('callBcak', 'add')
                  }
                })
              } else {
                this.$message.error(response.msg)
              }
            })
          }
        }
      })
    }
  }
}
</script>
