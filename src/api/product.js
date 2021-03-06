import request from '@/utils/request'

// 产品套餐列表
export function fetchList(query) {
  return request({
    url: '/admin/factordata/product/search',
    method: 'get',
    params: query
  })
}
// 餐厅列表
export function restaurantList(query) {
  return request({
    url: '/admin/factordata/restaurant/search',
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
// 组团社列表
export function companyList(query) {
  return request({
    url: '/admin/factordata/company/search',
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
    url: '/admin/factordata/product/batsave',
    method: 'post',
    data
  })
}
// 上传图片、文件
export function upload(data) {
  return request({
    url: '/admin/system/file/upload',
    method: 'post',
    data
  })
}
// 新增
export function createArticle(data) {
  return request({
    url: '/admin/factordata/product/add',
    method: 'post',
    data
  })
}
// 编辑
export function updateArticle(data) {
  return request({
    url: '/admin/factordata/product/edit',
    method: 'post',
    data
  })
}
