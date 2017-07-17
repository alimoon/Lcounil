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
    communicationList: [],
    imageWidth: 0,
    parameters: {}
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
    let dic = this.data.parameters
    dic.page = 1
    this.getcommunicationslistRequest(dic)
  },

  // 页面顶部图片大小绑定
  imageLoad: function(e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData ({
      imageWidth: imageSize.imageWidth - 15,
    })
    var dataSet = {
      size: {
        width: imageSize.imageWidth - 15,
        height: imageSize.imageHeight
      }
    }
    TopBanner.TopBanner('dataSet',dataSet, this)
  },
  
  /**
   * 请求交流活动列表内容
   */
  getcommunicationslistRequest: function (params) {
    var that = this
    this.setData({
      parameters: params
    })
    CCRequest.ccRequest('newslist', params,
      function success(data) {
        var arr = []
        arr = arr.concat(data)
        that.setData({
          communicationList: arr
        })
        // console.log(arr)
      }, function fail(data) {
      })

  },
  lower: function () {
    this.loadmoreData('add')
    console.log('scroll bottom action')
  },

  loadmoreData: function (parm) {
    let page = this.data.parameters.page
    page += 1
    let dic = this.data.parameters
    dic.page = page
    var that = this
    console.log('上拉加载')
    // console.info(dic)
    this.getcommunicationslistRequest(dic)
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