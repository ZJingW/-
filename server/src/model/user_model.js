//后台的Model层，定义数据库表的结构 相当于数据库中表 通过define定义一个Model，就相当于定义了一种模型与数据表之间的映射关系，通过模型可以实现对表记录的增、删、改、查等操作。
const db = require("../db/index")
const { DataTypes, Model } = require("sequelize")
const bcypt = require("../utils/bcypt")

class User extends Model { //User继承来自Model。就有了一些操作数据库表的api
  static createUser(account, password) {
    const user = User.build({ account, password: bcypt.hash(password) })
    return user.save()//更新实例
  }
  static findByAccount(account) {
    return User.findOne({ where: { account } })
  }
  static findById(id) {
    return User.findOne({ where: { id } })
  }
}

User.init(
  {
    // User 表的 id 必须创建，否则 account 会被代替为用户 id
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    account: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100]
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "student" // 可能值：student admin superAdmin
    },
    name: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    checkTime: {
      comment: "入住宿舍时间",
      type: DataTypes.DATE
    }
  },
  {
    sequelize: db.sequelize,
    modelName: "user",
    paranoid: true //删除的时候物理上不会被删除，只是有一个删除deleteAt时间的字段
  }
)

module.exports = User
