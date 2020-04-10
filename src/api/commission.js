import request from '@/utils/request'

// 子公司列表
export function fetchList(query) {
  return request({
    url: '/admin/factordata/shoppointret/search',
    method: 'get',
    params: query
  })
}
// 购物点列表
export function shopSpotList(query) {
  return request({
    url: '/admin/factordata/shoppoint/search',
    method: 'get',
    params: query
  })
}
// 新增
export function create(data) {
  return request({
    url: '/admin/factordata/shoppointret/add',
    method: 'post',
    data
  })
}
// 编辑
export function update(data) {
  return request({
    url: '/admin/factordata/shoppointret/edit',
    method: 'post',
    data
  })
}
