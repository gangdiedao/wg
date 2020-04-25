import request from '@/utils/request'

// 导游创建
export function addGuide(data) {
  return request({
    url: '/admin/factordata/guide/add',
    method: 'post',
    data
  })
}

// 导游列表
export function guideList(params) {
  return request({
    url: '/admin/factordata/guide/search',
    method: 'get',
    params
  })
}

// 导游编辑
export function editGuide(data) {
  return request({
    url: '/admin/factordata/guide/edit',
    method: 'post',
    data
  })
}

// 导游详情
export function guideDetail(params) {
  return request({
    url: '/admin/factordata/guide/detail',
    method: 'get',
    params
  })
}

// 设置导游状态
export function setGuideStatus(data) {
  return request({
    url: '/admin/factordata/guide/batsave',
    method: 'post',
    data
  })
}

// 押金创建
export function addDeposit(data) {
  return request({
    url: '/admin/factordata/guidedeposit/add',
    method: 'post',
    data
  })
}

// 押金列表
export function depositList(params) {
  return request({
    url: '/admin/factordata/guidedeposit/search',
    method: 'get',
    params
  })
}

// 押金编辑
export function editDeposit(data) {
  return request({
    url: '/admin/factordata/guidedeposit/edit',
    method: 'post',
    data
  })
}

// 押金详情
export function depositDetail(params) {
  return request({
    url: '/admin/factordata/guidedeposit/detail',
    method: 'get',
    params
  })
}

// 设置押金状态
export function setDepositStatus(data) {
  return request({
    url: '/admin/factordata/guidedeposit/batsave',
    method: 'post',
    data
  })
}

// 删除押金
export function removeDeposit(data) {
  return request({
    url: '/admin/factordata/guidedeposit/del',
    method: 'post',
    data
  })
}

// 预支创建
export function addAdvance(data) {
  return request({
    url: '/admin/factordata/guideadvance/add',
    method: 'post',
    data
  })
}

// 预支列表
export function advanceList(params) {
  return request({
    url: '/admin/factordata/guideadvance/search',
    method: 'get',
    params
  })
}

// 预支编辑
export function editAdvance(data) {
  return request({
    url: '/admin/factordata/guideadvance/edit',
    method: 'post',
    data
  })
}

// 预支详情
export function advanceDetail(params) {
  return request({
    url: '/admin/factordata/guideadvance/detail',
    method: 'get',
    params
  })
}

// 设置预支状态
export function setAdvanceStatus(data) {
  return request({
    url: '/admin/factordata/guideadvance/batsave',
    method: 'post',
    data
  })
}
