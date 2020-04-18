import request from '@/utils/request'

// 景点列表
export function getScenicList(params) {
  return request({
    url: '/admin/factordata/scenery/search',
    method: 'get',
    params
  })
}

// 景点创建
export function addScenic(data) {
  return request({
    url: '/admin/factordata/scenery/add',
    method: 'post',
    data
  })
}

// 景点编辑
export function editScenic(data) {
  return request({
    url: '/admin/factordata/scenery/edit',
    method: 'post',
    data
  })
}

export function setStatus(data) {
  return request({
    url: '/admin/factordata/scenery/batsave',
    method: 'post',
    data
  })
}
