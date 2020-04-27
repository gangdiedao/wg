<template>
  <el-tabs type="border-card" tab-position="left">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> 基本信息</span>
      我的行程
    </el-tab-pane>
    <el-tab-pane label="信息设置">
      <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      label-width="120px"
      @keyup.enter.native="dataFormSubmitHandle()"
    >
      <el-form-item prop="plan_group" :label="$t('i18nView.information.plan_group')">
        泰兰德/泰完美 6晚7天
      </el-form-item>
      <el-form-item prop="info_type_id" :label="$t('i18nView.information.infoType')">
        <el-select v-model="dataForm.info_type_id" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.infoType')" @change="typeChange">
          <el-option
            v-for="item in infoTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="plan_group" :label="$t('i18nView.information.plan_group')">
        <el-input v-model="dataForm.plan_group" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.plan_group')" />
      </el-form-item>
    </el-form>
    </el-tab-pane>
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
    trip
  }
}
</script>

<style>

</style>