// miniprogram/pages/login.js
wx.cloud.init({
  env: 'engineering-dvsy5'
})
const db = wx.cloud.database({
  env: 'engineering-dvsy5'
})
const info = db.collection('id-major')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid:'',
    list:{}
  },
  
  getOpenid(){
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('openid--', res.result)
        var openid = res.result.openid
        this.setData({
          openid: openid
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("用户授权了");
          info.where({"_openid":that.openid}).get().then(res=>{console.log(res);
          that.setData({list: res.data});
          console.log(that.data.list.length);
          })
          setTimeout(function () {
            if (that.data.list.length > 0) {
              info.where({ "_openid": that.openid}).get().then(res => {
                app.globalData.idcache = res.data[0]._id;
                app.globalData.major = res.data[0].major;
                app.globalData.sem = res.data[0].sem;
                console.log('major:', app.globalData.major);
              })
              wx.switchTab({
                url: '/pages/homepage/homepage',
                success: (result) => {
                  console.log("跳转到首页");
                },
                fail: () => { }
              });
            }
          }, 3000);
        }
        
        else {
          //用户没有授权
          console.log("用户没有授权");
        }
      }
    });
  },

  bindGetUserInfo: function (res) {
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      that.getOpenid();
      //app.globalData.openid = that.openid;
      console.log("用户的信息如下：");
      console.log(res.detail.userInfo);
      setTimeout(function () {
        console.log(that.data.openid);
        if(that.data.list.length==0){
          info.add({
            data: {
              major: 0,
              sem: 0,
              nickName: res.detail.userInfo.nickName,
              avatarUrl: res.detail.userInfo.avatarUrl,
            },
            success: function (res) {
              console.log(res._id)
              app.globalData.idcache = res._id;
              console.log(app.globalData.idcache);
            },
          })
        }
      }, 1000);
      //授权成功后,跳转页面
      wx.navigateTo({
        url: '/pages/settings/settings',
        success: (result) => {
          console.log("跳转");
        },
        fail: () => { }
      });
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      // that.setData({
      //   isHide: false
      // });
    } 
    else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
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