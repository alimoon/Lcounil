// Page({

//   data: {
//     src: 'https://www.baidu.com/img/bd_logo1.png',
//     mode: 'aspectFit',
//     context:'毛泽东思想和中国特色社会主义理论体系概论课程是一门思想政治理论课，其主要任务是帮助学生学习毛泽东思想和中国特色社会主义理论体系的基本内容，帮助学生理解毛泽东思想和中国特色社会主义理论体系是马克思主义的基本原理与中国实际相结合的两次伟大的理论成果，是中国共产党集体智慧的结晶。为了加强高等学校思想政治理论课教学，提高思想政治理论课教学针对性和实效性，我们组织编写了这本《毛泽东思想和中国特色社会主义理论体系概论》一书。本书在编写过程中着力贯彻党的十七大精神，结合学生在学习这门课时遇到的问题，进行重点阐述',
//     array: [{
//       text: '论体系概论课程是一门思想',
//         author: '峰会',
//         time: '2017-07-07'
//     }, {
//         text: '论体系概论课程是一门思想',
//         author: '峰会',
//         time: '2017-07-07'
//     }, 
//      {
//        text: '论体系概论课程是一门思想',
//        author: '峰会',
//        time: '2017-07-07'
//     }],
//   }
// })



var app = getApp()
Page({
  data: {
    src: '',
    mode:'scaleToFill',
    context: '毛泽东思想和中国特色社会主义理论体系概论课程是一门思想政治理论课，其主要任务是帮助学生学习毛泽东思想和中国特色社会主义理论体系的基本内容，帮助学生理解毛泽东思想和中国特色社会主义理论体系是马克思主义的基本原理与中国实际相结合的两次伟大的理论成果，是中国共产党集体智慧的结晶。为了加强高等学校思想政治理论课教学。',
    array: [{
      text: '论体系概论课程是一门思想',
        author: '峰会',
        time: '2017-07-07'
    }, {
        text: '论体系概论课程是一门思想',
        author: '峰会',
        time: '2017-07-07'
    }, 
     {
       text: '论体系概论课程是一门思想',
       author: '峰会',
       time: '2017-07-07'
    }],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.TopImgRequest()
  },

  TopImgRequest: function () {
    var that = this
    wx.request({
      url: app.globalData.host + 'getpic',
      data: { "type": 5 },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // success
        console.log('1111111111')
        console.log(res.data.data.myPicPath)
        that.setData({
          src: res.data.data.myPicPath
        })
      },
      fail: function (error) {
        // fail
        console.log(error)
      },
      complete: function () {
        // complete
      }
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function () {
   
  }
})

