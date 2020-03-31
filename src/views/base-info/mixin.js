import local from './local'

const viewName = 'i18nView'

export default {
  created() {
    if (!this.$i18n.getLocaleMessage('zh')[viewName]) {
      this.$i18n.mergeLocaleMessage('en', local.en)
      this.$i18n.mergeLocaleMessage('zh', local.zh)
    }
  },
  methods: {
    setCityOptions() {
      return [
        { key: 'all', label: this.$t('i18nView.areas.all') },
        { key: 'bangkok', label: this.$t('i18nView.areas.bangkok') },
        { key: 'pattaya', label: this.$t('i18nView.areas.pattaya') },
        { key: 'samed', label: this.$t('i18nView.areas.samed') },
        { key: 'rayong', label: this.$t('i18nView.areas.rayong') },
        { key: 'ayutthaya', label: this.$t('i18nView.areas.ayutthaya') },
        { key: 'huahin', label: this.$t('i18nView.areas.huahin') },
        { key: 'kanchanaburi', label: this.$t('i18nView.areas.kanchanaburi') },
        { key: 'samui', label: this.$t('i18nView.areas.samui') },
        { key: 'surat', label: this.$t('i18nView.areas.surat') },
        { key: 'kohchang', label: this.$t('i18nView.areas.kohchang') }
      ]
    },
    // 支付类型
    payTypeListData() {
      return [
        {
          id: 0,
          name: this.$t('i18nView.payTypeList.pay')
        },
        {
          id: 1,
          name: this.$t('i18nView.payTypeList.charges')
        },
        {
          id: 2,
          name: this.$t('i18nView.payTypeList.revenue')
        },
        {
          id: 3,
          name: this.$t('i18nView.payTypeList.tourGuidePays')
        },
        {
          id: 4,
          name: this.$t('i18nView.payTypeList.pays')
        },
        {
          id: 5,
          name: this.$t('i18nView.payTypeList.tourGuidePay')
        }
      ]
    },
    // 返佣类型
    returnTypeListData() {
      return [
        {
          id: 0,
          name: this.$t('i18nView.returnTypeList.noReturn')
        },
        {
          id: 1,
          name: this.$t('i18nView.returnTypeList.fixedReturn')
        },
        {
          id: 2,
          name: this.$t('i18nView.returnTypeList.consumptionPercentage')
        },
        {
          id: 3,
          name: this.$t('i18nView.returnTypeList.groupFinancialStaff')
        },
        {
          id: 4,
          name: this.$t('i18nView.returnTypeList.adultsAndChildren')
        }
      ]
    },
    // 计价方式
    valuationMethodListData() {
      return [
        {
          id: 0,
          name: this.$t('i18nView.information.unitPrice')
        },
        {
          id: 1,
          name: this.$t('i18nView.information.packagePrice')
        }
      ]
    },
    // 信息类型
    infoTypeListData() {
      return [
        {
          id: 0,
          name: this.$t('i18nView.information.team')
        },
        {
          id: 1,
          name: this.$t('i18nView.information.fit')
        }
      ]
    }
  }
}
