// communication.js
var imageUtil = require('../../utils/util.js');
var TopBanner = require('../../DIYComponents/topbanner')
var CCRequest = require('../../utils/CCRequest');
var dataSet = {}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    communicationList: [],
    imageWidth: 0,
    parameters: {},
    nzopen:false,
    nzshow:true,
    /// 筛选点击的 button
    shownavindex: -1,
    filterindex: -1,
    /// 黑色背景
    isfull: false,
    content: [],
    firstDesc: '',
     // 假数据
    filterArray: ["年份", "月份", "活动类型", "领域", "地区"],
    yearList: [],
    monthList: [],
    tagList: [],
    cityList: [
      {
      "ID": "2",
      "Desc": "北京",
      "Ctype": "1",
      "IsDelete": "0",
      "Aorder": "2"
      },
      {
        "ID": "4",
        "Desc": "天津",
        "Ctype": "1",
        "IsDelete": "0",
        "Aorder": "3"
      },
      {
        "ID": "3",
        "Desc": "上海",
        "Ctype": "1",
        "IsDelete": "0",
        "Aorder": "4"
      },
      {
        "ID": "5",
        "Desc": "苏州",
        "Ctype": "1",
        "IsDelete": "0",
        "Aorder": "5"
      },
      {
        "ID": "6",
        "Desc": "深圳",
        "Ctype": "1",
        "IsDelete": "0",
        "Aorder": "7"
      },
      {
        "ID": "8",
        "Desc": "其他",
        "Ctype": "1",
        "IsDelete": "0",
        "Aorder": "10"
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    CCRequest.getPicUrl(13, function success(picUrl){
      console.log('交流活动的URL' + picUrl)
      dataSet.src = picUrl
      console.info(dataSet)
      TopBanner.TopBanner('dataSet',dataSet, that )
    })
    let dic = this.data.parameters
    dic.page = 1
    this.getcommunicationslistRequest(dic)
  },

  // 页面顶部图片大小绑定
  imageLoad: function(e) {
    console.log('图片大小')
    var imageSize = imageUtil.imageUtil(e)
    dataSet.size = {
      width: imageSize.imageWidth - 15,
      height: imageSize.imageHeight
    }
    TopBanner.TopBanner('dataSet',dataSet, this)
    this.setData ({
      imageWidth: imageSize.imageWidth - 15,
    })
  },
  
  /**
   * 请求交流活动列表内容
   */
  getcommunicationslistRequest: function (params) {
    var that = this
    this.setData({
      parameters: params
    })
    CCRequest.ccRequest('videolist', params,
      function success(data) {
        let arr = that.data.communicationList
        arr = arr.concat(data)
        that.setData({
          communicationList: arr
        })
        console.info('交流互动列表')
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