/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const router = {
  path: '/system',
  component: Layout,
  redirect: '/system/datadict',
  name: 'system',
  alwaysShow: true,
  meta: {
    title: 'system',
    icon: 'example'
  },
  children: [
    {
      path: 'parameter',
      component: () => import('@/views/system/parameter'),
      name: 'parameter',
      meta: { title: 'parameter' }
    },
    {
      path: 'datadict',
      component: () => import('@/views/system/datadict'),
      name: 'datadict',
      meta: { title: 'datadict' }
    },
    {
      path: 'lang',
      component: () => import('@/views/system/lang'),
      name: 'lang',
      meta: { title: 'lang' }
    },
    {
      path: 'confirmdetail',
      component: () => import('@/views/system/confirmdetail'),
      name: 'confirmdetail',
      meta: { title: 'confirmdetail' }
    }
  ]
}
export default router
