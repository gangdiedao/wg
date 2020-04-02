/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const router = {
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
    },
    {
      path: 'restaurant',
      component: () => import('@/views/base-info/restaurant'),
      name: 'restaurantManage',
      meta: { title: 'restaurantManage' }
    },
    {
      path: 'shop',
      component: () => import('@/views/base-info/shop'),
      name: 'shopManage',
      meta: { title: 'shopManage' }
    },
    {
      path: 'shop-spot',
      component: () => import('@/views/base-info/shop-spot'),
      name: 'shopSpotManage',
      meta: { title: 'shopSpotManage' }
    },
    {
      path: 'commission',
      component: () => import('@/views/base-info/commission'),
      name: 'commissionManage',
      meta: { title: 'commissionManage' }
    },
    {
      path: 'subsidiary',
      component: () => import('@/views/base-info/subsidiary'),
      name: 'subsidiaryManage',
      meta: { title: 'subsidiaryManage' }
    },
    {
      path: 'partner',
      component: () => import('@/views/base-info/partner'),
      name: 'partnerManage',
      meta: { title: 'partnerManage' }
    }
  ]
}
export default router
