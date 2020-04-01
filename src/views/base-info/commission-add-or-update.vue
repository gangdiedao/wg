<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('i18nView.information.add')+'佣金' : $t('i18nView.information.edit')+'佣金'"
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
      <el-form-item prop="shopspot" :label="$t('i18nView.information.shopspot')">
        <el-select v-model="dataForm.shopspot" :placeholder="'请选择'+$t('i18nView.information.shopspot')">
          <el-option
            v-for="item in infoTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="name" :label="$t('i18nView.information.name')">
        <el-input v-model="dataForm.name" :placeholder="'请输入'+$t('i18nView.information.name')" />
      </el-form-item>
      <el-form-item prop="companyRoyalty" :label="$t('i18nView.information.companyRoyalty')">
        <el-input v-model="dataForm.companyRoyalty" :placeholder="'请输入'+$t('i18nView.information.companyRoyalty')" type="number" />
      </el-form-item>
      <el-form-item prop="tourGuideRoyalty" :label="$t('i18nView.information.tourGuideRoyalty')">
        <el-input v-model="dataForm.tourGuideRoyalty" :placeholder="'请输入'+$t('i18nView.information.tourGuideRoyalty')" type="number" />
      </el-form-item>
      <el-form-item prop="leaderRoyalty" :label="$t('i18nView.information.leaderRoyalty')">
        <el-input v-model="dataForm.leaderRoyalty" :placeholder="'请输入'+$t('i18nView.information.leaderRoyalty')" type="number" />
      </el-form-item>
      <el-form-item prop="companySecondRoyalty" :label="$t('i18nView.information.companySecondRoyalty')">
        <el-input v-model="dataForm.companySecondRoyalty" :placeholder="'请输入'+$t('i18nView.information.companySecondRoyalty')" type="number" />
      </el-form-item>
      <el-form-item prop="calculationType" :label="$t('i18nView.information.calculationType')">
        <el-select v-model="dataForm.calculationType" :placeholder="'请选择'+$t('i18nView.information.calculationType')">
          <el-option
            v-for="item in infoTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="showType" :label="$t('i18nView.information.showType')">
        <el-select v-model="dataForm.showType" :placeholder="'请选择'+$t('i18nView.information.showType')">
          <el-option
            v-for="item in infoTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="commissionType" :label="$t('i18nView.information.commissionType')">
        <el-select v-model="dataForm.commissionType" :placeholder="'请选择'+$t('i18nView.information.commissionType')">
          <el-option
            v-for="item in infoTypeList"
            :key="item.id"
            :label="item.name"
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
import mixin from './mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      visible: false,
      dataForm: {
        shopspot: '',
        name: '',
        companyRoyalty: '0.00',
        tourGuideRoyalty: '0.00',
        leaderRoyalty: '0.00',
        companySecondRoyalty: '0.00',
        calculationType: '',
        showType: '',
        commissionType: ''
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
