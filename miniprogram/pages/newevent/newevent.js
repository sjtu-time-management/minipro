wx.cloud.init({
  env:'engineering-dvsy5',
  traceUser:true,
})
const db = wx.cloud.database({
  env: 'engineering-dvsy5'
})
const test2 = db.collection('test2')

import { $wuxCalendar } from '../../dist/index'
Page({
  data: {
    itag: '',
    idetail: '',
    dates: [],
    cend:'',
    cstart:'',
    n:0,
    notifi: { name: 'notifi' },
    noti_flag: false,
    code: '',
    array: ['30分钟前', '10分钟前', '5分钟前', '时间生效时'],
    times: '',
    disabled: true,
    noti_index: 0,
    current: 0,
    spinstatus:true
  },

  openCalendar1() {
    $wuxCalendar().open({
      value: this.data.dates,
      onChange: (values, displayValues) => {
        console.log('onChange', values, displayValues)
        this.setData({
          dates: displayValues,
        })
      },
    })
  },

  onClick() {

    if (!this.data.itag && this.data.current == 0) {
      wx.showToast({
        title: '请完整填写',
        icon: 'none'
      });
      return;
    }

    if (this.data.cend < this.data.cstart && this.data.current==1) {
      wx.showToast({
        title: '结束时间不可早于开始时间哦~',
        icon: 'none'
      });
      return;
    }

    const current = this.data.current + 1 > 2 ? 0 : this.data.current + 1
    this.setData({
      current,
    })
  },
  onClick1() {

    const current = this.data.current - 1 < 0 ? 0 : this.data.current - 1
    this.setData({
      current,
    })
  },

  checkbox_change: function (e) {

    this.setData({ noti_flag: !this.data.noti_flag })
    this.setData({ disabled: !this.data.disabled })
  },
  bindnotiChange: function (e) {
    this.setData({ noti_index: e.detail.value })
  },

  inputTag: function(e) {
    this.setData({
      itag: e.detail.value.trim()
    });
  },

  inputDetail: function(e) {
    this.setData({
      idetail: e.detail.value.trim()
    });
  },
  bindTimeChange: function(e) {

    console.log(e)

    this.setData({

      cstart: e.detail.value

    })

  },

  bindTimeChangeend: function (e) {

    console.log(e.detail.value)

    this.setData({

      cend: e.detail.value

    })
  },

  onLoad: function() {
    var that = this;
    this.setData({
      spinstatus: true
    })
    setTimeout(function () {
      that.setData({
        spinstatus: false
      })

    }, 1000)

    var t = new Date();
    var a = "-";
    var b=":"
    var e = t.getFullYear();
    var i = t.getMonth() + 1;
    var s = t.getDate();
    var h =t.getHours();
    var m=t.getMinutes();
    if (i >= 1 && i <= 9) {
      i = "0" + i;
    }
    if (s >= 0 && s <= 9) {
      s = "0" + s;
    }
    if (h >= 0 && h <= 9) {
      h = "0" + h;
    }
    if (m >= 0 && m <= 9) {
      m = "0" + m;
    }
    var n = e + a + i + a + s;
    var inittime=h+b+m;
    this.setData({
      dates:[n],
      cstart:inittime,
      cend:inittime
    })
  },
  
  commitbutton: function() {
    //判断是否提醒
    if (this.data.noti_flag) {
      var that = this;
      wx.login({
        success(res) {
          wx.cloud.init()
          wx.cloud.callFunction({
            name: 'getapp',
          }).then(res => {
            that.setData({ openid: res.result.openid })
            db.collection('test2').add({
              data: {
                itag: that.data.itag,
                idetail: that.data.idetail,
                iyear: that.data.dates,
                cstart: that.data.cstart,
                cend: that.data.cend,
                itime: that.data.times,
                noti_flag: that.data.noti_flag
              },
              success: function (res) {
                that.setData({ _id: res._id })
                console.log(res)
                wx.cloud.callFunction({
                  name: 'http',
                  data: {
                    url: 'http://c99357a536e4.ngrok.io/test/database/miniapi.php',
                    _data: {
                      _openid: that.data.openid,
                      _id: that.data._id,
                      itag: that.data.itag,
                      iyear: that.data.dates,
                      itime: that.data.cstart,
                      noti_index: that.data.noti_index
                    },
                  }
                })
                  .then(res => {
                    if (res.result === '200') {
                      wx.showToast({
                        title: '提醒设置完成！', icon: 'none'
                      })
                      console.log('成功！！！')
                    }
                    else {
                      wx.showToast({
                        title: '提醒设置失败！', icon: 'none'
                      })
                      db.collection('test2').doc(that.data._id).update({
                        data: {
                          noti_flag: false
                        }
                      })
                    }
                    console.log(res)
                  })
                  .catch(res => {
                    wx.showToast({
                      title: '提醒设置失败！', icon: 'none'
                    })
                    db.collection('test2').doc(that.data._id).update({
                      data: {
                        noti_flag: false
                      }
                    })
                    console.log(res)
                  })
              },
            })
          })
            .catch(res => {
              wx.showToast({
                title: '获取openid失败！'
              })
              console.log(res)
            })
        }
      })
    }
    else{
    db.collection('test2').add({
      data: {
        itag: this.data.itag,
        idetail: this.data.idetail,
        iyear: this.data.dates,
        cstart: this.data.cstart,
        cend:this.data.cend,
        itime: this.data.times,
        noti_flag: false
      },
      success: function(res) {
        that.setData({ _id: res._id })
        console.log(res)
      },
    })
  }
    wx.showToast({
      title: "Loading",
      icon: 'loading',
      duration: 500,
    })
    setTimeout(function () {
      wx.switchTab({
        url: '/pages/timetable/timetable',
      });
    }, 500)
  }
})