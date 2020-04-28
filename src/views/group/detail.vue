<template>
  <el-tabs type="border-card" tab-position="left">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> 基本信息</span>
      <baseInfo />
    </el-tab-pane>
    <el-tab-pane label="信息设置">
      <updateInfo />
    </el-tab-pane>
    <el-tab-pane label="财务设置">
      <finance />
    </el-tab-pane>
    <el-tab-pane label="行程安排">
      <trip />
    </el-tab-pane>
    <el-tab-pane label="文件管理">
      <span>文件管理</span>
    </el-tab-pane>
    <el-tab-pane label="VOUCHERS">
      <span>VOUCHERS</span>
    </el-tab-pane>
    <el-tab-pane label="确认书模板">
      <confirmtpl />
    </el-tab-pane>
    <el-tab-pane label="导游填报">
      <span>导游填报</span>
    </el-tab-pane>
    <el-tab-pane label="导游佣金">
      <span>导游佣金</span>
    </el-tab-pane>
    <el-tab-pane label="自费管理">
      <span>自费管理</span>
    </el-tab-pane>
    <el-tab-pane label="公司首收费">
      <span>公司首收费</span>
    </el-tab-pane>
    <el-tab-pane label="公司收入">
      <span>公司收入</span>
    </el-tab-pane>
    <el-tab-pane label="公司支出">
      <span>公司支出</span>
    </el-tab-pane>
    <el-tab-pane label="导游支出">
      <span>导游支出</span>
    </el-tab-pane>
    <el-tab-pane label="导游结账单">
      <span>导游结账单</span>
    </el-tab-pane>
    <el-tab-pane label="公司结账单">
      <span>公司结账单</span>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import defaultSettings from '@/settings'
import getPageTitle from '@/utils/get-page-title'
import store from '@/store'
import trip from './components/trip'
import baseInfo from './components/base-info'
import updateInfo from './components/update-info'
import finance from './components/finance'
import confirmtpl from './components/confirmtpl'

export default {
  data() {
    return {
      dataForm: {},
      dataRule: {}
    }
  },
  name: '',
  beforeRouteEnter(to, from, next) {
    to.meta.title = to.query.code
    document.title = `${to.query.code} - ${defaultSettings.title}`
    next()
  },
  components: {
    baseInfo,
    updateInfo,
    finance,
    confirmtpl,
    trip
  },
  created() {
    const { id } = this.$route.query
    console.log(id)
  },
  data() {
    return {
      id: ''
    }
  }
}
</script>

<style>

</style>