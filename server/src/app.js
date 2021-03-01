// ====   require here   ====
// 配置
//入口文件，所有的框架在这里引入
const { sysConfig } = require("./config")
// package
const path = require("path") //node的path函数
const Koa = require("koa") //koa框架
const Router = require("koa-router") //路由
const KoaBody = require("koa-body")  //post请求或者文件上传
const koaJwt = require("koa-jwt")//使用JWT认证HTTP请求 
const cors = require("@koa/cors")//用于跨域 协议、域名、端口号
const koaStatic = require("koa-static") //初期前端的静态文件
const KoaLoger = require("koa-logger")//提供了输出请求日志的功能，包括请求的url、状态码、响应时间、响应体大小等信息
// 自定义中间件
const errorHandle = require("./middle/error_handler")
const tokenChecker = require("./middle/token_checker")
// 其他  数据库的东西
const dbGenerator = require("./db/db_generator")
// ==== code from here ====

// 实例化
const app = new Koa()
const router = new Router()

// 建立数据库连接
dbGenerator()

// log
app.use(KoaLoger())

// 处理跨域
app.use(cors())

// 错误处理
app.use(errorHandle())

// 处理静态资源
const staticPath = "../static"
app.use(koaStatic(path.join(__dirname, staticPath)))

// 解析 Body
app.use(
  KoaBody({
    multipart: true, //支持文件上传
    formidable: {
      maxFieldsSize: 2000 * 1024 * 1024 //文件上传的大小
    }
  })
)

// jwt 处理   secret:密钥
app.use(
  koaJwt({ secret: sysConfig.tokenSalt }).unless({ //不需要验证token就可以访问到的api
    path: [
      /^\/api\/test/, //^ 表示必须以\开头  ^A  A开头   \转义 ？前面的0或者1 * 0或者多 $匹配字符串的结尾
      /^\/api\/user\/login/,
      /^\/api\/user\/register/,
      /^((?!\/api).)*$/ // 设置除了私有接口外的其它资源，可以不需要认证访问  ?!\/api不能是/api  
    ]
  })
)

app.use(tokenChecker())

// 创建路由
router.use("/api/user", require("./routes/user_router"))
router.use("/api/building", require("./routes/building_router"))
router.use("/api/floor", require("./routes/floor_router"))
router.use("/api/room", require("./routes/room_router"))
router.use("/api/evaluate", require("./routes/evaluate_router"))
router.use("/api/record", require("./routes/record_router"))
router.use("/api/cleaner", require("./routes/cleaner_router"))

app.use(router.routes())

app.listen(sysConfig.port)
console.log(`服务器运行在: http://localhost:${sysConfig.port}`)

/**
 * 
__dirname: 保存的是当前文件夹的路径
fs.readdirSync: 同步获取当前文件夹下的文件
require(filename): 获取文件夹中的内容
 */