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

// 获取特定字典类型列表
export function getOtherDictList(params) {
  return request({
    url: '/admin/system/datadict/listbytype',
    method: 'get',
    params
  })
}

// 创建语言
export function addLang(data) {
  return request({
    url: '/admin/system/lang/create',
    method: 'post',
    data
  })
}

// 创建语言
export function updateLang(data) {
  return request({
    url: '/admin/system/lang/update',
    method: 'post',
    data
  })
}

// 删除语言
export function deleteLang(params) {
  return request({
    url: '/admin/system/lang/delete',
    method: 'delete',
    params
  })
}

// 语言列表
export function langList(params) {
  return request({
    url: '/admin/system/lang/lists',
    method: 'get',
    params
  })
}

// 参数详情
export function paramDetail(params) {
  return request({
    url: '/admin/system/parameter/detail',
    method: 'get',
    params
  })
}

// 保存更新参数
export function saveParam(data) {
  return request({
    url: '/admin/system/parameter/save',
    method: 'post',
    data
  })
}

// 确认书模板详情
export function confirmDetail(params) {
  return request({
    url: '/admin/system/template/confirmdetail',
    method: 'get',
    params
  })
}

// 保存更新确认书模板
export function saveConfirmTemp(data) {
  return request({
    url: '/admin/system/template/confirm',
    method: 'post',
    data
  })
}
