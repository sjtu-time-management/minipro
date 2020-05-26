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
    lheight: 0,
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

    //在数据库里增加打卡记录
    record.add({
      data: {
      time:this.data.date,
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
  },

 onLoad: function (options) {
  var time = util.formatTime(new Date());
  // 再通过setData更改Page()里面的data，动态更新页面的数据
  this.setData({
    time: time
  });
    this.setData({
      date: new Date(time)
    });
    console.log(this.data.date) 
    //判断当前是否是打卡时间
    var hour=Number(time[11]+time[12])
    if(hour==6||hour==7||hour==8||hour==21||hour==22||hour==23)
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
  }
})