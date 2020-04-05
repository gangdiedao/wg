<template>
  <el-form>
    <el-form-item label="用户名">
      <div @click="imagecropperShow=true">
        <el-avatar :size="48" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
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
    <el-form-item label="英文名">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="英文名">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
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
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
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
