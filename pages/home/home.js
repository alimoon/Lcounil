// pages/home/home.js
var CCRequest = require('../../utils/CCRequest');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [
        {
            "ID":"1",
            "Desc":"平台简介",
            "PageUrl": "../aboutus/aboutus",
            "PicUrl": '../../images/homeinco/abstract.png'
        },
        {
            "ID":"2",
            "Desc":"动态时讯",
            "PageUrl": "../news/news",
            "PicUrl":'../../images/homeinco/news.png'
        },
        {
            "ID":"3",
            "Desc":"发展沿革",
            "PageUrl": "../history/history",
            "PicUrl":'../../images/homeinco/devalong.png'
        },
        {
            "ID":"4",
            "Desc":"专业模块",
            "PageUrl": "../major/major",
            "PicUrl":'../../images/homeinco/pro.png'
        },
        {
            "ID":"5",
            "Desc":"服务指南",
            "PageUrl": "../service/service",
            "PicUrl":'../../images/homeinco/server.png'
        },
        {
            "ID":"6",
            "Desc":"搜索",
            "PageUrl": "../search/search",
            "PicUrl":'../../images/homeinco/search.png'
        }
    ],
    indexbannerList: [],
    parameters: {}
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dic = this.data.parameters
    // dic.page = 1
    this.indexbannersRequest(dic)
  },

  /**
   * 请求首页列表内容
   */
  indexbannersRequest: function (param) {
    var that = this
    this.setData({
      parameters: param
    })
    CCRequest.ccRequest('indexbanner', param, function success(data) {
        var arr = that.data.indexbannerList
        arr = arr.concat(data)
        // arr = arr.concat(data)
        that.setData({
            indexbannerList: arr
        })
    }, function fail(data) {
    })
  },
  upper: function() {
    console.log('scroll upper action')
  },
  lower: function() {
    console.log('scroll bottom action')
  },
  loadmoreData: function() {
    let page = this.data.parameters.page
    // page += 1
    let dic = this.data.parameters
    dic.page = page
    var that = this
    console.log('上拉加载')
    console.info(dic)
    this.indexbannersRequest(dic)
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