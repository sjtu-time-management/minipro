// miniprogram/pages/newclass/newclass.js
wx.cloud.init({
  env: 'engineering-dvsy5'
})
const db = wx.cloud.database({
  env: 'engineering-dvsy5'
})
const bixiu = db.collection('bixiu')
const test3 = db.collection('test3')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    casIndex: 0,
    casIndex2:0,
    casIndex3: 0,
    casIndex4: 0,
    classes:[],
    dayofweek: ['周一', '周二', '周三', '周四', '周五','周六','周日'],
    classno1: ['1', '2', '3', '4', '5','6','7','8','9','10','11'],
    classno2: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],

  itag:'',
  cstart:'',
  cend:'',
  cdow:''

  },
  bindCasPickerChange: function (e) {
    console.log('选的是', this.data.classes[e.detail.value])
    if (e.detail.value == 0) {
      this.setData({ reply: true })
    } else {
      this.setData({ reply: false })
    }
    this.setData({
      casIndex: e.detail.value
    })
  if(this.data.casIndex!="0")
  {
    this.setData({
      itag: this.data.classes[this.data.casIndex]
    })
  }
  },
  inputname:function(e){
    this.setData({
      itag: e.detail.value.trim()
    });
    console.log(this.data.classname)
  },
  //zhouji
  bindCasPickerChange2: function (e) {
    this.setData({
      casIndex2: e.detail.value
    })

      var dow=this.data.casIndex2;
      dow++;
      dow=dow%7;
      this.setData({
        cdow:dow
      })

  },
  //开始的节次
  bindCasPickerChange3: function (e) {
    console.log(e)
    this.setData({
      casIndex3: e.detail.value
    })
    var starts = this.data.casIndex3;
    var start;
    console.log(starts)
    switch(starts){
      // 坑
      case "0":
        start = '08:00';
        break;
      case "1":
        start = '08:55';
        break;
      case "2":
        start = '10:00';
        break;
      case "3":
        start = '10:55';
        break;
      case "4":
        start = '12:00';
        break;
      case "5":
        start = '12:55';
        break;
      case "6":
        start = '14:00';
        break;
      case "7":
        start = '14:55';
        break;
      case "8":
        start = '16:00';
        break;
      case "9":
        start = '16:55';
        break;
      case "10":
        start = '18:00';
        break;
      case "11":
        start = '18:55';
        break;
    }
    this.setData({
      cstart: start
    })

    
  },
  //结束的节次
  bindCasPickerChange4: function (e) {
    this.setData({
      casIndex4: e.detail.value
    })
    var ends = this.data.casIndex4;
    console.log(ends)
    var end;
    switch(ends){
      case "0":
        end ='08:45';
        break;
      case "1":
        end ='09:40';
        break;
      case "2":
        end ='10:45';
        break;
      case "3":
        end ='11:40';
        break;
      case "4":
        end ='12:45';
        break;
      case "5":
        end ='13:40';
        break;
      case "6":
        end ='14:45';
        break;
      case "7":
        end ='15:40';
        break;
      case "8":
        end ='16:45';
        break;
      case "9":
        end ='17:40';
        break;
      case "10":
        end ='18:45';
        break;
      case "11":
        end ='19:40';
        break;
      case "12":
        end='20:20';
        break;

    }
    this.setData({
      cend: end
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database({
      env: 'engineering-dvsy5'
    })

    var i;
    if (!this.data.classes[0]) {
      for (i = 0; i < app.globalData.bixiuss.length; i++) {
        console.log(app.globalData.bixiuss[i].major1),
          this.setData({
          classes: this.data.classes.concat(app.globalData.bixiuss[i].major1)
          })
      }
    }


  },
  combutton:function(){
    if (this.data.cend < this.data.cstart) {
      wx.showToast({
        title: '结束时间不可早于开始时间哦~',
        icon: 'none'
      });
      return;
    }
    db.collection('test3').add({
      data: {
        itag: this.data.itag,
        cstart: this.data.cstart,
        cend: this.data.cend,
        cdow: this.data.cdow
      },
      success: function (res) {
        console.log(res)
      },
    })
    wx.showToast({
      title: "Loading",
      icon: 'loading',
      duration: 500,
    })
    setTimeout(function () {
      wx.navigateBack({})
    }, 500)
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