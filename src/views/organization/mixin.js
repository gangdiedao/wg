import local from './local'

const viewName = 'organization'

export default {
  created() {
    if (!this.$i18n.getLocaleMessage('zh')[viewName]) {
      this.$i18n.mergeLocaleMessage('en', local.en)
      this.$i18n.mergeLocaleMessage('zh', local.zh)
    }
  },
  methods: {
    assign(a, b) {
      for(let i in a) {
        if (b[i] !== undefined) {
          a[i] = b[i]
        }
      }
      return a
    }
  }
}
