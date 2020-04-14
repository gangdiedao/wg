import request from '@/utils/request'

// 车辆信息列表
export function fetchList(query) {
  return request({
    url: '/admin/factordata/car/search',
    method: 'get',
    params: query
  })
}
// 用户列表
export function userList(query) {
  return request({
    url: '/admin/system/admin/lists',
    method: 'get',
    params: query
  })
}
// 客源地列表
export function cityList(query) {
  return request({
    url: '/admin/system/datadict/listbytype',
    method: 'get',
    params: query
  })
}
// 锁定,激活,删除
export function isLockOrDelete(data) {
  return request({
    url: '/admin/factordata/car/batsave',
    method: 'post',
    data
  })
}
// 上传
export function upload(data) {
  return request({
    url: '/admin/system/file/upload',
    method: 'post',
    data
  })
}
// 新增
export function create(data) {
  return request({
    url: '/admin/factordata/car/add',
    method: 'post',
    data
  })
}
// 编辑
export function update(data) {
  return request({
    url: '/admin/factordata/car/edit',
    method: 'post',
    data
  })
}
