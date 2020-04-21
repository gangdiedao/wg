/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const router = {
  path: '/plan',
  component: Layout,
  redirect: '/plan/list',
  name: 'plan',
  alwaysShow: true,
  meta: {
    title: 'plan',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/plan/list'),
      name: 'planList',
      meta: { title: 'planList' }
    },
    {
      path: 'setting',
      component: () => import('@/views/plan/setting'),
      name: 'setplan',
      meta: { title: 'setplan' }
    }
  ]
}
export default router
