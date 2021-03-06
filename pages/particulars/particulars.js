// particulars.js
var imageUtil = require('../../utils/util.js');
var app = getApp();
let requestUrl = app.globalData.host + 'getpic';
var CCRequest = require('../../utils/CCRequest');
var WxParse = require('../../wxParse/wxParse.js');
import { $wuxToast } from '../../components/wux'
import { $wuxDialog } from '../../components/wux' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    pdfread:false, // 判断默认是否可以读取PDF文档
    // regBtnText: '登陆可查看', // 按钮状态文字
  },

  /*读取PDF文档 */
  readCompletepdf: function () {
    // 先判断是否登录，未登录需先登录，已登录则从本地获取用户信息
    let islogin = wx.getStorageSync('isLogin')
    if (islogin == false) {//未登录
        $wuxDialog.confirm({
            title: '登录后才能查看', 
            content: '您确定要登录吗？',
            onConfirm(e) {
              // alert(content)
              console.log('用户点击确定')
              console.log(e)
              wx.navigateTo({
                  url: '../login/login'
              })
            },
        })
        return
    }
    function showToastText(message) {
      $wuxToast.show({
        type: 'text',
        timer: 1500,
        color: '#fff',
        text: message,
        success: () => console.log(message)
      })
    }
    wx.showLoading({
      title: '下载中'
    })
    wx.downloadFile({
      url: this.data.newsdetaillist.pdfFilePath,
      success: function (res) {
        wx.hideLoading()
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (res) {
            console.log('打开文档失败')
            wx.showToast({
              title: '打开文档失败'
            })
          }
        })
      },
      fail: function (res) {
        console.log(res)
        wx.hideLoading()
        console.log('下载文档失败')
        if (res.errMsg.includes("downloadFile:fail exceed max file size")) {
          showToastText('此报告已超过微信下载限制，建议您通过官网进行浏览查看');
        } else {
          showToastText('下载文档失败');
        }
      }
    })
  },
  showToastText(message) {
    $wuxToast.show({
      type: 'text',
      timer: 1500,
      color: '#fff',
      text: message,
      success: () => console.log(message)
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      id: options.id
    })

    this.getnewsdetailRequest(this.data.id)
    
    // =========需要登录才可==========
    let isLogin = wx.getStorageSync('isLogin')
    if (isLogin) {
      let userInfo = wx.getStorageSync('userInfo')
      this.setData({
        pdfread:true
      })
    } 
    // console.log('请求详情的userID参数' + userInfo.ID)
   

  },
  /**
    * 请求动态时讯详情内容
    */
  getnewsdetailRequest: function (param) {
    var that = this
    CCRequest.ccRequest('baogaodetail', { ID: param }, function success(data) {
      that.setData({
        newsdetaillist: data
      })
      wx.setNavigationBarTitle({
        title: that.data.newsdetaillist.Name
      })
      that.setData({
        myfee: that.data.newsdetaillist.myfee
      })
      wx.hideLoading()
      console.log(WxParse)
      console.log(that.data.newsdetaillist)
      var Content = '<div>' + that.data.newsdetaillist.Desc + '</div>';
      /**
          * WxParse.wxParse(bindName , type, data, target,imagePadding)
          * 1.bindName绑定的数据名(必填)
          * 2.type可以为html或者md(必填)
          * 3.data为传入的具体数据(必填)
          * 4.target为Page对象,一般为this(必填)
          * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
          */
      WxParse.wxParse('Content', 'html', Content, that, 5);
      console.log(Content);
    }, function fail(data) {
      console.log(data)
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