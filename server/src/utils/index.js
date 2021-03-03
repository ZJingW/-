module.exports = {
  checkParams(paramsObj) {
    for (let key in paramsObj) {
      if (paramsObj[key] === undefined) {
        throw new Error(`参数不完整，缺少参数${key}`)
      }
    }
  }
}
