// share.js
var imageUtil = require('../../utils/util.js');
var TopBanner = require('../../DIYComponents/topbanner') // type = 7
var CCRequest = require('../../utils/CCRequest');
var dataSet = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    majorShareList: [],
    parameters: {},
    imageWidth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    CCRequest.getPicUrl(7, function success(picUrl){
      console.log('专业分享的PicURL' + picUrl)
      dataSet.src = picUrl
      console.info(dataSet)
      TopBanner.TopBanner('dataSet',dataSet, that )
    })
    let dic = this.data.parameters
    dic.page = 1
    this.getMajorShareListRequest(dic)
  },
  getMajorShareListRequest: function (params) {
    var that = this
    this.setData({
      parameters: params
    })
    CCRequest.ccRequest('videolist', params,
      function success(data) {
        let arr = that.data.majorShareList
        arr = arr.concat(data)
        that.setData({
          majorShareList: arr
        })
        console.info('专业分享列表')
        console.log(arr)
      }, function fail(data) {
    })
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
    this.getMajorShareListRequest(dic)
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