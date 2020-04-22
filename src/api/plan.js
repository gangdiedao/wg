import request from '@/utils/request'

// 获取团号
export function getPlanCodeDetail(params) {
  return request({
    url: '/admin/factordata/plansetting/detail',
    method: 'get',
    params
  })
}

// 设置团号
export function setPlanCode(data) {
  return request({
    url: '/admin/factordata/plansetting/save',
    method: 'post',
    data
  })
}

// 创建计划
export function addPlan(data) {
  return request({
    url: '/admin/factordata/plan/add',
    method: 'post',
    data
  })
}

// 编辑计划
export function editPlan(data) {
  return request({
    url: '/admin/factordata/plan/edit',
    method: 'post',
    data
  })
}
