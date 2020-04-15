<template>
  <div :class="{'hidden': !showIcon}">
    <el-upload
    :action="action"
    name="Filedata"
    :with-credentials="true"
    :before-upload="beforeUpdate"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-exceed="handleExceed"
    :file-list="fileList"
    v-bind="$attrs"
    ref="upload">
    <i class="el-icon-plus"></i>
  </el-upload>
  <viewer :images="images" ref="viewer"
    @inited="inited"
  >
    <img v-for="src in images" :src="src" :key="src" style="display: none;">
  </viewer>
  <!-- <el-dialog :visible.sync="dialogVisible" append-to-body>
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog> -->
  </div>
</template>
<script>
  export default {
    props: {
      files: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        action: process.env.VUE_APP_BASE_API + '/admin/system/file/upload',
        // dialogImageUrl: '',
        // dialogVisible: false,
        fileList: this.files,
        images: []
      };
    },
    watch: {
      files(value) {
        this.fileList = value || []
      }
    },
    computed: {
      showIcon() {
        if (this.$attrs.limit && this.fileList) {
          return this.fileList.length < this.$attrs.limit
        }
        return true
      }
    },
    methods: {
      inited (viewer) {
        this.$viewer = viewer
      },
      showViewer() {
        this.$viewer.show()
      },
      setFiles(fileList) {
        let list = fileList.map(item => {
          if (item.response) {
            return item.response.data
          } else {
            return item
          }
        })
        this.$emit('update:files', list)
      },
      handleRemove(file, fileList) {
        this.fileList = fileList
        this.setFiles(fileList)
      },
      handlePictureCardPreview(file) {
        this.images = [file.url]
        // this.dialogImageUrl = file.url;
        // this.dialogVisible = true;
        this.showViewer()
      },
      handleSuccess(response, file, fileList) {
        this.fileList = fileList
        this.setFiles(fileList)
      },
      handleError(err, file, fileList) {
        this.$message({
          message: err,
          type: 'error'
        })
      },
      beforeUpdate(file) {
        if (file.size > this.$config.uploadFileMaxSize) {
          this.$notify({
            title: 'error',
            message: `${file.name}文件过大`,
            type: 'warning'
          })
          return false
        }
      },
      handleExceed(files) {
        this.$notify({
          title: 'error',
          message: `最多能上传${this.$attrs.limit}张图片`,
          type: 'warning'
        })
      }
    }
  }
</script>
<style>
  .hidden .el-upload {
    display: none !important;
  }
</style>