// share.js
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
    nzopen: false,
    nzshow: true,
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
    videoClassList: [],
    areaList: [],
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
    CCRequest.getPicUrl(7, function success(picUrl) {
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
    this.yearListRequest()
    this.videoClassListRequest()
    this.areaListRequest()
    this.monthListRequest()
    this.cityListRequest()
  },

  yearListRequest: function () {
    var that = this
    CCRequest.ccRequest('yearlist', {}, function success(data) {
      that.setData({
        yearList: data
      })
    }, function fail(data) {
    })
  },
  monthListRequest: function () {
    var that = this
    CCRequest.ccRequest('mouthlist', {}, function success(data) {
      that.setData({
        monthList: data
      })
    }, function fail(data) {
    })
  },
  videoClassListRequest: function () {
    var that = this
    CCRequest.ccRequest('videoclass', {}, function success(data) {
      that.setData({
        videoClassList: data
      })
    }, function fail(data) {
    })
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
  cityListRequest: function () {
    var that = this
    CCRequest.ccRequest('cityclass', {}, function success(data) {
      that.setData({
        cityList: data
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
  // lower: function () {
  // },

  loadmoreData: function () {
    let page = this.data.parameters.page
    page += 1
    let dic = this.data.parameters
    dic.page = page
    var that = this
    console.log('上拉加载')
    // console.info(dic)
    var that = this
    CCRequest.ccRequest('videolist', dic,
      function success(data) {
        let arr = that.data.communicationList
        arr = arr.concat(data)
        that.setData({
          communicationList: arr,
          parameters: dic
        })
        console.info('交流互动列表')
        console.log(arr)
      }, function fail(data) {
      })
  },
  filterItemAction: function (e) {
    let array = ["年份", "月份", "活动类型", "领域", "地区"]
    let keys = ["inyear", "inmouth", "typeclassid", "labid", "cityid"]
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
    } else {
      console.log(index)
      let item = arr[index]
      console.log(item)
      filterArray[keyindex] = item
      let key = keys[keyindex]
      if (this.data.shownavindex == 0) {
        parameters[key] = this.data.yearList[index - 1]
      } else if (this.data.shownavindex == 1) {
        parameters[key] = this.data.monthList[index - 1]
      } else if (this.data.shownavindex == 2) {
        parameters[key] = this.data.videoClassList[index - 1].ID
      } else if (this.data.shownavindex == 3) {
        parameters[key] = this.data.areaList[index - 1].ID
      } else if (this.data.shownavindex == 4) {
        parameters[key] = this.data.cityList[index - 1].ID
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
    console.log(parameters)
    CCRequest.ccRequest('videolist', parameters, function success(data) {
      that.setData({
        parameters: parameters,
        communicationList: data
      })
    }, function fail(data) {
      that.setData({
        parameters: parameters,
        communicationList: []
      })
    })
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
      isfull: false,
      shownavindex: -1,
      nzopen: false,
      nzshow: true
    })
  },
  getContent: function (index) {
    // ["年份", "月份", "活动类型", "领域", "地区"]
    var content = []
    if (index == 0) {// 年份
      let arr = this.data.yearList
      // content[index] = ["不限"].concat(arr)
      var arr1 = ["不限"]
      for (var i = 0; i < arr.length; i++) {
        var element = arr[i] + '年';
        arr1.push(element)
      }
      content[index] = arr1
    } else if (index == 1) {// 月份
      let arr = this.data.monthList
      console.log(arr)
      // content[index] = ["不限"].concat(arr)
      var arr1 = ["不限"]
      for (var i = 0; i < arr.length; i++) {
        var element = arr[i] + '月';
        arr1.push(element)
      }
      content[index] = arr1
    } else if (index == 2) {// 类型
      let arr = this.data.videoClassList
      var arr1 = ["不限"]
      for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        arr1.push(element.Desc)
      }
      content[index] = arr1
    } else if (index == 3) {// 领域
      let arr = this.data.areaList
      var arr1 = ["不限"]
      for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        arr1.push(element.Desc)
      }
      content[index] = arr1
    } else if (index == 4) {// 地区
      let arr = this.data.cityList
      // var arr1 = ["不限"]
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