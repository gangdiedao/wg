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
        <el-input v-model="dataForm.name" :placeholder="'请输入'+$t('i18nView.information.name')" />
      </el-form-item>
      <el-form-item prop="fullName" :label="$t('i18nView.information.fullName')">
        <el-input v-model="dataForm.fullName" :placeholder="'请输入'+$t('i18nView.information.fullName')" />
      </el-form-item>
      <el-form-item prop="englishName" :label="$t('i18nView.information.englishName')">
        <el-input v-model="dataForm.englishName" :placeholder="'请输入'+$t('i18nView.information.englishName')" />
      </el-form-item>
      <el-form-item prop="key" :label="$t('i18nView.information.key')">
        <el-input v-model="dataForm.key" :placeholder="'请输入'+$t('i18nView.information.key')" />
      </el-form-item>
      <el-form-item prop="companyManager" :label="$t('i18nView.information.companyManager')">
        <el-select v-model="dataForm.companyManager" :placeholder="'请选择'+$t('i18nView.information.companyManager')">
          <el-option
            v-for="item in infoTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="operationsManager" :label="$t('i18nView.information.operationsManager')">
        <el-select v-model="dataForm.operationsManager" :placeholder="'请选择'+$t('i18nView.information.operationsManager')">
          <el-option
            v-for="item in infoTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="charger" :label="$t('i18nView.information.charger')">
        <el-input v-model="dataForm.charger" :placeholder="'请输入'+$t('i18nView.information.charger')" />
      </el-form-item>
      <el-form-item prop="telePhone" :label="$t('i18nView.information.telePhone')">
        <el-input v-model="dataForm.telePhone" :placeholder="'请输入'+$t('i18nView.information.telePhone')" />
      </el-form-item>
      <el-form-item prop="fax" :label="$t('i18nView.information.fax')">
        <el-input v-model="dataForm.fax" :placeholder="'请输入'+$t('i18nView.information.fax')" />
      </el-form-item>
      <el-form-item prop="groupNumberPrefix" :label="$t('i18nView.information.groupNumberPrefix')">
        <el-input v-model="dataForm.groupNumberPrefix" :placeholder="'请输入'+$t('i18nView.information.groupNumberPrefix')" />
      </el-form-item>
      <el-form-item prop="businessLicenseNo" :label="$t('i18nView.information.businessLicenseNo')">
        <el-input v-model="dataForm.businessLicenseNo" :placeholder="'请输入'+$t('i18nView.information.businessLicenseNo')" />
      </el-form-item>
      <el-form-item prop="companyAddress" :label="$t('i18nView.information.companyAddress')">
        <el-input v-model="dataForm.companyAddress" :placeholder="'请输入'+$t('i18nView.information.companyAddress')" />
      </el-form-item>
      <el-form-item prop="maskInfo" :label="$t('i18nView.information.maskInfo')">
        <el-input v-model="dataForm.maskInfo" :placeholder="'请输入'+$t('i18nView.information.maskInfo')" type="textarea" />
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('i18nView.information.cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('i18nView.information.save') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import mixin from '../mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      visible: false,
      dataForm: {
        fullName: '',
        name: '',
        englishName: '',
        key: '',
        companyManager: '',
        operationsManager: '',
        fax: '',
        telePhone: '',
        groupNumberPrefix: '',
        businessLicenseNo: '',
        companyAddress: '',
        maskInfo: ''
      },
      returnTypeFlag: 0,
      dataRule: {},
      infoTypeList: [],
      cityList: [
        {
          id: 0,
          name: this.$t('i18nView.areas.bangkok')
        },
        {
          id: 1,
          name: this.$t('i18nView.areas.pattaya')
        },
        {
          id: 3,
          name: this.$t('i18nView.areas.samed')
        },
        {
          id: 4,
          name: this.$t('i18nView.areas.rayong')
        },
        {
          id: 5,
          name: this.$t('i18nView.areas.ayutthaya')
        },
        {
          id: 6,
          name: this.$t('i18nView.areas.huahin')
        },
        {
          id: 7,
          name: this.$t('i18nView.areas.kanchanaburi')
        },
        {
          id: 8,
          name: this.$t('i18nView.areas.samui')
        },
        {
          id: 9,
          name: this.$t('i18nView.areas.surat')
        },
        {
          id: 10,
          name: this.$t('i18nView.areas.kohchang')
        }
      ],
      valuationMethodList: [],
      creatorList: [
        {
          id: 0,
          name: this.$t('i18nView.creatorList.zhangshan')
        },
        {
          id: 1,
          name: this.$t('i18nView.creatorList.liudehua')
        },
        {
          id: 2,
          name: this.$t('i18nView.creatorList.zhangxueyou')
        },
        {
          id: 3,
          name: this.$t('i18nView.creatorList.zhoujielun')
        }
      ],
      returnTypeList: [],
      payTypeList: []
    }
  },
  computed: {},
  created() {
    this.payTypeList = this.payTypeListData()
    this.returnTypeList = this.returnTypeListData()
    this.valuationMethodList = this.valuationMethodListData()
    this.infoTypeList = this.infoTypeListData()
  },
  methods: {
    init(item) {
      this.visible = true
      this.$nextTick(() => {
        if (item) {
          this.dataForm = item
        }
      })
    },
    // 上传文件之前
    onBeforeUploadImage(file) {
      if (
        file.type !== 'image/jpg' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/gif'
      ) {
        this.$message.error(this.$t('upload.tip', { format: 'jpg、png、gif' }))
        return false
      }
    },
    // 上传文件
    UploadImage(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      this.$http.post(
        '/school/student/import',
        formData
      ).then(({ data: res }) => {
        if (res.code === 0) {
          this.$message({
            message: '导入成功',
            type: 'success'
          })
          this.query()
        } else {
          this.$message.error(res.msg || '导入失败')
        }
      }).catch((e) => {
        this.$message.error(e.msg || '导入失败')
      })
    },
    // 返佣改变
    returnTypeChange(e) {
      this.returnTypeFlag = e
    },
    // 表单提交
    dataFormSubmitHandle() {
      this.$refs['dataForm'].validate(async valid => {
        if (valid) {
          try {
            await this.$http[!this.dataForm.id ? 'post' : 'put'](
              '/sys/mailtemplate',
              this.dataForm,
              {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
              }
            )

            this.$message({
              message: this.$t('prompt.success'),
              type: 'success',
              duration: 500,
              onClose: () => {
                this.visible = false
                this.$emit('refreshDataList')
              }
            })
          } catch (error) {
            this.$message.error(error.msg)
          }
        }
      })
    }
  }
}
</script>
