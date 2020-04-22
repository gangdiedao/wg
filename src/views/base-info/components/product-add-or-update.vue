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
      <el-form-item prop="plan_group" :label="$t('i18nView.information.plan_group')">
        <el-input v-model="dataForm.plan_group" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.plan_group')" />
      </el-form-item>
      <el-form-item prop="code" :label="$t('i18nView.information.code')">
        <el-input v-model="dataForm.code" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.code')" />
      </el-form-item>
      <el-form-item prop="name" :label="$t('i18nView.information.name')">
        <el-input v-model="dataForm.name" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.name')" />
      </el-form-item>
      <el-form-item prop="op_organization_id" :label="$t('i18nView.information.operator')">
        <el-select v-model="dataForm.op_organization_id" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.operator')" @change="coChange">
          <el-option
            v-for="item in userListArr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="sale_organization_id" :label="$t('i18nView.information.seller')">
        <el-select v-model="dataForm.sale_organization_id" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.seller')" @change="coChange">
          <el-option
            v-for="item in userListArr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="company_id" :label="$t('i18nView.information.company_name')">
        <el-select v-model="dataForm.company_id" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.company_name')" @change="coChange">
          <el-option
            v-for="item in companyListArr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
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
    <el-divider content-position="left">计划信息</el-divider>
      <el-form-item prop="plan_day" :label="$t('i18nView.information.tripDays')">
        <el-input v-model="dataForm.plan_day" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.tripDays')">
          <template slot="append">(Exp:2-2-1 5N7D)</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="from_city" :label="$t('i18nView.information.origin')">
        <el-input v-model="dataForm.from_city" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.origin')">
          <template slot="append">(Exp: 杭州 - 曼谷)</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="flight" :label="$t('i18nView.information.flight')">
        <el-input v-model="dataForm.flight" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.flight')">
          <template slot="append">(Exp:FT1 1530/1700; FT3 2300/0100+1 次日凌晨1点)</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="party_op" :label="$t('i18nView.information.firstPartyOperation')">
        <el-input v-model="dataForm.party_op" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.firstPartyOperation')" />
      </el-form-item>
      <el-form-item prop="source" :label="$t('i18nView.information.touristDestination')">
        <el-select v-model="dataForm.source" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.touristDestination')" @change="coChange">
          <el-option
            v-for="item in cityListData"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="market" :label="$t('i18nView.information.market')">
        <el-select v-model="dataForm.market" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.market')" @change="coChange">
          <el-option
            v-for="item in marketListData"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="shopping" :label="$t('i18nView.information.buy')">
        <el-select v-model="dataForm.shopping" multiple :placeholder="$t('i18nView.information.select')+$t('i18nView.information.buy')" @change="coChange">
          <el-option
            v-for="item in buyListDatas"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('i18nView.information.cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('i18nView.information.save') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { createArticle, updateArticle, upload, userList, companyList, cityList } from '@/api/product'
import mixin from '../mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      visible: false,
      dialogVisible: false,
      dataForm: {
        info_type_id: '',
        info_type_name: '',
        name: '',
        status: 1, // 状态 1:激活 2：锁定
        url: '',
        imagesArr: [],
        filesArr: [],
        intro: '',
        contact: '',
        telphone: '',
        email: '',
        logo: ''
      },
      listQuery: {
        page: 1,
        limit: 1000,
        keyword: '',
        status: 1
      },
      listQuery2: {
        page: 1,
        limit: 1000,
      },
      dataRule: {
        info_type_id: [
          { required: true, message: this.$t('i18nView.information.select') + this.$t('i18nView.information.infoType'), trigger: 'blur' }
        ],
        name: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.name'), trigger: 'blur' }
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
        contact: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.contacts'), trigger: 'blur' }
        ],
        telphone: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.telePhone'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.email'), trigger: 'blur' }
        ],
        filesArr: [
          { required: true, message: this.$t('i18nView.information.select') + this.$t('i18nView.information.files'), trigger: 'blur' }
        ]
      },
      userListArr: [],
      infoTypeList: [],
      companyListArr: [],
      cityListData: [],
      marketListData: [],
      buyListDatas: [],
      dialogImageUrl: ''
    }
  },
  computed: {},
  created() {
    this.infoTypeList = this.infoTypeListData()
  },
  methods: {
    init(item) {
      this.visible = true
      this.userListData()
      this.companyListData()
      this.getCityList()
      this.buyListData()
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        if (item) {
          this.dataForm = item
        } else {
          this.dataForm = {
            info_type_id: '',
            info_type_name: '',
            name: '',
            status: 1, // 状态 1:激活 2：锁定
            url: '',
            imagesArr: [],
            filesArr: [],
            intro: '',
            contact: '',
            telphone: '',
            email: '',
            logo: ''
          }
        }
      })
    },
    // 操作者
    userListData() {
      userList(this.listQuery).then(response => {
        this.userListArr = response.data.data
      })
    },
    // 组团社列表
    companyListData() {
      companyList(this.listQuery2).then(response => {
        this.companyListArr = response.data.data
      })
    },
    // 客源地列表
    getCityList() {
      cityList({ type: 'customersource' }).then(response => {
        this.cityListData = response.data
      })
    },
    // 市场列表
    getCityList() {
      cityList({ type: 'shichangrex' }).then(response => {
        this.marketListData = response.data
      })
    },
    // 购物列表
    buyListData() {
      cityList({ type: 'shopping' }).then(response => {
        this.buyListDatas = response.data
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
    coChange(){},
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
            updateArticle(this.dataForm).then(response => {
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
            createArticle(this.dataForm).then(response => {
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
