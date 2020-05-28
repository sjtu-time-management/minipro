wx.cloud.init({
  env: 'engineering-dvsy5'
})
const db = wx.cloud.database({
  env: 'engineering-dvsy5'
})
const info = db.collection('id-major')
var app = getApp();

Page({
  data: { 
    spinstatus:true,
    list:[]
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
        app.globalData.openid = openid
      }
    })
  },
    
  navg:function(){
    wx.navigateTo({
      url: '/pages/settings/settings',
    })
  },

  onLoad:function(){
    var that = this;
    that.getOpenid();
    info.get().then(res=>{console.log(res);
      app.globalData.login=Boolean(res.data.length);
      console.log("login: ",app.globalData.login);
      if (res.data.length){
        info.get().then(res => {
          app.globalData.idcache = res.data[0]._id;
          app.globalData.major = res.data[0].major;
          app.globalData.pic = res.data[0].avatarUrl;
          app.globalData.nickName = res.data[0].nickName;
          console.log('major:', app.globalData.major);
        })
      }
    })
  },

  onShow:function(){
    var that = this;
    this.setData({
      spinstatus: true
    })
    setTimeout(function () {
      that.setData({
        spinstatus: false
      })

    }, 2000)
  }
})