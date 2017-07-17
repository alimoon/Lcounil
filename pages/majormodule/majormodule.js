// login.js
var TopBanner = require('../../DIYComponents/topbanner')
let picUrl = 'https://www.lcouncil.com//wxpic/banner/1.jpg'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload in majormodule....')
    var dataSet = {
      src: picUrl,
      text: '测试测试，啦啦啦',
      size: {
        heihgt: 200,
        width: 375
      }
    }
    // dataSet.src = picUrl
    // let height = 200
    // let width = 375
    // dataSet.size.height = height
    // dataSet.size.width = width
    console.info(dataSet)
    TopBanner.TopBanner('dataSet',dataSet, this)
    console.info(TopBanner)
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