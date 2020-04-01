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
    setHotelTypeOptions() {
      return [
        { key: 'hotel', label: 'HOTEL' },
        { key: 'seaSide', label: 'Sea side/海边' },
        { key: 'city', label: 'City/市区' },
        { key: 'villa', label: 'Villa/别墅' },
        { key: 'resident', label: 'Resident/民宿' },
        { key: 'resort', label: 'Resort/度假村' },
        { key: 'poolVilla', label: 'pool villa/泳池别墅' },
        { key: 'poolAccess', label: 'pool Access' }
      ]
    },
    setPayOptions() {
      return [
        { key: '1', label: '公司支出(VOUCHER)' },
        { key: '2', label: '公司收费' },
        { key: '3', label: '公司收入' },
        { key: '4', label: '导游支出' },
        { key: '5', label: '公司支出' },
        { key: '6', label: '导游支出(VOUCHER)' }
      ]
    }
  }
}