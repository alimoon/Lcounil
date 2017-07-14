// pages/home/home.js
var app = getApp();
let requestUrl = app.globalData.host+'indexbanner';
var CCRequest = require('../../utils/CCRequest');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [
        {
            "ID":"2",
            "Desc":"平台简介",
            "Ctype":"2",
            "IsDelete":"0",
            "Aorder":"1",
            "Vtype":"1",
            "OldID":"2",
            "PicUrl": '../../images/homeinco/abstract.png'
        },
        {
            "ID":"3",
            "Desc":"动态时讯",
            "Ctype":"2",
            "IsDelete":"0",
            "Aorder":"2",
            "Vtype":"1",
            "OldID":"7",
            "PicUrl":'../../images/homeinco/news.png'
        },
        {
            "ID":"4",
            "Desc":"发展沿革",
            "Ctype":"2",
            "IsDelete":"0",
            "Aorder":"3",
            "Vtype":"0",
            "OldID":"3",
            "PicUrl":'../../images/homeinco/devalong.png'
        },
        {
            "ID":"6",
            "Desc":"专业模块",
            "Ctype":"1",
            "IsDelete":"0",
            "Aorder":"4",
            "Vtype":"0",
            "OldID":"1",
            "PicUrl":'../../images/homeinco/pro.png'
        },
        {
            "ID":"7",
            "Desc":"服务指南",
            "Ctype":"1",
            "IsDelete":"0",
            "Aorder":"6",
            "Vtype":"0",
            "OldID":"9",
            "PicUrl":'../../images/homeinco/server.png'
        },
        {
            "ID":"8",
            "Desc":"搜索",
            "Ctype":"1",
            "IsDelete":"0",
            "Aorder":"7",
            "Vtype":"1",
            "OldID":"10",
            "PicUrl":'../../images/homeinco/search.png'
        }
    ],
    indexbannerList: []
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.indexbannersRequest()
  },

  /**
   * 请求首页列表内容
   */
  indexbannersRequest: function () {
    var that = this
    CCRequest.ccRequest('indexbanner', {}, function success(data) {
        that.setData({
            indexbannerList: data
        })
    }, function fail(data) {
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