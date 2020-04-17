import request from '@/utils/request'

// 酒店列表
export function getHotelList(params) {
  return request({
    url: '/admin/factordata/hotel/search',
    method: 'get',
    params
  })
}
