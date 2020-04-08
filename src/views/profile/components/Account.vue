<template>
  <el-form>
    <el-form-item :label="$t('profile.field.username')">
      <div @click="imagecropperShow=true">
        <el-avatar :size="48" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <image-cropper
        v-show="imagecropperShow"
        :key="imagecropperKey"
        :width="300"
        :height="300"
        url="https://httpbin.org/post"
        lang-type="en"
        @close="close"
        @crop-upload-success="cropSuccess"
      />
    </el-form-item>
    <el-form-item :label="$t('profile.field.name')">
      <el-input v-model.trim="formData.name" />
    </el-form-item>
    <el-form-item :label="$t('profile.field.nameEn')">
      <el-input v-model.trim="formData.name_en" />
    </el-form-item>
    <el-form-item :label="$t('profile.field.email')">
      <el-input v-model.trim="formData.email" />
    </el-form-item>
    <el-form-item :label="$t('profile.field.phone')">
      <el-input v-model.trim="formData.phone" type="number" />
    </el-form-item>
    <el-form-item :label="$t('profile.field.address')">
      <el-input v-model.trim="formData.address" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">{{ $t('actions.update') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
export default {
  components: {
    ImageCropper
  },
  props: {
    user: Object
  },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
      formData: {
        name: '',
        name_en: '',
        email: '',
        phone: '',
        address: ''
      }
    }
  },
  created() {
    Object.assign(this.formData, this.user)
  },
  methods: {
    submit() {
      this.$store.dispatch('user/update', this.formData).then(() => {
        this.$message({
          message: 'User information has been updated successfully',
          type: 'success'
        })
      }).catch(error => {
        this.$message({
          message: error,
          type: 'error'
        })
      })
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>
