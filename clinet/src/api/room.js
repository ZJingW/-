import request from '@/utils/request'
/*
query为空：获取系统内所有的 room
?floorId=[Number]：获取改楼层的所有 room
?buildingId=[Number]: 获取该宿舍楼的所有 room
?buildingId=[Number]&layer=[Number]: 获取该宿舍楼某一楼层的所有 room
*/
export function getRooms(params) {
  return request({
    url: '/room/getRooms',
    method: 'get',
    params
  })
}

//获取房间的所有信息，包含学生、宿舍楼、楼层
export function getRoomInfo(roomId) {
  return request({
    url: '/room/getRoomInfo',
    method: 'get',
    params: { roomId }
  })
}
