import request from '@/utils/request'
//增加保洁员
export function addCleaner({ name, phone, buildingId }) {
  return request({
    url: '/cleaner/addCleaner',
    method: 'post',
    data: { name, phone, buildingId }
  })
}
//删除保洁员
export function delCleaner(cleanerId) {
  return request({
    url: '/cleaner/delCleaner',
    method: 'delete',
    params: { cleanerId }
  })
}
