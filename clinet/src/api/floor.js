import request from '@/utils/request'

export function getFloors(params) {
  return request({
    url: '/floor/getFloors',
    method: 'get',
    params
  })
}
//获取宿舍楼层的详细信息，包含了宿舍楼的保洁员与宿舍信息
export function getFloorsDetail(buildingId) {
  return request({
    url: '/floor/getFloorsDetail',
    method: 'get',
    params: { buildingId }
  })
}
//为楼层添加保洁人员
export function addCleanerToFloor(floorId, cleanerId) {
  return request({
    url: '/floor/addCleanerToFloor',
    method: 'post',
    data: { floorId, cleanerId }
  })
}
