import local from './local'

const viewName = 'guide'

export default {
  created() {
    if (!this.$i18n.getLocaleMessage('zh')[viewName]) {
      this.$i18n.mergeLocaleMessage('en', local.en)
      this.$i18n.mergeLocaleMessage('zh', local.zh)
    }
  },
  methods: {
    setTabOptions() {
      return [
        { key: '1', label: this.$t('guide.status.open') },
        { key: '2', label: this.$t('guide.status.close') },
        // { key: '0', label: this.$t('guide.status.all') },
      ]
    }
  }
}
