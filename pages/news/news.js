// news.js
var imageUtil = require('../../utils/util.js'); 
var app = getApp();
let requestUrl = app.globalData.host + 'getpic';
var CCRequest = require('../../utils/CCRequest');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   item: '',
   imagewidth: 0,//缩放后的宽 
   imageheight: 0,//缩放后的高
   picPath:'',
   newslist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getpicRequest()
    this.getnewslistRequest();
  },
  /**
   * 请求动态时讯图片内容
   */
  getpicRequest: function () {
    var that = this
    CCRequest.ccRequest('getpic', {'type':3}, function success(data) {
      that.setData({
        picPath: data.myPicPath
      })
      //console.log(that.data.picPath)
    }, function fail(data) {
    })

  },
  /**
   * 请求动态时讯列表内容
   */
  getnewslistRequest: function () {
    var that = this
    CCRequest.ccRequest('newslist', { }, function success(data) {
      that.setData({
        newslist: data
      })
      //console.log(that.data.newlist)
    }, function fail(data) {
    })

  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth-15,
      imageheight: imageSize.imageHeight
    })
  } ,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})