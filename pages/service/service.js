var app = getApp()
let aboutusurl = app.globalData.host + 'Aboutserver'
var WxParse = require('../../wxParse/wxParse.js');

let requestUrl = app.globalData.host + 'getpic';
var CCRequest = require('../../utils/CCRequest');
var imageUtil = require('../../utils/util.js');
Page({
  data: {
    item: '',
    imagewidth: 0,//缩放后的宽 
    imageheight: 0,//缩放后的高
    picPath: '',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getpicRequest()
    this.prepareData()
  },

  /**
 * 请求动态时讯图片内容
 */
  getpicRequest: function () {
    var that = this
    CCRequest.ccRequest('getpic', { 'type': 6 }, function success(data) {
      that.setData({
        picPath: data.myPicPath
      })
      console.log(that.data.picPath)
    }, function fail(data) {
    })

  },

  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth - 15,
      imageheight: imageSize.imageHeight
    })
  },

  prepareData: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: aboutusurl,
      // data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data.status == 0) {
          wx.hideLoading()
          console.log(WxParse)
          console.log(res.data.data.content)
          var article = '<div>' + res.data.data.content + '</div>';
          /**
          * WxParse.wxParse(bindName , type, data, target,imagePadding)
          * 1.bindName绑定的数据名(必填)
          * 2.type可以为html或者md(必填)
          * 3.data为传入的具体数据(必填)
          * 4.target为Page对象,一般为this(必填)
          * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
          */
          WxParse.wxParse('article', 'html', article, that, 5);
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      // title: 'title', // 分享标题
      // desc: 'desc', // 分享描述
      path: 'pages/service/service' // 分享路径
    }
  }
})