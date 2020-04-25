import request from '@/utils/request'

// 酒店列表
export function getHotelList(params) {
  return request({
    url: '/admin/factordata/hotel/search',
    method: 'get',
    params
  })
}

// 酒店详情
export function getHotelDetail(params) {
  return request({
    url: '/admin/factordata/hotel/detail',
    method: 'get',
    params
  })
}

// 酒店创建
export function addHotel(data) {
  return request({
    url: '/admin/factordata/hotel/add',
    method: 'post',
    data
  })
}

// 酒店编辑
export function editHotel(data) {
  return request({
    url: '/admin/factordata/hotel/edit',
    method: 'post',
    data
  })
}

export function setStatus(data) {
  return request({
    url: '/admin/factordata/hotel/batsave',
    method: 'post',
    data
  })
}
