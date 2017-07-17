var imageUtil = require('../utils/util.js')
/**
 * 函数入口
 */
function TopBanner(bindName = 'topBannerData', data, target) {
    var that = target
    var dataSet = {}
    dataSet[bindName] = data // 对象解构 按照对应位置，对变量赋值，此时bindName的值就是data
    that.setData(dataSet)
    console.log('bindName')
    console.log(dataSet) // 显示传过来的对象
}

module.exports = {
    TopBanner: TopBanner
}