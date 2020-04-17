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
    },
    {
      path: 'car-info',
      component: () => import('@/views/base-info/car-info'),
      name: 'carInfoManage',
      meta: { title: 'carInfoManage' }
    },
    {
      path: 'product',
      component: () => import('@/views/base-info/product'),
      name: 'productManage',
      meta: { title: 'productManage' }
    },
    {
      path: 'guide',
      name: 'guide',
      meta: { title: 'guide' },
      redirect: 'noRedirect',
      alwaysShow: true,
      component: () => import('@/views/guide/layout'),
      // hidden: true,
      children: [
        {
          path: 'list',
          component: () => import('@/views/guide/list'),
          name: 'guideList',
          meta: { title: 'guideList' }
        },
        {
          path: 'settlement',
          component: () => import('@/views/guide/settlement'),
          name: 'settlement',
          meta: { title: 'settlement' }
        },
        {
          path: 'deposit',
          component: () => import('@/views/guide/deposit'),
          name: 'deposit',
          meta: { title: 'deposit' }
        },
        {
          path: 'advance',
          component: () => import('@/views/guide/advance'),
          name: 'advance',
          meta: { title: 'advance' }
        }
      ]
    }
  ]
}
export default router
