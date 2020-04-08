import request from '@/utils/request'

// 创建字典
export function createDict(data) {
  return request({
    url: '/admin/system/datadict/create',
    method: 'post',
    data
  })
}

// 修改字典
export function updateDict(data) {
  return request({
    url: '/admin/system/datadict/update',
    method: 'post',
    data
  })
}

// 锁定激活字典
export function changeStatus(data) {
  return request({
    url: '/admin/system/datadict/changestatus',
    method: 'post',
    data
  })
}

// 字典列表
export function getDictList(params) {
  return request({
    url: '/admin/system/datadict/lists',
    method: 'get',
    params
  })
}


// 字典类型列表
export function getDictTypes() {
  return request({
    url: '/admin/system/datadict/dicttypes',
    method: 'get'
  })
}
