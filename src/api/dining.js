import request from '@/utils/request'

// 餐厅列表
export function getDiningList(params) {
  return request({
    url: '/admin/factordata/restaurant/search',
    method: 'get',
    params
  })
}

// 餐厅创建
export function addDining(data) {
  return request({
    url: '/admin/factordata/restaurant/add',
    method: 'post',
    data
  })
}

// 餐厅编辑
export function editDining(data) {
  return request({
    url: '/admin/factordata/restaurant/edit',
    method: 'post',
    data
  })
}

export function setStatus(data) {
  return request({
    url: '/admin/factordata/restaurant/batsave',
    method: 'post',
    data
  })
}
