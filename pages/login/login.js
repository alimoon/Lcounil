// login.js
var imageUtil = require('../../utils/util.js');
var app = getApp();
let requestUrl = app.globalData.host + 'getpic';
var CCRequest = require('../../utils/CCRequest');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagewidth: 0,//缩放后的宽 
    imageheight: 0,//缩放后的高
    showMyToast: false,
    myToastText: '',
    name: '',
    password: ''
  },
  // 立即注册
  registerNow: function () {
    console.log('跳至注册界面')
    wx.navigateTo({
      url: '../register/register'
    })
  },
  // 获取输入的账号
  nameInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    });
  },
  // 获取输入的密码
  passwordInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 登录
  login: function () {
    wx.showLoading({
      title: '加载中',
    })
    console.log('登录啦!用户名和密码分别是' + this.data.name + '/' + this.data.password)
    // 用户名和密码均不为空时可以登录
    var name = this.data.name
    var pwd = this.data.password
    var that = this
    if (name.length != 0 && pwd.length != 0) {
      var params = {
        "username": name,
        "password": pwd
      }
      console.log(params)
      CCRequest.ccRequest('login', params, function success(res) {
        console.log(res)
          // 请求登录成功
          // 提示用户登录成功
          wx.hideLoading()
          
          // 将用户信息进行本地存储
          wx.setStorage({
            key: 'userInfo',
            data: res
          })
          wx.setStorage({
            key: 'isLogin',
            data: true
          })
          // 加时间戳
          var date = new Date()
          wx.setStorage({
            key: 'logintime',
            data: date
          })
          try {
            let wx_userinfo = wx.getStorageSync('wx_userInfo')
            console.log("wx_userInfo", wx_userinfo)
            let userinfo = res
            console.log("userInfo", res)
            that.bindWxPic(wx_userinfo.avatarUrl, wx_userinfo.nickName, userinfo.ID)
            wx.showToast({
              title: '登录成功！',
              icon: 'success',
              duration: 3000
            })
          } catch (e) {

          }
        
      }, function fail(res) {
        console.log('登录失败')
        // 登录失败
        wx.hideLoading()
        console.log(res.info)
        // wx.showToast({
        //   title: '登录失败！',
        //   icon: 'success',
        //   duration: 2000
        // })
        that.setData({
          showMyToast: true,
          myToastText: res.info
        })
        setTimeout(function () {
          that.setData({
            showMyToast: false
          }) //1秒之后弹窗隐藏
        }, 2000)
      })
    }else{
      wx.hideLoading()
      that.setData({
        showMyToast: true,
        myToastText: '账号或密码不能为空'
      })
      setTimeout(function () {
        that.setData({
          showMyToast: false
        }) //1秒之后弹窗隐藏
      }, 2000)
    }
  },
  bindWxPic: function (pic, name, id) {
    console.log(pic, name, id)
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var param = {
      "UID": id,
      "weixinpic": pic,
      "weixinID": name
    }
    CCRequest.ccRequest('weixinpic', param,
      function success(res) {
        // success
        console.log("修改头像成功！！！")
        console.log(res)
        wx.hideLoading()
          //更改成功
          wx.setStorage({
            key: 'userInfo',
            data: res
          })
          // 跳转至个人中心
          setTimeout(back, 2000)
          function back() {
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
              success: function (res) {
                // success
              },
            })
            // wx.redirectTo({
            //   url: '../usercenter/usercenter'
            // })
          }

      }, function fail(res) {
        // fail
        console.log(res)
        wx.hideLoading()
      })
  },
  imageLoad: function (e) {
    var windowWidth
    var windowHeight
    wx.getSystemInfo({
      success: function (res) {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
      }
    })
    this.setData({
      imagewidth: windowWidth,
      imageheight: windowHeight
    })
    console.log('图片大小')
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
    path: 'pages/login/login' // 分享路径
  }
})