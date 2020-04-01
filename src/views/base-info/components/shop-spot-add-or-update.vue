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
      <el-form-item prop="shop" :label="$t('i18nView.information.shop')">
        <el-select v-model="dataForm.shop" :placeholder="'请选择'+$t('i18nView.information.shop')">
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
      <el-form-item prop="taxRate" :label="$t('i18nView.information.taxRate')">
        <el-input v-model="dataForm.taxRate" :placeholder="'请输入'+$t('i18nView.information.taxRate')" type="number" />
      </el-form-item>
      <el-form-item prop="twoTaxRate" :label="$t('i18nView.information.twoTaxRate')">
        <el-input v-model="dataForm.twoTaxRate" :placeholder="'请输入'+$t('i18nView.information.twoTaxRate')" type="number" />
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
        shop: '',
        name: '',
        taxRate: '',
        twoTaxRate: ''
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
