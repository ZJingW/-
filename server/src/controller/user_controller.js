const { User } = require("../model")
const _ = require("lodash")//降低使用javascript的一个工具库
const RecordController = require("./record_controller")

module.exports = {
//获取学生用户的完整信息 一个
  async getStudentInfo(userId) {
    const student = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password", "deletedAt"] }
    })
    const room = await student.getRoom()
    const floor = await room.getFloor()
    const building = await floor.getBuilding()
    const getupProb = await RecordController.getUserProbability("getup", userId)
    const backProb = await RecordController.getUserProbability("back", userId)
    const cleanProb = await RecordController.getUserProbability("clean", userId)
    const info = Object.assign(student.dataValues, {
      roomNumber: room.number,
      floorId: floor.id,
      floorLayer: floor.layer,
      buildingId: building.id,
      buildingName: building.name,
      getupProb,
      backProb,
      cleanProb
    })
    return info
  },

//获取学生用户们的完整信息
 
  async getStudentsInfo(users) {
    const cloneUsers = _.cloneDeep(users)//深拷贝啊不影响users本身
    for (let user of cloneUsers) {
      delete user.dataValues.password
      delete user.dataValues.deletedAt
      const room = await user.getRoom()
      const floor = await room.getFloor()
      const building = await floor.getBuilding()
      Object.assign(user.dataValues, {
        roomNumber: room.number,
        floorId: floor.id,
        floorLayer: floor.layer,
        buildingId: building.id,
        buildingName: building.name
      })
    }
    return cloneUsers
  },

  async setStudentRoomNull(id) {
    const student = await User.findOne({ where: { id, role: "student" } })
    const result = await student.update({ roomId: null })
    return result
  }
}
