const ResBody = require("../struct/ResBody")
//自定义的中间件
/**
 * 使用了 koa-jwt 中间件后，如果没有token，
 * 或者token失效，该中间件会给出对应的错误信息。
 * 如果没有自定义中间件的话，会直接将 koa-jwt 暴露的错误信息直接返回给用户。
 */
module.exports = function() {
  return async function(ctx, next) {
    try {
      await next()
    } catch (err) {
      // 判断是否携带有错误码
      const messageArr = err.message.split("-")
      if (messageArr.length > 0 && !isNaN(parseInt(messageArr[0]))) {
        ctx.status = parseInt(messageArr[0])
        err.message = messageArr[1]
      } else {
        ctx.status = 500
      }
      // 返回错误
      ctx.body = new ResBody({
        success: false,
        msg: err.message
      })
      ctx.app.emit("error", err, ctx)
    }
  }
}
