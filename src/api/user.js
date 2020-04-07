import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/system/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/system/user/info',
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/system/user/logout',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/admin/system/user/update',
    method: 'post',
    data
  })
}

export function updatePwd(data) {
  return request({
    url: '/admin/system/user/updatepassword',
    method: 'post',
    data
  })
}
