/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const router = {
  path: '/group',
  component: Layout,
  redirect: '/group/list',
  name: 'group',
  alwaysShow: true,
  meta: {
    title: 'group',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/group/list'),
      name: 'groupList',
      meta: { title: 'groupList' }
    }
  ]
}
export default router