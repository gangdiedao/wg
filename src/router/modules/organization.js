/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const router = {
  path: '/organization',
  component: Layout,
  redirect: '/organization/user',
  name: 'organization',
  meta: {
    title: 'organization',
    icon: 'user'
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/organization/user'),
      name: 'userManage',
      meta: { title: 'userManage' }
    },
    {
      path: 'menu',
      component: () => import('@/views/organization/menu'),
      name: 'menuManage',
      meta: { title: 'menuManage' }
    },
    {
      path: 'role',
      component: () => import('@/views/organization/role'),
      name: 'roleManage',
      meta: { title: 'roleManage' }
    },
    {
      path: 'department',
      component: () => import('@/views/organization/department'),
      name: 'departmentManage',
      meta: { title: 'departmentManage' }
    }
  ]
}
export default router
