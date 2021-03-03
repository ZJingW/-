//数据库连接与生成的方法
//Sequelize是一款基于Nodejs功能强大的异步ORM框架。
//ORM：Object-Relational Mapping，把关系数据库的表结构映射到对象上，通过面向对象的方式操作数据库
const { Sequelize } = require("sequelize")
const { databaseConfig } = require("../config")

class Db {
  constructor() {  //类Db的原型的constructor方法
    this.sequelize = this._connect()
  }
  _connect() {
    const { host, name, user, password } = databaseConfig
    //创建一个Sequelize实例连接数据库  参数：数据库名、用户名、密码、配置
    const sequelize = new Sequelize(name, user, password, {
      host: host,//主机地址
      dialect: "mysql",//数据库类型
      logging: databaseConfig.logging //是否在控制台数据建表语句
    })
    return sequelize
  }
  // 数据库连接测试（仅供调试使用）
  connectTest() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log("Debug：数据连接成功")
      })
      .catch(err => {
        console.error("数据库连接失败:", err)
      })
  }
}

module.exports = new Db()
