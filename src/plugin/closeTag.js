import store from '../store'
import router from '../router'

const toLastView =(visitedViews, view) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    if (view.name === 'Dashboard') {
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}

const closeTag = (view = router.app.$route) => {
  store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
    toLastView(visitedViews, view)
  })
}

const refreshSelectedTag = (view = router.app.$route) => {
  store.dispatch('tagsView/delCachedView', view).then(() => {
    const { fullPath } = view
    setTimeout(() => {
      router.replace({
        path: '/redirect' + fullPath
      })
    })
  })
}

export default {
  install(Vue, options = {}) {
    Vue.prototype.$closeTag = closeTag
    Vue.prototype.$refreshTag = refreshSelectedTag
  }
}