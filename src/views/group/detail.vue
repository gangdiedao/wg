<template>
  <el-tabs type="border-card" tab-position="left">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> 基本信息</span>
      我的行程
    </el-tab-pane>
    <el-tab-pane label="信息设置">信息设置</el-tab-pane>
    <el-tab-pane label="财务设置">财务设置</el-tab-pane>
    <el-tab-pane label="行程安排">
      <trip />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import defaultSettings from '@/settings'
import getPageTitle from '@/utils/get-page-title'
import store from '@/store'
import trip from './components/trip'

export default {
  name: '',
  beforeRouteEnter(to, from, next) {
    to.meta.title = to.query.code
    document.title = `${to.query.code} - ${defaultSettings.title}`
    next()
  },
  components: {
    trip
  }
}
</script>

<style>

</style>