import request from '@/utils/request'

// 获取团号
export function getPlanCodeDetail(params) {
  return request({
    url: '/admin/factordata/plansetting/detail',
    method: 'get',
    params
  })
}
