var app = getApp();

// 传完整URL的网络请求
function ccRequestWithURL(url, parameters, success, fail){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: parameters,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      // success
      wx.hideLoading()
      if (res.data.status == 0) {
        if (success) {
          console.log("parameters", parameters)
          console.log("success", res.data)
          typeof success == "function" && success(res.data.data)
        }
      } else {
        if (fail) {
          console.log("parameters", parameters)
          console.log("failInfo", res.data)
          typeof fail == "function" && fail(res.data)
        }
      }
    }, 
    fail: function (error) {
      // fail
      wx.hideLoading()
      console.log("parameters", parameters)
      console.log("error", error)
      if (fail) {
        typeof fail == "function" && fail(error)
      }
    }
  })
}

// 只传参网络请求
function ccRequest(path, parameters, success, fail) {
  // wx.showLoading()
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: app.globalData.host + path,
    data: parameters,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    }, // 设置请求的 header
    success: function (res) {
      // success
      wx.hideLoading()
      if (res.data.status == 0) {
        if (success) {
          console.log("parameters", parameters)
          console.log("success", res.data.data)
          typeof success == "function" && success(res.data.data)
        }
      } else {
        if (fail) {
          console.log("parameters", parameters)
          console.log("failInfo", res.data)
          typeof fail == "function" && fail(res.data)
        }
      }
    },
    fail: function (error) {
      // fail
      wx.hideLoading()
      console.log("parameters", parameters)
      console.log("error", error)
      if (fail) {
        typeof fail == "function" && fail(error)
      }
    }
  })
}

// 获取顶部图片地址
function getPicUrl (type, success, fail) {
    // var picUrl = ''
    // this.ccRequest('getpic', { 'type': type }, function success(data) {
    //   console.log('success' + data.myPicPath)
    //   picUrl = data.myPicPath
    //   if (success) {
    //     console.log('请求得到的顶部图片地址' + picUrl)
    //     typeof success == 'function' && success(picUrl)
    //   }
    // }, function fail(data) {
    // })
    wx.request({
    url: app.globalData.host + 'getpic',
    data: { 'type': type },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    }, // 设置请求的 header
    success: function (res) {
      // success
      wx.hideLoading()
      if (res.data.status == 0) {
        if (success) {
          console.log("parameters type", type)
          console.log('请求得到的顶部图片地址', res.data.data.myPicPath)
          typeof success == "function" && success(res.data.data.myPicPath)
        }
      } else {
        if (fail) {
          console.log("parameters type", type)
          console.log("failInfo", res.data)
          typeof fail == "function" && fail(res.data)
        }
      }
    },
    fail: function (error) {
      // fail
      wx.hideLoading()
      console.log("parameters type", type)
      console.log("error", error)
      if (fail) {
        typeof fail == "function" && fail(error)
      }
    }
  })
}

module.exports = {
  ccRequest: ccRequest,
  ccRequestWithURL: ccRequestWithURL,
  getPicUrl: getPicUrl
}