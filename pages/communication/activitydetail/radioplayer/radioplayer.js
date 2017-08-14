var app = getApp()
let requestUrl = app.globalData.host+'playmp3'

Page({
 onReady: function (e) {
  // 使用 wx.createAudioContext 获取 audio 上下文 context
  console.log(e)
  this.audioCtx = wx.createAudioContext('myAudio')
 },
  data: {
    // poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    id: '',
    // author: '许巍',
    audioUrl: [],
    audioName: [],
    starttime:'00:00',
    duration:'00:00'
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
    var that = this
    this.prepareData(this.data.id, function(data){
      that.setData({
        audioUrl: data.mp3File,
        audioName: data.mp3Name
      })
    })
  },

  prepareData: function(id, success) {
    wx.request({
      url: requestUrl,
      data: {
        "ID": id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        if (res.data.status == 0) {
          if (success) {
            success(res.data.data)
          }
        }
      },
      fail: function(res) {
        // fail
        console.log(res)
      },
    })
  },
  
  funplay: function(){
    console.log("audio play");
  },
  funpause: function(){
    console.log("audio pause");
  },
  funtimeupdate: function(u){
    console.log(u.detail.currentTime);
    console.log(u.detail.duration);
  },
  funended: function(){
    console.log("audio end");
  },
  funerror: function(u){
    console.log(u.detail.errMsg);
  },
   /**
   * @desc 播放进度触发
   * 
   */
  funtimeupdate: function(e) {
    var offset = e.detail.currentTime
    var currentTime = parseInt(e.detail.currentTime)
    var hour = Math.floor(currentTime / 3600)
    var min = Math.floor(currentTime / 60 ) % 60
    var max = parseInt(e.detail.duration)
    var sec = currentTime % 60
    var starttime = hour + ':' +  min + ':' + sec
    var duration = e.detail.duration
    var offset = parseInt (offset * 100 / duration)
    var endHour = Math.floor(max / 3600)
    var endMin = Math.floor(max / 60) % 60
    var endSec = max % 60
    var that = this
    that.setData({
      offset: currentTime,
      starttime: starttime,
      max:max,
      duration: endHour + ':' + endMin + ':' + endSec
    })
  },

   /**
   * @desc 拖动进度条
   * 
   */
  sliderchange:function(e){
    console.log(e);
    var offset = parseInt( e.detail.value );
    this.audioCtx.seek(offset);
    
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // wx.seekBackgroundAudio({
    //     position: 30
    // })
  },
})