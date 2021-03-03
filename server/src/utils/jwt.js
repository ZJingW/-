const jwt = require("jsonwebtoken") //签发与验证 JWT 的功能包
const { sysConfig } = require("../config")

/**
 * jwt 没有加密的JWT alg：none
 *header（头部） payload（数据） signature（签名）
 */

 //创建 Token 串  sysConfig.tokenSalt密钥
function getToken(payload) {
  return jwt.sign(payload, sysConfig.tokenSalt, { //签发token
    expiresIn: sysConfig.tokenExp
  })
  console.log(jwt.sign(payload, sysConfig.tokenSalt, { 
    expiresIn: sysConfig.tokenExp
  }))
}



//解析 Token
function getPayload(token) {
  return jwt.verify(token, sysConfig.tokenSalt,(error, decoded) => {
    if (error) {
      console.log(error.message)
      return
    }
    console.log(decoded)
}
  )}


module.exports = {
  getToken,
  getPayload
}
