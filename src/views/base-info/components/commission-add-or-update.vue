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
      <el-form-item prop="foundation_shop_point_id" :label="$t('i18nView.information.shopspot')">
        <el-select v-model="dataForm.foundation_shop_point_id" :placeholder="this.$t('i18nView.information.select')+$t('i18nView.information.shopspot')" @change="shopSpotChange">
          <el-option
            v-for="item in shopSpotListData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="name" :label="$t('i18nView.information.name')">
        <el-input v-model="dataForm.name" :placeholder="this.$t('i18nView.information.input')+$t('i18nView.information.name')" />
      </el-form-item>
      <el-form-item prop="companyrate" :label="$t('i18nView.information.companyRoyalty')">
        <el-input v-model="dataForm.companyrate" :placeholder="this.$t('i18nView.information.input')+$t('i18nView.information.companyRoyalty')" type="number" />
      </el-form-item>
      <el-form-item prop="guiderate" :label="$t('i18nView.information.tourGuideRoyalty')">
        <el-input v-model="dataForm.guiderate" :placeholder="this.$t('i18nView.information.input')+$t('i18nView.information.tourGuideRoyalty')" type="number" />
      </el-form-item>
      <el-form-item prop="leaderrate" :label="$t('i18nView.information.leaderRoyalty')">
        <el-input v-model="dataForm.leaderrate" :placeholder="this.$t('i18nView.information.input')+$t('i18nView.information.leaderRoyalty')" type="number" />
      </el-form-item>
      <el-form-item prop="companyrate2" :label="$t('i18nView.information.companySecondRoyalty')">
        <el-input v-model="dataForm.companyrate2" :placeholder="this.$t('i18nView.information.input')+$t('i18nView.information.companySecondRoyalty')" type="number" />
      </el-form-item>
      <el-form-item prop="money_type" :label="$t('i18nView.information.calculationType')">
        <el-select v-model="dataForm.money_type" :placeholder="this.$t('i18nView.information.select')+$t('i18nView.information.calculationType')">
          <el-option
            v-for="item in computedTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="show_type" :label="$t('i18nView.information.showType')">
        <el-select v-model="dataForm.show_type" :placeholder="this.$t('i18nView.information.select')+$t('i18nView.information.showType')">
          <el-option
            v-for="item in showTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="type" :label="$t('i18nView.information.commissionType')">
        <el-select v-model="dataForm.type" :placeholder="this.$t('i18nView.information.select')+$t('i18nView.information.commissionType')">
          <el-option
            v-for="item in commissionTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('i18nView.information.cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()" :loading="saveBtn">{{ $t('i18nView.information.save') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { shopSpotList, create, update } from '@/api/commission'
import mixin from '../mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      visible: false,
      saveBtn: false,
      dataForm: {
        foundation_shop_id: '',
        foundation_shop_point_id: '',
        name: '',
        status: 1, // 状态 1:激活 2：锁定
        money_type: '',
        companyrate: '0.00',
        guiderate: '0.00',
        leaderrate: '0.00',
        companyrate2: '0.00',
        show_type: '',
        type: ''
      },
      listQuery: {
        page: 1,
        limit: 1000,
        start_date: '',
        end_date: '',
        orderByColumn: 'updated_at',
        orderByDirection: 'desc',
        foundation_shop_id: '',
        name: '',
        status: '',
        comptaxrate: '',
        comptaxrate2: ''
      },
      returnTypeFlag: 0,
      dataRule: {
        foundation_shop_point_id: [
          { required: true, message: this.$t('i18nView.information.select') + this.$t('i18nView.information.shopspot'), trigger: 'blur' }
        ],
        name: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.name'), trigger: 'blur' }
        ],
        companyrate: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.companyRoyalty'), trigger: 'blur' }
        ],
        guiderate: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.tourGuideRoyalty'), trigger: 'blur' }
        ],
        leaderrate: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.leaderRoyalty'), trigger: 'blur' }
        ],
        companyrate2: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.companySecondRoyalty'), trigger: 'blur' }
        ],
        money_type: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.calculationType'), trigger: 'blur' }
        ],
        show_type: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.showType'), trigger: 'blur' }
        ],
        type: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.commissionType'), trigger: 'blur' }
        ]
      },
      shopSpotListData: [],
      showTypeList: [],
      computedTypeList: [],
      commissionTypeList: []
    }
  },
  computed: {},
  created() {
    this.computedTypeList = this.computedTypeListData()
    this.showTypeList = this.showTypeListData()
    this.commissionTypeList = this.commissionTypeListData()
  },
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
            foundation_shop_point_id: '',
            name: '',
            status: 1, // 状态 1:激活 2：锁定
            money_type: '',
            companyrate: '0.00',
            guiderate: '0.00',
            leaderrate: '0.00',
            companyrate2: '0.00',
            show_type: '',
            type: ''
          }
        }
      })
    },
    // 获取购物点列表
    getShopList() {
      shopSpotList(this.listQuery).then(response => {
        this.shopSpotListData = response.data.data
      })
    },
    // 选择购物点改变
    shopSpotChange(id) {
      let obj = {}
      obj = this.shopSpotListData.find(item => {
        return item.id === id
      })
      this.dataForm.foundation_shop_id = obj.shop.id
    },
    // 表单提交
    dataFormSubmitHandle() {
      this.$refs['dataForm'].validate(async valid => {
        if (valid) {
          this.saveBtn = true
          if (this.dataForm.id) {
            update(this.dataForm).then(response => {
              if (response.code === 2000) {
                this.$message({
                  type: 'success',
                  duration: 1000,
                  message: this.$t('i18nView.information.edit') + this.$t('i18nView.information.success'),
                  onClose: () => {
                    this.visible = false
                    this.saveBtn = false
                    this.$emit('callBcak', 'edit')
                  }
                })
              } else {
                this.$message.error(response.msg)
                this.saveBtn = false
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
                    this.saveBtn = false
                    this.$emit('callBcak', 'add')
                  }
                })
              } else {
                this.$message.error(response.msg)
                this.saveBtn = false
              }
            })
          }
        }
      })
    }
  }
}
</script>
