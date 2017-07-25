// expert.js
var imageUtil = require('../../utils/util.js');
var app = getApp();
let requestUrl = app.globalData.host + 'getpic';
var CCRequest = require('../../utils/CCRequest');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: '',
    imagewidth: 0,//缩放后的宽 
    imageheight: 0,//缩放后的高
    picPath: '',
    baogaocontent: [],
    newslist: [],
    parameters: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getpicRequest()
    let dic = this.data.parameters
    dic.page = 1
    dic.ctype = 8
    this.getnewslistRequest(dic)
  },
  /**
       * 请求专家风貌图片内容
     */
  getpicRequest: function () {
    var that = this
    CCRequest.ccRequest('getpic', { 'type': 12 }, function success(data) {
      that.setData({
        picPath: data.myPicPath
      })
      //console.log(that.data.picPath)
    }, function fail(data) {
    })

  },

  /**
   * 请求专家风貌列表内容
   */
  getnewslistRequest: function (param) {
    var that = this
    CCRequest.ccRequest('newslist', param,
      function success(data) {
        var arr = that.data.newslist
        arr = arr.concat(data)
        that.setData({
          newslist: arr
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
    if (parm == 'reduce') {
      page -= 1
    } else {
      page += 1
    }

    // console.log(page);
    let dic = this.data.parameters
    dic.page = page
    dic.ctype = 8
    var that = this
    console.log('上拉加载')
    console.info(dic)
    this.getnewslistRequest(dic)
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth - 15,
      imageheight: imageSize.imageHeight
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
    // 用户点击右上角分享
    return {
      // title: 'title', // 分享标题
      // desc: 'desc', // 分享描述
      path: 'pages/expert/expert' // 分享路径
    }
  }
})