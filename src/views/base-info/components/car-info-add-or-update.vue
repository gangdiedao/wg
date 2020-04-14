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
      <el-form-item prop="pic" :label="$t('i18nView.information.pic')">
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
      <el-form-item prop="source" :label="$t('i18nView.information.city')">
        <el-select v-model="dataForm.source" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.city')">
          <el-option
            v-for="item in cityListData"
            :key="item.id"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="input_user_id" :label="$t('i18nView.information.creator')">
        <el-select v-model="dataForm.input_user_id" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.creator')">
          <el-option
            v-for="item in userListData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="pay_type_id" :label="$t('i18nView.information.payType')">
        <el-select v-model="dataForm.pay_type_id" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.payType')">
          <el-option
            v-for="item in payTypeListDatas"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="email" :label="$t('i18nView.information.email')">
        <el-input v-model="dataForm.email" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.email')" />
      </el-form-item>
      <el-form-item prop="files" :label="$t('i18nView.information.files')">
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
      <el-form-item prop="prorate_type" :label="$t('i18nView.information.calculationDays')">
        <el-select v-model="dataForm.prorate_type" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.calculationDays')">
          <el-option
            v-for="item in prorateTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="remark" :label="$t('i18nView.information.remarks')">
        <el-input v-model="dataForm.remark" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.remarks')" type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item prop="ukey" :label="$t('i18nView.information.UKey')">
        <el-input v-model="dataForm.ukey" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.UKey')" />
      </el-form-item>
    </el-form>
    <el-divider content-position="left">价格信息</el-divider>
    <carInfoPriceInfo ref="carInfoPriceInfo" />
    <el-divider content-position="left">车辆信息</el-divider>
    <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" size="small" @click="handleCreateUpdate()">
      {{ $t('i18nView.information.add') }}
    </el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="车编号" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.date" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="车牌号" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.name" />
        </template>
      </el-table-column>
      <el-table-column prop="date" label="司机" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.name" />
        </template>
      </el-table-column>
      <el-table-column prop="date" label="电话" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.name" />
        </template>
      </el-table-column>
      <el-table-column prop="date" label="类型" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.name" />
        </template>
      </el-table-column>
      <el-table-column prop="date" label="状态" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.name" />
        </template>
      </el-table-column>
      <el-table-column prop="date" label="备注" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.name" />
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('i18nView.information.cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('i18nView.information.save') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { create, update, upload, userList, cityList } from '@/api/car-info'
import carInfoPriceInfo from './car-info-price-info'
import mixin from '../mixin'

export default {
  components: { carInfoPriceInfo },
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
        enname: '',
        info_type_id: '',
        info_type_name: '',
        fax: '',
        input_user_id: '',
        input_organization_id: '',
        input_user_name: '',
        pay_type_id: '',
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
        ukey: '',
        filesArr: [],
        imagesArr: []
      },
      returnTypeFlag: 0,
      dataRule: {},
      infoTypeList: [],
      userListData: [],
      dialogImageUrl: '',
      cityListData: [],
      payTypeListDatas: [],
      prorateTypeList: [],
      priceTableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '',
          name: '',
          address: '',
          flag: 0
        }
      ],
      tableData: []
    }
  },
  computed: {},
  created() {
    this.infoTypeList = this.infoTypeListData()
    this.prorateTypeList = this.prorateTypeListData()
  },
  methods: {
    init(item) {
      this.visible = true
      this.getUserList()
      this.getCityList()
      this.getPayTypeList()
      this.$nextTick(() => {
        if (item) {
          this.dataForm = item
        } else {
          this.dataForm = {
            status: 1, // 状态 1:激活 2：锁定
            name: '',
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
    // 城市列表
    getCityList() {
      cityList({ type: 'city' }).then(response => {
        this.cityListData = response.data
      })
    },
    // 支付类型列表
    getPayTypeList() {
      cityList({ type: 'paymenttype' }).then(response => {
        this.payTypeListDatas = response.data
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
