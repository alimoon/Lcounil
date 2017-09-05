var app = getApp()
let aboutusurl = app.globalData.host + 'Aboutfawu'
var WxParse = require('../../wxParse/wxParse.js');

let requestUrl = app.globalData.host + 'getpic';
var CCRequest = require('../../utils/CCRequest');
var imageUtil = require('../../utils/util.js');
import { $wuxToast } from '../../components/wux'
import { $wuxDialog } from '../../components/wux' 
Page({
  data: {
    item: '',
    ID: '',
    imagewidth: 0,//缩放后的宽 
    imageheight: 0,//缩放后的高
    picPath: '',
    pdfread: false, // 判断默认是否可以读取PDF文档
  },
  onLoad: function (options) {
    let isLogin = wx.getStorageSync('isLogin')
    if (isLogin) {
      let userInfo = wx.getStorageSync('userInfo')
      this.setData({
        pdfread: true
      })
    } 
    // 页面初始化 options为页面跳转所带来的参数
    this.getpicRequest()
    this.prepareData()
  },

  /**
 * 请求动态时讯图片内容
 */
  getpicRequest: function () {
    var that = this
    CCRequest.ccRequest('getpic', { 'type': 10 }, function success(data) {
      that.setData({
        picPath: data.myPicPath
      })
      console.log(that.data.picPath)
    }, function fail(data) {
    })

  },

  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth - 15,
      imageheight: imageSize.imageHeight
    })
  },

  prepareData: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: aboutusurl,
      // data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data.status == 0) {
          wx.hideLoading()
          // console.log(WxParse)
          console.log(res.data.data)
          that.setData({
            item: res.data.data
          })
          that.setData({
            myfee: res.data.data.myfee
          })
         
          var article = '<div>' + res.data.data.Desc + '</div>';
          /**
          * WxParse.wxParse(bindName , type, data, target,imagePadding)
          * 1.bindName绑定的数据名(必填)
          * 2.type可以为html或者md(必填)
          * 3.data为传入的具体数据(必填)
          * 4.target为Page对象,一般为this(必填)
          * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
          */
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
  // 跳转到报告页面再查看PDF（不可取，弃用）
  toRead: function () {
    wx.navigateTo({
        url: '../particulars/particulars?id=' + this.data.item.ID
    })
  },

  /*直接读取PDF文档 */
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
      url: this.data.item.pdfFilePath,
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

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      // title: 'title', // 分享标题
      // desc: 'desc', // 分享描述
      path: 'pages/aboutus/aboutus' // 分享路径
    }
  }
})