<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
/**取消上传的动画效果 */
.el-upload-list__item {
  transition: none !important;
}
</style>
