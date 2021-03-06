// communication.js
var imageUtil = require('../../utils/util.js');
var TopBanner = require('../../DIYComponents/topbanner')
var CCRequest = require('../../utils/CCRequest');
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
var dataSet = {}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    heightall: 40,
    positionall: "none",
    communicationList: [],
    imageWidth: 0,
    parameters: {},
    nzopen: false,
    nzshow: true,
    /// 筛选点击的 button
    shownavindex: -1,
    filterindex: -1,
    /// 黑色背景
    isfull: false,
    content: [],
    firstDesc: '',
    typeName: '反垄断',
    strcontext: '反垄断内容',
    // 假数据
    filterArray: ["19个专业领域"],
    areaList: [],
    inputShowed: false,
    // 搜索的word
    inputVal: "",
  },
  showInput: function (e) {
    console.log("showInput", e)
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function (e) {
    console.log("hideInput", e)
    this.setData({
      inputVal: "",
      inputShowed: false,
      communicationList: []
    });
    let dic = this.data.parameters
    console.log(dic)
    delete (dic.keyword)
    console.log(dic)
    dic.page = 1
    this.getcommunicationslistRequest(dic)
    // this.prepareData(dic)
  },
  clearInput: function (e) {
    console.log("clearInput", e)
    this.setData({
      inputVal: ""
    });
  },
  searchConfirm: function (e) {
    console.log("searchConfirm", e)
    this.setData({
      inputVal: e.detail.value

    });
    if (e.detail.value.length > 0) {
      // 搜索长度大于0 时， 进行搜索
      var that = this
      let dic = this.data.parameters
      dic.keyword = e.detail.value
      dic.page = 1
      // console.log(this.data.communicationList)
      this.setData({
        communicationList: []

      });
      this.getcommunicationslistRequest(dic)
      // this.searchData(e.detail.value, function (data) {
      //   that.setData({
      //     activityList: data
      //   })
      // })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    CCRequest.getPicUrl(5, function success(picUrl) {
      console.log('交流活动的URL' + picUrl)
      dataSet.src = picUrl
      console.info(dataSet)
      TopBanner.TopBanner('dataSet', dataSet, that)
    }, function fail(data) {
      console.log(data)
    })
    let dic = this.data.parameters
    dic.page = 1
    this.getcommunicationslistRequest(dic)
    this.areaListRequest()
    this.prepareContentData()
  },


  areaListRequest: function () {
    var that = this
    CCRequest.ccRequest('proclass', {}, function success(data) {
      that.setData({
        areaList: data
      })
    }, function fail(data) {
    })
  },


  // 页面顶部图片大小绑定
  imageLoad: function (e) {
    console.log('图片大小')
    var imageSize = imageUtil.imageUtil(e)
    dataSet.size = {
      width: imageSize.imageWidth - 15,
      height: imageSize.imageHeight
    }
    TopBanner.TopBanner('dataSet', dataSet, this)
    this.setData({
      imageWidth: imageSize.imageWidth - 15,
    })
  },

  /**
   * 请求专业模块列表内容
   */
  getcommunicationslistRequest: function (params) {
    var that = this
    this.setData({
      parameters: params
    })
    CCRequest.ccRequest('prolist', params,
      function success(data) {
        let arr = that.data.communicationList
        arr = arr.concat(data)
        that.setData({
          communicationList: arr
        })
        console.info('专业模块列表')
        // console.log(that.data)
      }, function fail(data) {
      })
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
  filterItemAction: function (e) {
    let array = ["反垄断"]
    let keys = ["proclassid"]
    var parameters = this.data.parameters
    let keyindex = this.data.shownavindex
    let arr = this.data.content[this.data.shownavindex]
    console.log(arr)
    var filterArray = this.data.filterArray
    let index = e.currentTarget.dataset.filter
    if (index == 0) {
      //选择全部, 清楚筛选条件
      filterArray[keyindex] = array[keyindex]
      let key = keys[keyindex]
      parameters[key] = 0
      this.setData({
        filterindex: -1,
        filterArray: filterArray,
        parameters: parameters
      })
      this.setData({
        typeName: '反垄断'
      })
    } else {
      console.log(index)
      let item = arr[index]
      console.log(item)
      this.setData({
        typeName: item
      })
      filterArray[keyindex] = item
      let key = keys[keyindex]
      if (this.data.shownavindex == 0) {
        parameters[key] = this.data.areaList[index].ID
      }
      this.setData({
        filterindex: index,
        filterArray: filterArray,
        parameters: parameters
      })
    }
    this.hidebg()

    console.log(parameters)
    this.filterRequest()
  },
  filterRequest: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    let parameters = this.data.parameters
    parameters.page = 1
    CCRequest.ccRequest('prolist', parameters, function success(data) {
      that.setData({
        parameters: parameters,
        communicationList: data,
        heightall: 0,
        positionall: "none",
      })
    }, function fail(data) { })
    this.prepareContentData()
  },
  filterAction: function (view) {
    console.log(view)
    let index = view.currentTarget.dataset.hi
    if (this.data.shownavindex == -1) {
      this.setData({
        shownavindex: index,
        isfull: true,
        nzopen: true,
        nzshow: false,
        content: this.getContent(index),
        heightall: 100,
        positionall: "fixed",
      })
      console.log(this.data.content)
    } else {
      let navindex = this.data.shownavindex
      if (index == navindex) {
        this.setData({
          shownavindex: -1,
          isfull: false,
          nzopen: false,
          nzshow: true,
          content: [],
          heightall: 0,
          positionall: "none",
        })

        console.log(this.data.content)
      } else {
        this.setData({
          shownavindex: index,
          isfull: true,
          nzopen: true,
          nzshow: false,
          content: this.getContent(index),
        })
        console.log(this.data.content)
      }
    }
  },

  hidebg: function (e) {
    console.log("hidebg")
    this.setData({
      shownavindex: -1,
      isfull: false,
      nzopen: false,
      nzshow: true,
      content: [],
      heightall: 0,
      positionall: "none",
    })
  },
  getContent: function (index) {
    // ["专业领域"]
    var content = []
    if (index == 0) {// 领域
      let arr = this.data.areaList
      var arr1 = []
      for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        arr1.push(element.Desc)
      }
      content[index] = arr1
    }
    console.log('content')
    console.log(content)
    return content
  },
  prepareContentData: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: app.globalData.host + 'procontent',
      data: this.data.parameters,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data.status == 0) {
          console.info(res.data.data)

          wx.hideLoading()
          console.log(WxParse)
          console.log(res.data.data.MContent)
          console.log('b1')
          var article = '<div>' + res.data.data.MContent + '</div>';

          WxParse.wxParse('article', 'html', article, that, 5);
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
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
    if (this.data.nzshow) {
      this.loadmoreData()
    }
    console.log('scroll bottom action')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})