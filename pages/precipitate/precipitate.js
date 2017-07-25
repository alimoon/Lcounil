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
    proalllist: [], //全部报告
    proeplist: [], //每月速递
    prorplist: [], //研究报告
    parameters: {},

    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    page: 1,
    epPage: 1,
    rpPage: 1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getpicRequest()
    let dic = this.data.parameters
    dic.page = 1
    dic.epPage=1
    dic.rpPage = 1
    dic.typclassid = 0
    this.prolistRequest(dic)
    this.setData({
      activeIndex: options.activeIndex
    })

    var width
    try {
      var res = wx.getSystemInfoSync()
      width = res.windowWidth
      this.setData({
        sliderLeft: (width / this.data.tabs.length - sliderWidth) / 2,
        sliderOffset: width / this.data.tabs.length * this.data.activeIndex,
      });
    } catch (e) {
      // Do something when catch error
    }
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
  tabClick: function (e) {
    console.log(e)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    if (this.data.activeIndex == 2 && this.data.prorplist.length == 0) {
      let dic = this.data.parameters
      dic.page = 1
      dic.typclassid = 2
      this.prolistRequest(dic)
    } else if (this.data.activeIndex == 1 && this.data.proeplist.length == 0) {
      let dic = this.data.parameters
      dic.page = 1
      dic.typclassid = 13
      this.prolistRequest(dic)
      
    } else if (this.data.activeIndex == 0 && this.data.proalllist.length == 0) {
      let dic = this.data.parameters
      dic.page = 1
      dic.typclassid = 0
      this.prolistRequest(dic)
    }
  },
  showLoading: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
  },
  cancelLoading: function () {
    wx.hideToast();
  },
  /**
   * 请求根据类型输出列表
   */
  prolistRequest: function (parm) {
    var that = this
    // console.log(parm.page);
    CCRequest.ccRequest('baogao', parm,
      function success(data) {
        if (parm.typclassid==0){
          var arr = that.data.proalllist
          // console.info(data);
          arr = arr.concat(data)
          // console.info(arr);
          that.setData({
            proalllist: arr
          })
        } else if(parm.typclassid == 13){
          var arr = that.data.proeplist
          arr = arr.concat(data)
          that.setData({
            proeplist: arr
          })
        }else{
          var arr = that.data.prorplist
          arr = arr.concat(data)
          that.setData({
            prorplist: arr
          })
        }
       
        // console.log(arr)
      }, function fail(data) {
      })

  },
  
  /**
   * 全部分页
   */
  lowerall: function () {
    var that=this
    setTimeout(function () {
      that.loadmoreData(0)
      that.update();
    }, 3000);
    
    console.log('scroll bottom action')
  },
  /**
   * 每月速递分页
   */
  lowerep: function () {
    var that = this
    setTimeout(function () {
      that.loadmoreData(13)
      that.update();
    }, 2000);
    console.log('scroll bottom action')
  },
  /**
   * 研究报告分页
   */
  lowerrp: function () {
    var that = this
    setTimeout(function () {
      that.loadmoreData(2)
      that.update();
    }, 2000);
    console.log('scroll bottom action')
  },
  loadmoreData: function (parm) {
    var page=0
    if (parm==0){
      page = this.data.page
      page += 1
      this.setData({
        page: page
      })
      // console.log(page);
    }else if(parm==13){
      page = this.data.epPage
      page += 1
      this.setData({
        epPage: page
      })
      // console.log('yyyyyyyyyy')
      // console.log(page);
    }else{
      page = this.data.rpPage
      page += 1
      this.setData({
        rpPage: page
      })
    }
    
    let dic = this.data.parameters
    dic.page = page   
    dic.typclassid = parm
    var that = this
    console.log('上拉加载')
    // console.info(dic)
      this.prolistRequest(dic)
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
      path: 'pages/precipitate/precipitate' // 分享路径
    }
  }
})