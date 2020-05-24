wx.cloud.init({
  env: 'engineering-dvsy5'
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
    times:'',
    disabled: true,
    noti_index: 0,
    current: 0,
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
    //console.log(this.data.noti_flag)
  },
  bindnotiChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    
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
 
    db.collection('test2').add({
      data: {
        itag: this.data.itag,
        idetail: this.data.idetail,
        iyear: this.data.dates,
        cstart: this.data.cstart,
        cend:this.data.cend
      },
      success: function(res) {
        console.log(res)
      },
    })

    wx.showToast({
      title: "Loading",
      icon: 'loading',
      duration: 500,
    })
    setTimeout(function() {
      wx.navigateBack({})
    }, 500)

  }
})