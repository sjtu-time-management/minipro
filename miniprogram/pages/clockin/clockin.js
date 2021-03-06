wx.cloud.init({
  env: 'engineering-dvsy5'
})
const db = wx.cloud.database({
  env: 'engineering-dvsy5'
})
const record = db.collection('dkrecord')
const score = db.collection('score')
var util = require('../../utils/util.js');
var app = getApp();


Page({
  data:{
    time: '',
    value:'',
    date:'',
    flag:false,
    id:'',
    list:[],
    display:[],
    day:[],
    day_my:[],
    display_my:[],
    spinstatus: true,
    lheight: 0,
    lheight_my: 0,
    login_flag: Boolean(app.globalData.login),
  },


  inputfun:function(e){
    this.setData({
      value:e.detail.value   
    });
  },

  paihang:function(e){
    wx.navigateTo({
      url: '../rankinglist/rankinglist',
    })
  },

  commitbutton:function(e){
    if (this.data.value=='') {
      wx.showToast({
        title: '输入内容不可为空哦~',
        icon: 'none'
      })
      return;
    }
    
    var tmp = String(this.data.date.getFullYear())+' - '+String(this.data.date.getMonth()+1)+' - '+String(this.data.date.getDate());
    record.where({
      '_openid': app.globalData.openid,
      'timeStr': tmp,
    }).get().then(res => {
      console.log(res);
      if (res.data.length==2) {
        wx.showToast({
          title: '今天已经打卡两次了哦~',
          icon: 'none'
        })
        return;
      }
      
      //在数据库里增加打卡记录
      record.add({
        data: {
        time:this.data.date,
        timeStr:String(this.data.date.getFullYear())+' - '+String(this.data.date.getMonth()+1)+' - '+String(this.data.date.getDate()),
        record:this.data.value,
        nickName: app.globalData.nickName,
        pic:app.globalData.pic
        },
        success: function (res) {
          console.log(res)
        },
      })
      console.log(this.data.list.length)

      //修改打卡分数
      if(this.data.list.length==0)
      {
        score.add({
          data: {
            score: 1,
            username: app.globalData.nickName,
            pic: app.globalData.pic
          },
          success: function (res) {
            console.log(res)
          },
        })
      }
      if (this.data.list.length == 1)
      {
        score.doc(
          this.data.list[0]._id
        ).update({
          data: {
            score:this.data.list[0].score+1
          },
          success: function (res) {
            console.log(res.data)
          }
        })
      }
      wx.reLaunch({
        url: "/pages/homepage/homepage"
      });
      this.setData({
        value: ''
      });
    })
  },

  onLoad: function (options) {
    var that = this;
    this.setData({
     spinstatus: true,
    })    
    setTimeout(function () {
       that.setData({
       spinstatus: false,
       login_flag: app.globalData.login,
     })
   }, 500)
  var time = util.formatTime(new Date());
  // 再通过setData更改Page()里面的data，动态更新页面的数据
  this.setData({
    time: time,
    date: new Date(time),
  });
  console.log("date:",this.data.date, time)
  //判断当前是否是打卡时间
  var hour=Number(time[11]+time[12])
  if(hour==6||hour==7||hour==17||hour==21||hour==22)
  {
    this.setData({
      flag: true
    });
  }
  //查询数据库里是否有相关记录
  const app = getApp()
  this.setData({
    id: app.globalData.openid
  });
  console.log(this.data.id)
  score.where({
    '_openid': app.globalData.openid
  }).get()
    .then(res => {
      console.log(res);
      this.setData({
        list: res.data
      });
    })
    
  },

  onShow: function() {
    var that = this;
    this.setData({login_flag: Boolean(app.globalData.login)});
    record.get()
    .then(res => {
      console.log("record:",res.data);
      var tmp = [{},{},{},{},{}];
      for (var i = 0; i < 5; i++){
        tmp[i]=res.data[res.data.length-i-1]
      }
      this.setData({
        display: tmp,
        lheight:Number(160*res.data.length)
      });
    })
    record.where({'_openid': app.globalData.openid}).get()
    .then(res => {
      console.log("record_my:",res.data);
      this.setData({
        display_my: res.data.reverse(),
        lheight_my: Number(160*res.data.length)
      });
    })
  }
})