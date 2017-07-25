// search.js
Page({

  /**
   * 页面的初始数据
   */
  /**
    * 页面的初始数据
    */
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
    inputShowed: false,//搜索取消
    // 搜索的word
    inputVal: ""
  },

/***控制搜索 */
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
      inputShowed: false
    });

    let dic = this.data.parameters
    console.log(dic)
    delete (dic.keyword)
    console.log(dic)
    dic.page = 1
    this.reportListRquest(dic)
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
      this.searchData(e.detail.value, function (data) {
        that.setData({
          reportsList: data
        })
      })
    }
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})