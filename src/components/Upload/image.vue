<template>
  <div>
    <el-upload
    v-bind="$attrs"
    :action="action"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove">
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  </div>
</template>
<script>
  export default {
    mounted() {
      console.log(this)
    },
    data() {
      return {
        action: process.env.VUE_APP_BASE_API + '/admin/system/file/upload',
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>