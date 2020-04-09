import request from '@/utils/request'

// 部门列表
export function getDeptList(params) {
  return request({
    url: '/admin/system/department/lists',
    method: 'get',
    params
  })
}

// 创建部门
export function createDept(data) {
  return request({
    url: '/admin/system/department/create',
    method: 'post',
    data
  })
}

// 修改部门
export function updateDept(data) {
  return request({
    url: '/admin/system/department/update',
    method: 'post',
    data
  })
}

// 删除部门
export function deleteDept(params) {
  return request({
    url: '/admin/system/department/delete',
    method: 'delete',
    params
  })
}

// 角色列表
export function getRoleList(params) {
  return request({
    url: '/admin/system/role/lists',
    method: 'get',
    params
  })
}

// 创建角色
export function createRole(data) {
  return request({
    url: '/admin/system/role/create',
    method: 'post',
    data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/admin/system/role/update',
    method: 'post',
    data
  })
}

// 删除角色
export function deleteRole(params) {
  return request({
    url: '/admin/system/role/delete',
    method: 'delete',
    params
  })
}

// 用户列表
export function getUserList(params) {
  return request({
    url: '/admin/system/admin/lists',
    method: 'get',
    params
  })
}

// 创建用户
export function createUser(data) {
  return request({
    url: '/admin/system/admin/create',
    method: 'post',
    data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/admin/system/admin/update',
    method: 'post',
    data
  })
}

// 锁定激活用户
export function setStatus(data) {
  return request({
    url: '/admin/system/admin/changestatus',
    method: 'post',
    data
  })
}

// 用户转移部门
export function moveToDept(data) {
  return request({
    url: '/admin/system/admin/movetodepartment',
    method: 'post',
    data
  })
}
