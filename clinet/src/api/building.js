import request from '@/utils/request'
//获取所有的宿舍楼
export function getBuildings() {
  return request({
    url: '/building/getBuildings',
    method: 'get'
  })
}
//获取可以管理的宿舍楼，超级管理员可以管理所有宿舍楼
export function getManageBuildings() {
  return request({
    url: '/building/getManageBuildings',
    method: 'get'
  })
}
//获取宿舍楼的详细信息
export function getBuildingInfo(buildingId) {
  return request({
    url: '/building/getBuildingInfo',
    method: 'get',
    params: { buildingId }
  })
}
//添加宿舍楼，包含宿舍与房间信息
export function addBuildingWithRoom({ name, floorCount, roomCount }) {
  return request({
    url: '/building/addBuildingWithRoom',
    method: 'post',
    data: { name, floorCount, roomCount }
  })
}
//删除宿舍楼
export function delBuilding(id) {
  return request({
    url: '/building/delBuilding',
    method: 'delete',
    params: { id }
  })
}
//由buildingid获取对应宿舍楼的管理员表格信息
export function getAdminTableData(buildingId) {
  return request({
    url: '/building/getAdminTableData',
    method: 'get',
    params: { buildingId }
  })
}
//为宿舍楼添加管理员
export function addAdminToBuilding(adminAccount, buildingId) {
  return request({
    url: '/building/addAdminToBuilding',
    method: 'post',
    data: { adminAccount, buildingId }
  })
}
//移除宿舍楼管理员
export function removeBuildingAdmin(adminId, buildingId) {
  return request({
    url: '/building/removeBuildingAdmin',
    method: 'delete',
    params: { adminId, buildingId }
  })
}
//由buildingid获取对应宿舍楼的清洁员表格信息
export function getCleanerTableData(buildingId) {
  return request({
    url: '/building/getCleanerTableData',
    method: 'get',
    params: { buildingId }
  })
}
