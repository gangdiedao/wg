import request from '@/utils/request'

// 子公司列表
export function fetchList(query) {
  return request({
    url: '/admin/factordata/shop/search',
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
// export function fetchArticle(id) {
//   return request({
//     url: '/vue-element-admin/article/detail',
//     method: 'get',
//     params: { id }
//   })
// }

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
    url: '/admin/factordata/shop/add',
    method: 'post',
    data
  })
}
// 编辑
export function updateArticle(data) {
  return request({
    url: '/admin/factordata/shop/edit',
    method: 'post',
    data
  })
}
