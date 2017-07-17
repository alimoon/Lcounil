// newsdetail.js
var imageUtil = require('../../../utils/util.js');
var app = getApp();
let requestUrl = app.globalData.host + 'getpic';
var CCRequest = require('../../../utils/CCRequest');
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      id: options.id
    })
    this.getnewsdetailRequest(this.data.id)

  },
  /**
  * 请求动态时讯详情内容
  */
  getnewsdetailRequest: function (param) {
    var that = this
    CCRequest.ccRequest('newsdetail', { ID: param} , function success(data) {
      that.setData({
        newsdetaillist: data
      })
      wx.setNavigationBarTitle({
        title: that.data.newsdetaillist.Title
      })
      wx.hideLoading()
      //console.log(that.data.newsdetaillist.Content)
      var Content = '<div>' + that.data.newsdetaillist.Content + '</div>';
      /**
          * WxParse.wxParse(bindName , type, data, target,imagePadding)
          * 1.bindName绑定的数据名(必填)
          * 2.type可以为html或者md(必填)
          * 3.data为传入的具体数据(必填)
          * 4.target为Page对象,一般为this(必填)
          * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
          */
      WxParse.wxParse('Content', 'html', Content, that, 5);
      console.log(Content);
    }, function fail(data) {
      console.log(data)
    })

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