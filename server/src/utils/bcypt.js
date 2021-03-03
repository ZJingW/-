//后台某些被复用的方法，抽离在utils目录下
const bcrypt = require("bcryptjs")
const { sysConfig } = require("../config")

function hash(password) {
  //加密的幂次 默认是10 sysConfig.pwdSaltRound
  //同步加密  随机字符串
  var salt = bcrypt.genSaltSync(sysConfig.pwdSaltRound)
  //对明文就是密码进行加密
  let result = bcrypt.hashSync(password, salt)
  return result
}

function verify(password, hashPassword) {
  //验证比对，返回true表示一致，false表示不一致
  return bcrypt.compareSync(password, hashPassword)
}

module.exports = {
  hash,
  verify
}
