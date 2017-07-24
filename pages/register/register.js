// register.js
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
    name: '',
    title: '',
    mobile: 0,
    email: '',
    company: '',
    showMyToast: false,
    myToastText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  registerAction: function () {
    this.setData({
      showErr: false
    });
    console.log('注册！！')
    console.log(this.data)
    // 账号密码皆不为空，且两次密码输入一致
    var name = this.data.name
    var title = this.data.title
    var mobile = this.data.mobile
    var email = this.data.email
    var company = this.data.company
    var that = this
    if (name.length != 0 && title.length != 0 && mobile.length != 0 && email.length != 0 && company.length != 0) {
      var params = {
        "name": name,
        "title": title,
        "mobile": mobile,
        "email": email,
        "company": company
      }
      var regPhone = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/
      var regMail = /^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/
      var isPhone = regPhone.test(mobile)
      var isMail = regMail.test(email)
      if (isPhone && isMail) {
        // 请求
        console.log(params)
        CCRequest.ccRequest('reg', params,
          function success(res) {
            // success
            console.log(res)
            wx.showToast({
              title: '注册成功！',
              icon: 'success',
              duration: 2000,
            })
            setTimeout(back, 2000)
            function back() {
              wx.switchTab({ url: '../home/home' })
            }
          }, function fail(res) {
            // 注册失败
            console.log(res.info)
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
      } else {
        // 按优先级排，在前面的最后判断，则最终显示的为最后的错误提示
        if (!isMail) {
          console.log('邮箱不合法')
          this.setData({
            showMyToast: true,
            myToastText: '请输入正确邮箱'
          })
          setTimeout(function () {
            that.setData({
              showMyToast: false
            }) //1秒之后弹窗隐藏
          }, 2000)
        }
        if (!isPhone) {
          console.log('手机号不合法')
          this.setData({
            showMyToast: true,
            myToastText: '请输入正确手机号'
          })
          setTimeout(function () {
            that.setData({
              showMyToast: false
            }) //1秒之后弹窗隐藏
          }, 2000)
        }
      }
    } else {
      console.log('请输入完整信息')
      this.setData({
        showMyToast: true,
        myToastText: '请输入完整信息'
      })
      setTimeout(function () {
        that.setData({
          showMyToast: false
        }) //1秒之后弹窗隐藏
      }, 2000)
    }
  },

  nameInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  titleInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      title: e.detail.value
    })
  },
  mobileInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      mobile: e.detail.value
    })
  },
  emailInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      email: e.detail.value
    })
  },
  companyInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      company: e.detail.value
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
    // 用户点击右上角分享
    return {
      // title: 'title', // 分享标题
      // desc: 'desc', // 分享描述
      path: 'pages/register/register' // 分享路径
    }
  }
})