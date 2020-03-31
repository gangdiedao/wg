<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('i18nView.information.add') : $t('i18nView.information.edit')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      label-width="120px"
      @keyup.enter.native="dataFormSubmitHandle()"
    >
      <el-form-item prop="selectData" :label="$t('i18nView.information.infoType')">
        <el-select v-model="dataForm.selectData" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="name" :label="$t('i18nView.information.name')">
        <el-input v-model="dataForm.name" :placeholder="$t('i18nView.information.name')" />
      </el-form-item>
      <el-form-item prop="url" :label="$t('i18nView.information.url')">
        <el-input v-model="dataForm.url" :placeholder="$t('i18nView.information.url')" />
      </el-form-item>
      <el-form-item prop="introduce" :label="$t('i18nView.information.introduce')">
        <el-input v-model="dataForm.introduce" :placeholder="$t('i18nView.information.introduce')" type="textarea" :rows="2" />
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('i18nView.information.cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('i18nView.information.confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
// import Cookies from 'js-cookie'
// import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      visible: false,
      dataForm: {
        selectData: '',
        name: '',
        url: '',
        introduce: ''
      },
      dataRule: {},
      options: [
        {
          id: 0,
          name: this.$t('i18nView.information.team')
        },
        {
          id: 1,
          name: this.$t('i18nView.information.fit')
        }
      ]
    }
  },
  computed: {},
  created() {},
  methods: {
    init(item) {
      this.visible = true
      this.$nextTick(() => {
        if (item) {
          this.dataForm = item
        }
      })
      // this.$nextTick(() => {
      //   if (item.id) {
      //     this.getInfo()
      //   }
      // })
    },
    // 上传图片之前
    uploadBeforeUploadHandle(file) {
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
    // 上传图片成功
    uploadSuccessHandle(result, file, fileList) {
      if (result.code) {
        return this.$message.error(result.msg)
      }
      this.quillEditor.insertEmbed(this.quillEditor.getSelection().index, 'image', result.data.src)
    },
    // 获取信息
    async getInfo() {
      try {
        const result = await this.$http.get(`/sys/mailtemplate/${this.dataForm.id}`)

        this.dataForm = result.data
        this.quillEditor.root.innerHTML = this.dataForm.content
      } catch (error) {
        this.$message.error(error.msg)
      }
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
