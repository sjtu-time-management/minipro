// miniprogram/pages/settings/settings.js
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
    //openid:'',
    array: ['信息安全', '信息工程', '计算机科学与技术', '测控技术与仪器'],
    sem_array: ['大一上','大一下','大二上','大二下','大三上','大三下','大四上','大四下'],
    index: app.globalData.major,
    sem_index: app.globalData.sem,
    pic: '/images/user-unlogin.png',
    nickName: '',
  },

  // getOpenid() {
  //   wx.cloud.callFunction({
  //     name: 'getOpenid',
  //     complete: res => {
  //       console.log('openid--', res.result)
  //       var openid = res.result.openid
  //       this.setData({
  //         openid: openid
  //       })
  //     }
  //   })
  // },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
 
  bindPickerChange2: function (e) {
    console.log('picker2发送选择改变，携带值为', e.detail.value)
    this.setData({
      sem_index: e.detail.value
    })
  },
  
  onLoad:function(e){
    //this.getOpenid();
    this.setData({
      index: app.globalData.major,
      sem_index: app.globalData.sem,
    });
    info.doc(app.globalData.idcache).get().then(res => {
      this.setData({
        nickName: res.data.nickName,
        pic: res.data.avatarUrl,
      })
    })
  },
  
  onSave:function(e){
    console.log(this.data.index);
    info.doc(app.globalData.idcache).update({
      data:{
        'major':parseInt(this.data.index),
        'sem':parseInt(this.data.sem_index)
        },
      success: function(res){
        console.log('db updated');
      },
    });
    console.log('sem_index:', this.data.sem_index);
    app.globalData.major = this.data.index;
    app.globalData.sem = this.data.sem_index;
    console.log(app.globalData.major);
    wx.switchTab({
      url: '../homepage/homepage',
    })
  },
})