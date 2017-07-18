// express.js
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
    tabs: ["全部", "每月速递", "研究报告"],
    item: '',
    imagewidth: 0,//缩放后的宽 
    imageheight: 0,//缩放后的高
    picPath: '',
    baogaocontent: [],
    prodetaillist: [],
    parameters: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getpicRequest()
    this.baogaocontentRequest();
    let dic = this.data.parameters
    dic.page = 1
    dic.typclassid = 13
    this.prodetailRequest(dic)
  },
  /**
     * 请求专业沉淀图片内容
     */
  getpicRequest: function () {
    var that = this
    CCRequest.ccRequest('getpic', { 'type': 14 }, function success(data) {
      that.setData({
        picPath: data.myPicPath
      })
      //console.log(that.data.picPath)
    }, function fail(data) {
    })

  },
  /**
   * 请求每月速递简介
   */
  baogaocontentRequest: function () {
    var that = this
    CCRequest.ccRequest('baogaocontent', { typclassid: 16 },
      function success(data) {
        that.setData({
          baogaocontent: data
        })
        // console.log(that.data.baogaocontent.content);
        wx.hideLoading()
        var Content = '<div>' + that.data.baogaocontent.content + '</div>';

        /**
            * WxParse.wxParse(bindName , type, data, target,imagePadding)
            * 1.bindName绑定的数据名(必填)
            * 2.type可以为html或者md(必填)
            * 3.data为传入的具体数据(必填)
            * 4.target为Page对象,一般为this(必填)
            * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
            */
        WxParse.wxParse('Content', 'html', Content, that, 5);
        //  console.log(arr)
      }, function fail(data) {
      })

  },
  /**
   * 请求每月速递列表内容
   */
  prodetailRequest: function (param) {
    var that = this
    CCRequest.ccRequest('baogao', param,
      function success(data) {
        var arr = that.data.prodetaillist
        arr = arr.concat(data)
        that.setData({
          prodetaillist: arr
        })
        console.log(arr)
      }, function fail(data) {
      })

  },
  lower: function () {
    this.loadmoreData()
    console.log('scroll bottom action')
  },
  loadmoreData: function () {
    let page = this.data.parameters.page
    console.log(parm);
    page += 1
    // console.log(page);
    let dic = this.data.parameters
    dic.page = page
    dic.typclassid = 13
    var that = this
    console.log('上拉加载')
    console.info(dic)
    this.prodetailRequest(dic)
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

  }
})