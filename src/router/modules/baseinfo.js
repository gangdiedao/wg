/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const baseInfoRouter = {
  path: '/baseinfo',
  component: Layout,
  redirect: '/baseinfo/hotel',
  name: 'baseinfo',
  meta: {
    title: 'baseinfo',
    icon: 'table'
  },
  children: [
    {
      path: 'hotel',
      component: () => import('@/views/base-info/hotel'),
      name: 'hotelManage',
      meta: { title: 'hotelManage' }
    },
    {
      path: 'scenic',
      component: () => import('@/views/base-info/scenic'),
      name: 'scenicManage',
      meta: { title: 'scenicManage' }
    }
  ]
}
export default baseInfoRouter
