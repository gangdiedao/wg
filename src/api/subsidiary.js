import request from '@/utils/request'

// 子公司列表
export function fetchList(query) {
  return request({
    url: '/admin/factordata/subsidiary/search',
    method: 'get',
    params: query
  })
}
// 公司经理（用户列表）
export function companyList(query) {
  return request({
    url: '/admin/system/admin/lists',
    method: 'get',
    params: query
  })
}
// 锁定,激活,删除
export function isLockOrDelete(data) {
  return request({
    url: '/admin/factordata/subsidiary/batsave',
    method: 'post',
    data
  })
}
// 新增
export function createArticle(data) {
  return request({
    url: '/admin/factordata/subsidiary/add',
    method: 'post',
    data
  })
}
// 编辑
export function updateArticle(data) {
  return request({
    url: '/admin/factordata/subsidiary/edit',
    method: 'post',
    data
  })
}
