import request from '@/utils/request'

// 购物点列表
export function fetchList(query) {
  return request({
    url: '/admin/factordata/shoppoint/search',
    method: 'get',
    params: query
  })
}
// 购物店列表
export function shopList(query) {
  return request({
    url: '/admin/factordata/shop/search',
    method: 'get',
    params: query
  })
}
// 锁定,激活,删除
export function isLockOrDelete(data) {
  return request({
    url: '/admin/factordata/shoppoint/batsave',
    method: 'post',
    data
  })
}
// 新增
export function create(data) {
  return request({
    url: '/admin/factordata/shoppoint/add',
    method: 'post',
    data
  })
}
// 编辑
export function update(data) {
  return request({
    url: '/admin/factordata/shoppoint/edit',
    method: 'post',
    data
  })
}
