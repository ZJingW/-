module.exports = {
  //模型：告诉Sequelize如何映射数据库表的
  User: require("./user_model"),
  Token: require("./token_model"),
  CleanRecord: require("./cleanRecord_model"),
  BackRecord: require("./backRecord_model"),
  GetupRecord: require("./getupRecord_model"),
  Room: require("./room_model"),
  Floor: require("./floor_model"),
  Building: require("./building_model"),
  Cleaner: require("./cleaner_model"),
  Evaluate: require("./evaluate_model")
}
