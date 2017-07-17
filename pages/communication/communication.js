// communication.js
var imageUtil = require('../../utils/util.js');
var TopBanner = require('../../DIYComponents/topbanner')
var app = getApp();
let requestUrl = app.globalData.host + 'getpic';
var CCRequest = require('../../utils/CCRequest');
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    CCRequest.getPicUrl(13, function success(picUrl){
      console.log('交流活动的URL' + picUrl)
      var dataSet = {
        src: picUrl
      }
      console.info(dataSet)
      TopBanner.TopBanner('dataSet',dataSet, that )
    })
  },

  // 页面顶部图片大小绑定
  imageLoad: function(e) {
    var imageSize = imageUtil.imageUtil(e)
    var dataSet = {
      size: {
        width: imageSize.imageWidth - 15,
        height: imageSize.imageHeight
      }
    }
    TopBanner.TopBanner('dataSet',dataSet, this)
  },
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