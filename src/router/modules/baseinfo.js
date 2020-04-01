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
    },
    {
      path: 'price-inquiry',
      component: () => import('@/views/base-info/price-inquiry'),
      name: 'priceInquiry',
      meta: { title: 'priceInquiry' }
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
    }
  ]
}
export default baseInfoRouter
