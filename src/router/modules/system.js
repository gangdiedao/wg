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
      path: 'datadict',
      component: () => import('@/views/system/datadict'),
      name: 'datadict',
      meta: { title: 'datadict' }
    }
  ]
}
export default router
