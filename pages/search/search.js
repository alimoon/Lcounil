// search.js
var CCRequest = require('../../utils/CCRequest');
import { $wuxToast } from '../../components/wux'
var app = getApp()
Page({
  data: {
    grids: [
      {
        "ID": "1",
        "Desc": "专业模块",
        "PageUrl": "../search/searchlist/searchlist",
        "PicUrl": '../../images/search/pro.jpg'
      },
      {
        "ID": "2",
        "Desc": "交流分享",
        "PageUrl": "../share/share",
        "PicUrl": '../../images/search/share.jpg'
      },
      {
        "ID": "3",
        "Desc": "研究报告",
        "PageUrl": "../report/report",
        "PicUrl": '../../images/search/baogao.jpg'
      },
      {
        "ID": "4",
        "Desc": "每月速递",
        "PageUrl": "../express/express",
        "PicUrl": '../../images/search/mouth.jpg'
      },
      {
        "ID": "5",
        "Desc": "客户风采",
        "PageUrl": "../presence/presence",
        "PicUrl": '../../images/search/guest.jpg'
      },
      {
        "ID": "6",
        "Desc": "专家风貌",
        "PageUrl": "../expert/expert",
        "PicUrl": '../../images/search/teacher.jpg'
      }
    ],
    searchPlaceHolder: '搜索',
    inputShowed: false,//搜索取消
    // 搜索的word
    inputVal: "",
    searchResultData: [],
    parameters: {},
    typeID: '0'
  },

/***控制搜索 */
  showInput: function (e) {
    console.log("showInput", e)
    this.setData({
      inputShowed: true,
      searchPlaceHolder: '搜索',
      typeID: '0'
    });
  },
  hideInput: function (e) {
    console.log("hideInput", e)
    this.setData({
      inputVal: "",
      inputShowed: false
    });

    this.setData({
      searchResultData: []
    })
  },
  clearInput: function (e) {
    console.log("clearInput", e)
    this.setData({
      inputVal: ""
    });
  },

  searchScope: function (e) {
    console.log(e.currentTarget.dataset.id)
    let type = e.currentTarget.dataset.id
    this.setData({
      inputShowed: true,
      inputVal: ''
    });
    if (type == this.data.typeID) {
      
    }
    var placeHolder = ''
    var typeID = ''
    if (type == 1) {
      placeHolder = '搜索 专业模块'
    } else if (type == 2) {
      placeHolder = '搜索 交流分享'
    } else if (type == 3) {
      placeHolder = '搜索 研究报告'
    } else if (type == 4) {
      placeHolder = '搜索 每月速递'
    } else if (type == 5) {
      placeHolder = '搜索 客户风采'
    } else if (type == 6) {
      placeHolder = '搜索 专家风貌'
    } else {
      placeHolder = '搜索'
      typeID = 0
    }
    typeID = type
    this.setData({
      searchPlaceHolder: placeHolder,
      typeID: typeID
    })
    console.log(this.data.searchPlaceHolder)
  },

  searchConfirm: function (e) {
    console.log("searchConfirm", e)
    var that = this
    this.setData({
      inputVal: e.detail.value
    });
    if (e.detail.value.length > 0) {
      // 搜索长度大于0 时， 进行搜索
      that.searchData(e.detail.value, function success(data) {
        console.log(data)
        that.setData({
          searchResultData: data
        })
        console.log('搜索结果展示')
        console.info(that.data.searchResultData)
      })
    }
  },

  searchData: function(keyword, success) {
    var that = this
    let dic = {}
    dic.typeID = this.data.typeID
    dic.page = 1
    dic.keyword = keyword
    this.setData({
      parameters: dic
    })
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: app.globalData.host+'searchlist',
      data: dic,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(dic)
        console.log(res.data.data)
        wx.hideLoading()
        if (res.data.status == 0){
          if(success){
            success(res.data.data)
          }
        }else{
          that.setData({
            searchResultData: [{titlename: '没有记录'}]
          })
        }
      },
      fail: function(res) {
        // fail
        console.log(res)
        wx.hideLoading()
      },
    })
  },

  loadmoreData: function () {
    let page = this.data.parameters.page
    page += 1
    let dic = this.data.parameters
    dic.page = page
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    console.log('上拉加载')
    // console.info(dic)
    wx.request({
      url: app.globalData.host+'searchlist',
      data: dic,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log('参数dic')
        console.log(dic)
        console.log('loadmore请求结果')
        console.log(res.data)
        wx.hideLoading()
        var arr = that.data.searchResultData
        if (res.data.status == 0){
          let arrTemp = res.data.data
          that.setData({
            parameters: dic,
            searchResultData: arr.concat(arrTemp)
          })
        }else{
          that.setData({
            searchResultData: arr
          })
          $wuxToast.show({
            type: 'text',
            timer: 1500,
            color: '#fff',
            text: '没更多数据',
            success: () => console.log('没更多数据')
          })
        }
      },
      fail: function(res) {
        // fail
        console.log(res)
        wx.hideLoading()
      },
    })
  },

  toDetail: function (e) {
    console.log(e)
    let url = e.currentTarget.dataset.detailurl
    let ID = e.currentTarget.dataset.detailid
    // let item = this.data.searchResultData[index]
    // let ID = item.ID
    wx.navigateTo({
      // url: '../communication/activitydetail/activitydetail?id='+ID
      url: url + '?id=' + ID
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.loadmoreData()
    console.log('scroll bottom action')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})