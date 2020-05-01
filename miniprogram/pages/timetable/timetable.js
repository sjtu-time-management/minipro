wx.cloud.init({
  env: 'engineering-dvsy5'
})
const db = wx.cloud.database({
  env: 'engineering-dvsy5'
})
const test = db.collection('test2')
const test3 = db.collection('test3')
var app = getApp();
var util = require('../../utils/util.js'); //获取时间
Page({
  data: {
    records: [],
    records1: [],
    time: '',
    dates: '',
    loading: false,
    disabled: false,
    dayofweek: ''
  },

  addnewevent: function(e) {
    this.setData({
      loading: this.data.loading = true,
      disabled: this.data.disabled = true
    })
    wx.navigateTo({
      url: '/pages/newevent/newevent',
    })
  },
  // change2
  addnewclass: function(e) {
    this.setData({
      loading: this.data.loading = true,
      disabled: this.data.disabled = true
    })
    wx.navigateTo({
      url: '/pages/newclass/newclass',
    })
  },
  //需要和gsh交互!!!!!!!!!!!!!!!!!
  deleteEvent: function(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var records = this.data.records;
    db.collection('test2').doc(this.data.records[index]._id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
        console.error('[数据库] [删除记录] 失败：', err)
      }
    })
    records.splice(index, 1);
    this.setData({
      records: records
    });
    wx.setStorageSync('records', this.data.records);
  },
  onShow: function() {

    //this.onLoad()
    var that = this;
    //change424
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
    this.setData({
      dates: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + time[6] + '-' + time[8] + time[9]
    });
    console.log(this.data.dates)
    //星期几
    var numofday = 0;
    if (this.data.dates[3] == 0) {
      numofday += 0;
      if (this.data.dates[5] == 0 && this.data.dates[6] == 1) {
        numofday += 0;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 2) {
        numofday += 31;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 3) {
        numofday += 60;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 4) {
        numofday += 91;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 5) {
        numofday += 121;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 6) {
        numofday += 152;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 7) {
        numofday += 182;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 8) {
        numofday += 213;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 9) {
        numofday += 244;
      } else if (this.data.dates[5] == 1 && this.data.dates[6] == 0) {
        numofday += 274;
      } else if (this.data.dates[5] == 1 && this.data.dates[6] == 1) {
        numofday += 305;
      } else if (this.data.dates[5] == 1 && this.data.dates[6] == 2) {
        numofday += 335;
      }
    } else if (this.data.dates[3] == 1) {
      numofday += 366;
      if (this.data.dates[5] == 0 && this.data.dates[6] == 1) {
        numofday += 0;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 2) {
        numofday += 31;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 3) {
        numofday += 59;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 4) {
        numofday += 90;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 5) {
        numofday += 120;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 6) {
        numofday += 151;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 7) {
        numofday += 181;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 8) {
        numofday += 212;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 9) {
        numofday += 243;
      } else if (this.data.dates[5] == 1 && this.data.dates[6] == 0) {
        numofday += 273;
      } else if (this.data.dates[5] == 1 && this.data.dates[6] == 1) {
        numofday += 304;
      } else if (this.data.dates[5] == 1 && this.data.dates[6] == 2) {
        numofday += 334;
      }
    } else if (this.data.dates[3] == 2) {
      numofday += 731;
      if (this.data.dates[5] == 0 && this.data.dates[6] == 1) {
        numofday += 0;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 2) {
        numofday += 31;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 3) {
        numofday += 59;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 4) {
        numofday += 90;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 5) {
        numofday += 120;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 6) {
        numofday += 151;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 7) {
        numofday += 181;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 8) {
        numofday += 212;
      } else if (this.data.dates[5] == 0 && this.data.dates[6] == 9) {
        numofday += 243;
      } else if (this.data.dates[5] == 1 && this.data.dates[6] == 0) {
        numofday += 273;
      } else if (this.data.dates[5] == 1 && this.data.dates[6] == 1) {
        numofday += 304;
      } else if (this.data.dates[5] == 1 && this.data.dates[6] == 2) {
        numofday += 334;
      }
    }
    numofday += (this.data.dates[8] + this.data.dates[9] - 1);
    this.setData({
      dayofweek: ((numofday % 7) + 3) % 7
    })

    var app = getApp();
    this.setData({
      loading: this.data.loading = false,
      disabled: this.data.disabled = false
    });
    var _this = this;
    const db = wx.cloud.database({
      env: 'engineering-dvsy5'
    })
    db.collection('test2').where({
      iyear: that.data.dates
    }).get({
      success: res => {
        console.log(res.data)
        that.setData({
          records: res.data
        })
        db.collection('test3').where({
          cdow: that.data.dayofweek
        }).get({
          success: res => {
            console.log(res.data)
            that.setData({
              records: that.data.records.concat(res.data)
            })
            //排序程序段
            var mid = '';
            var newrec = that.data.records;
            for (var i = 1; i < newrec.length; ++i) {
              for (var j = 1; j <= newrec.length - i; ++j) {
                if (newrec[j].cstart < newrec[j - 1].cstart) {
                  mid = newrec[j];
                  newrec[j] = newrec[j - 1];
                  newrec[j - 1] = mid;
                }
              }
            }
            that.setData({
              records: newrec
            })
            //end
          }
        })
      }
    })

    db.collection('bixiu').get({

      success: res => {
        console.log(res.data)
        app.globalData.bixiuss = res.data

      }
    })

  },
  onLoad: function(options) {

    //问题，1，可以直接获取到一个数组，但存在获取不及时的问题，2，可以用延时，但效果不好，3，可以加一个button????
    //setTimeout(function () {
    // this.addnewevent1
    //console.log(111)
    //要延时执行的代码
    // }, 10000) //延迟时间 这里是1秒

  },

  test111: function() {
    console.log(this.data.records[1].iyear - this.data.records[0].iyear)
  }
})