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
        <el-select v-model="dataForm.foundation_shop_id" :placeholder="'请选择'+$t('i18nView.information.shop')">
          <el-option
            v-for="item in shopListData"
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
        <el-input v-model="dataForm.comptaxrate" :placeholder="'请输入'+$t('i18nView.information.taxRate')" type="number" />
      </el-form-item>
      <el-form-item prop="twoTaxRate" :label="$t('i18nView.information.twoTaxRate')">
        <el-input v-model="dataForm.comptaxrate2" :placeholder="'请输入'+$t('i18nView.information.twoTaxRate')" type="number" />
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('i18nView.information.cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('i18nView.information.save') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { shopList, create, update } from '@/api/shop-spot'
import mixin from '../mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      visible: false,
      dataForm: {
        foundation_shop_id: '',
        name: '',
        status: 1, // 状态 1:激活 2：锁定
        comptaxrate: '',
        comptaxrate2: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
        name: '',
        status: 1, // 状态 1:激活 2：锁定
        info_type_id: '',
        info_type_name: '',
        logo: '',
        url: '',
        intro: '',
        contact: '',
        telphone: '',
        email: ''
      },
      returnTypeFlag: 0,
      dataRule: {},
      shopListData: []
    }
  },
  computed: {},
  created() {},
  methods: {
    init(item) {
      this.visible = true
      this.getShopList()
      this.$nextTick(() => {
        if (item) {
          this.dataForm = item
        } else {
          this.dataForm = {
            foundation_shop_id: '',
            name: '',
            status: 1, // 状态 1:激活 2：锁定
            comptaxrate: '',
            comptaxrate2: ''
          }
        }
      })
    },
    getShopList() {
      shopList(this.listQuery).then(response => {
        this.shopListData = response.data.data
      })
    },
    // 表单提交
    dataFormSubmitHandle() {
      this.$refs['dataForm'].validate(async valid => {
        if (valid) {
          if (this.dataForm.id) {
            update(this.dataForm).then(response => {
              if (response.code === 2000) {
                this.$message({
                  type: 'success',
                  duration: 1000,
                  message: this.$t('i18nView.information.edit') + this.$t('i18nView.information.success'),
                  onClose: () => {
                    this.visible = false
                    this.$emit('callBcak', 'edit')
                  }
                })
              } else {
                this.$message.error(response.msg)
              }
            })
          } else {
            create(this.dataForm).then(response => {
              if (response.code === 2000) {
                this.$message({
                  type: 'success',
                  duration: 1000,
                  message: this.$t('i18nView.information.add') + this.$t('i18nView.information.success'),
                  onClose: () => {
                    this.visible = false
                    this.$emit('callBcak', 'add')
                  }
                })
              } else {
                this.$message.error(response.msg)
              }
            })
          }
        }
      })
    }
  }
}
</script>
