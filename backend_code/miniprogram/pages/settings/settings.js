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
    index: (app.globalData.major - 1 - (app.globalData.major + 7) % 8) / 8,
    sem_index: (app.globalData.major + 7) % 8,
    pic: '/images/user-unlogin.png',
    nickName: '',
    login: app.globalData.login,
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
    var tmp = app.globalData.major;
    var tmp1 = (tmp + 7)%8
    this.setData({
      index: (tmp-1-tmp1)/8,
      sem_index: tmp1,
      login: app.globalData.login,
      nickName: app.globalData.nickName,
      pic: app.globalData.pic,
      })
    console.log("tmp=", tmp);
    console.log("index=", this.data.index);
    console.log("sem_index=", this.data.sem_index);
  },
  
  onSave:function(e){
    console.log("index=", this.data.index);
    console.log("sem_index=", this.data.sem_index);
    var tmp = 8*parseInt(this.data.index)+1+parseInt(this.data.sem_index);
    info.doc(app.globalData.idcache).update({
      data:{
        'major':tmp,
        },
      success: function(res){
        console.log('db updated');
      },
    });
    app.globalData.major = tmp;
    console.log(app.globalData.major);
    wx.switchTab({
      url: '../homepage/homepage',
    })
  },
})