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
        { key: 'open', label: this.$t('guide.status.open') },
        { key: 'close', label: this.$t('guide.status.close') },
        { key: 'all', label: this.$t('guide.status.all') },
      ]
    }
  }
}
