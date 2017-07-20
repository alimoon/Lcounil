var app = getApp()
const appid = 'wx585cc742eab3d2a4';//填写微信小程序appid 
const MCHID = '1461576002';
const KEY = '68ce47ddcfd19f38bd097123163d72cc';
const secret = '3d933281728ca8d8960677bc080f5f37';//填写微信小程序secret
let regVideoPath = 'regvideo' // 注册活动的路径
let videoRegCancelPath = 'videoregcancel' // 取消活动注册
var WxParse = require('../../../wxParse/wxParse.js'); 
import { $wuxToast } from '../../../components/wux'
import { $wuxDialog } from '../../../components/wux' 
var utils = require('../../../utils/util.js');
var CCRequest = require('../../../utils/CCRequest');
var imageUtil = require('../../../utils/util.js');
var TopBanner = require('../../../DIYComponents/topbanner')
// var dataSet = {}
var UID = 1646 // 测试账号的UID

Page({
    data: {
        picUrl:'',
        imageWidth: 0,
        imageHeight: 0,

        id: '', // 活动ID，用来获取详情
        userID: '1646', // 用户ID，用来唯一标识用户，进行注册的相关操作
        activity: {}, // 活动详情内容

        canReg: true, // 判断活动知否可注册
        regBtnText: '', // 立即注册按钮状态文字
        regParams: {}, // 注册所需参数

         // 控制展开
        isDescFold: true,
    },
    /**
     * 页面生命周期函数，页面加载
     */
    onLoad: function (options) {
        var that = this
        CCRequest.getPicUrl(13, function success(picUrl){
            console.log('交流活动的URL' + picUrl)
            // dataSet.src = picUrl
            that.setData({
                picUrl: picUrl
            })
            // console.info(dataSet)
            // TopBanner.TopBanner('dataSet',dataSet, that )
        }, function fail(data){
            console.log(data)
        })
        if (this.data.id == '') {
            console.log('活动ID' + options.id)
            this.setData({
                id: options.id
            })
        }
        this.getRegParams()
    },
    /**
     * 页面顶部图片大小绑定
     */ 
    imageLoad: function(e) {
        console.log('图片大小')
        var imageSize = imageUtil.imageUtil(e)
        // dataSet.size = {
        //     width: imageSize.imageWidth - 15,
        //     height: imageSize.imageHeight
        // }
        // TopBanner.TopBanner('dataSet',dataSet, this)
        this.setData({
            imageWidth: imageSize.imageWidth - 15,
            imageHeight: imageSize.imageHeight
        })
    },
    /**
     * 获取注册的参数
     */
    getRegParams: function () {
        var that = this
        var videoID = this.data.id
        var regParams = this.data.regParams
        that.getActivityDetailRequest()
    },
    // 自定义提示方法
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
     * 请求活动详情
     */
    getActivityDetailRequest: function () {
        var that = this
        wx.showLoading({
            title: '加载中',
        })
        var dic
        // =========需要登录才可==========
        // let isLogin = wx.getStorageSync('isLogin')
        // if (isLogin) {
            // let userInfo = wx.getStorageSync('userInfo')
            // this.setData({
                // userID: userInfo.ID
            // })
            // dic = { "ID": this.data.id,"UID": this.data.userID}
        // } else {
            // dic = { "ID": this.data.id }
        // }
        // var UID = this.data.userID
        // console.log('请求详情的userID参数'+UID)
        // =============================
        dic = {'UID': this.data.userID,'ID': this.data.id}
        CCRequest.ccRequest('videodetail', dic, function success(data) {
            var activity = data
            that.setData({
                activity: activity
            })
            // 判断按钮是否可注册
            var canReg 
            var regBtnText
            if (!activity.Isreg && !activity.Isold && !activity.Issign){
                // 未注册未过期
                canReg = true
                regBtnText = '立即注册'
            } else if (activity.Isreg && !activity.Isold && !activity.Issign){
                // 已注册未过期
                canReg = false
                regBtnText = '取消注册'
            } else if (activity.Issign) {
                // 已注册已签到，不能取消不能注册
                canReg = false
                regBtnText = '已签到'
            }
            else {
                // 过期
                canReg = false
                regBtnText = '已过期'
            }
            that.setData({
                canReg: canReg,
                regBtnText: regBtnText
            })
            // =============测试取消注册===============
            // that.setData({
            //     canReg: false,
            //     regBtnText: '取消注册',
            //     'activity.Isreg': 1
            // })
            // console.log(WxParse)
            var article = '<div>'+that.data.activity.videodesc+'</div>';
            /**
             * WxParse.wxParse(bindName , type, data, target,imagePadding)
             * 1.bindName绑定的数据名(必填)
             * 2.type可以为html或者md(必填)
             * 3.data为传入的具体数据(必填)
             * 4.target为Page对象,一般为this(必填)
             * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
             */
             WxParse.wxParse('article', 'html', article, that, 5);
        }, function fail (data) {
        })
    },
    /**
     * 进行活动注册
     */
    regAction: function () {
        // 先判断是否登录，未登录需先登录，已登录则从本地获取用户信息
        // let islogin = wx.getStorageSync('isLogin')
        // if (islogin == false) {//未登录
        // wx.navigateTo({
        //     url: '../../mine/login/login'
        // })
        //     return
        // }
        // let userInfo = wx.getStorageSync('userInfo')
        // this.setData({
        //     userID: userInfo.ID
        // })
        var that = this
        if(this.data.canReg){
            console.log('可注册')
            console.log(this.data)
            // 可注册
            const that = this
            const alert = (content) => {
                $wuxDialog.alert({
                    title: '提示', 
                    content: content, 
                })
            }
            $wuxDialog.confirm({
                title: '提示', 
                content: '您确定要注册吗？',
                onConfirm(e) {
                    // alert(content)
                    console.log('用户点击确定')
                    console.log(e)
                    CCRequest.ccRequest(regVideoPath, { "userID": that.data.userID, "VideoID": that.data.id},
                    function success(data){
                        // 提示用户注册成功
                        wx.showToast({
                            title: '注册成功！',
                            icon: 'success',
                            duration: 2000
                        })
                        // that.showToastText('注册成功！')
                        // 将显示文字修改成取消注册
                        that.setData({
                            canReg: false,
                            regBtnText: '取消注册',
                            'activity.Isreg': 1
                        })
                        // 注册成功后需要提示是否去付钱（meetfee > 0 并且没有过期的）
                        // 传入注册ID 用于支付
                        setTimeout(function () {
                            that.showPayToast(data.OrderID)
                        }, 2000);
                    }, function fail(data){
                        if (data.info){
                            that.showToastText(data.info)
                            console.log(data.info)
                        }
                    })
                },
            })
        } else {
            if (!this.data.activity.Isold && !this.data.activity.Issign ){
                // 不可注册的两种情况（1.已过期，2.未过期已经注册可取消）
                // 未过期
                //已签到不可取消
                wx.showModal({
                title: '提示',
                content: '您确定要取消注册吗？',
                success: function(res) {
                    if (res.confirm) {
                    console.log('取消注册')
                    CCRequest.ccRequest(videoRegCancelPath, { 
                        "userID": that.data.userID,
                        "VideoID": that.data.id
                    },function success(data){
                        that.showToastText("取消注册成功")
                        // 将显示文字修改成取消注册
                        that.setData({
                        canReg: true,
                        regBtnText: '立即注册',
                        'activity.Isreg': 0
                        })
                    }, function fail(data){
                        if (data.info) {
                        that.showToastText(data.info)
                        console.log(data.info)
                        }
                    })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
                })
            }else{
                // 已过期,不做任何操作
                // 已签到，不作作何处理  【-by alimoon】
                console.log('已过期')
            }
        }
    },
    /**
     * 看视频
     */
    watchVideo: function (e) {

    },
    /**
     * 听录音
     */
    listenVoice: function (e) {

    },
    foldOrExtend: function (e) {
        console.log('点击折叠。。。。')
        var isFold = this.data.isDescFold
        this.setData({
            isDescFold: !isFold,
        })
        console.log(this.data.isDescFold)
    },
    /**
     * 支付相关
     */
    paySuccess: function () {
        console.log("支付成功")
        wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
        })
        setTimeout(function () {
            wx.navigateBack({
            })
        }, 2000)
    },

    payfailure: function () {
        function showToastCancel(message) {
            $wuxToast.show({
                type: 'cancel',
                timer: 1500,
                color: '#fff',
                text: message,
                success: () => console.log(message)
            })
        };
        showToastCancel('付款失败');
    },

    showPayToast:function(id){
        var that = this
        function wx_pay(id){
        console.log("id=", id)
            wx.login({
                success: function (loginCode) {
                //调用request请求api转换登录凭证  
                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + loginCode.code,
                        header: {
                        'content-type': 'application/json'
                        },
                        success: function (res) {
                            console.log(res.data.openid);
                            CCRequest.ccRequestWithURL("https://www.lcouncil.com/index.php/Home/pay/getprepay", {
                                orderID: id,  /*订单号*/
                                openid: res.data.openid
                            }, function success(data) {
                                console.log(data);
                                var obj = {
                                    'timeStamp': data.timeStamp,
                                    'nonceStr': data.nonceStr,
                                    'package': data.package,
                                    'signType': data.signType,
                                    'paySign': data.paySign,
                                    'success': function (res) {
                                        console.log("success");
                                        console.log(res);
                                        that.paySuccess();
                                    },
                                    'fail': function (res) {
                                        console.log('fail:' + JSON.stringify(res));
                                        that.payfailure()
                                    },
                                };
                                console.log(obj)
                                wx.requestPayment(obj);
                            }, function fail(data) {
                                if (data.info) {
                                that.showToastText(data.info)
                                console.log(data.info)
                                }
                            })
                        },
                        fail: function (err) {
                            console.log(err)
                        }
                    })
                }
            })
        }

        if (this.data.activity.Isold == 0 && this.data.activity.Meetfee > 0){
        //提示付费
        console.log('提示付费')
        wx.showModal({
            title: '提示',
            content: '参加活动需要付费，您需要进行支付吗？',
            confirmText: "确定",
            cancelText: "取消",
            success: function (res) {
            console.log(res);
            if (res.confirm) {
                console.log('确定')
                wx_pay(id)
            } else {
                console.log('取消')
            }
            }
        });
        }
    },
    onShareAppMessage: function() {
        // 用户点击右上角分享
        return {
            // title: '活动详情', // 分享标题
            path: 'pages/activityList/activitydetail/activitydetail?id='+this.data.id+"&isShare=true" // 分享路径
        }
    },

})