var result
wx.cloud.init({
  env:'engineering-dvsy5',
  traceUser:true,
})
const db = wx.cloud.database({
  env: 'engineering-dvsy5'
})
const test = db.collection('test2')
const test3 = db.collection('test3')
const idmajor = db.collection('id-major')
var app = getApp();
var util = require('../../utils/util.js'); //获取时间

function del(flag, records, index, that) {
  if (flag) {
    wx.cloud.callFunction({
      name: 'http',
      data: {
        url: 'http://9ff9d76e.ngrok.io/test/database/delapi.php',
        _data: {
          _id: records[index]._id,
          _itag: records[index]._itag,
          cdow: records[index].cdow
        }
      }
    })
      .then(res => {
        result = res.result
        console.log(result)
        if (result == 251) {
          console.log(res)
          db.collection('test2').doc(records[index]._id).remove({
            success: res => {
              wx.showToast({
                title: '删除成功',
              })
            },
            fail: err => {
              console.log(121);
            }
          })
          db.collection('test3').doc(records[index]._id).remove({
            success: res => {
              console.log(131);
              wx.showToast({
                title: '删除成功',
              })
            },
            fail: err => {
              console.log(141);
            }
          })
          records.splice(index, 1);
          that.setData({
            records: records
          });
          wx.setStorageSync('records', records);
        }
      })
      .catch(res => {
        wx.showToast({
          title: '删除失败！', icon: 'none'
        })
        console.error('后端数据删除失败：', res)
      }
      )
  }
  else {
    db.collection('test2').doc(records[index]._id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
      },
      fail: err => {
        console.log(121);
      }
    })
    db.collection('test3').doc(records[index]._id).remove({
      success: res => {
        console.log(131);
        wx.showToast({
          title: '删除成功',
        })
      },
      fail: err => {
        console.log(141);
      }
    })
    records.splice(index, 1);
    that.setData({
      records: records
    });
    wx.setStorageSync('records', records);
  }
}

const buttons = [{
    label: '添加事件',
    icon: '/icons/shi.jpg'
  },
  {
    label: '添加课程',
    icon: '/icons/ke.jpg'
  },
  {
    label: '前往打卡',
    icon: '/icons/ka.jpg'
  },
  {
    openType: 'share',
    label: '分享',
    icon: '/icons/xiang.jpg'
  },
]

Page({
  data: {
    records: [],
    records1: [],
    records2: [],
    records3: [],
    records4: [],
    records5: [],
    records6: [],
    time: '',
    dates: '',
    loading: false,
    disabled: false,
    dayofweek: '',
    navState: 0, //导航状态
    t0: '',
    t1: '',
    t2: '',
    t3: '',
    t4: '',
    t5: '',
    t6: '',
    m1: '',
    m2: '',
    m3: '',
    m4: '',
    m5: '',
    m6: '',
    dates1: '',
    dates2: '',
    dates3: '',
    dates4: '',
    dates5: '',
    dates6: '',
    swiperheight: 0,
    weather: {
      'wea_img': 'qing'
    }, //实况天气
    weatherweek: [], //七日天气
    pics: ["cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/5241.jpg", "cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/52410.jpg",
      "cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/52411.jpg",
      "cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/52412.jpg",
      "cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/52413.jpg",
      "cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/52414.jpg",
      "cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/5242.jpg",
      "cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/5243.jpg",
      "cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/5244.jpg",
      "cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/5245.jpg",
      "cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/5246.jpg",
      "cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/5247.jpg",
      "cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/5248.jpg",
      "cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/5249.jpg",
      "cloud://engineering-dvsy5.656e-engineering-dvsy5-1301650528/c727b73d-67be-41c0-a369-d7636b3dcd01.jpg"
    ],
    bkindex: 0,
    spinstatus: true,
    totalh:0,
    buttons
  },
  changebk: function() {
    var that = this;
    this.setData({
      spinstatus: true
    })
    setTimeout(function () {
      that.setData({
        spinstatus: false
      })
    }, 600)
    var i = this.data.bkindex
    i = (i + 1) % (this.data.pics.length)
    this.setData({
      bkindex: i
    })
  },
  onClick(e) {
    console.log('onClick', e.detail)
    if (e.detail.index === 0) {
      wx.navigateTo({
        url: '/pages/newevent/newevent',
      })
    }
    if (e.detail.index === 1) {
      wx.navigateTo({
        url: '/pages/newclass/newclass',
      })
    }
    if (e.detail.index === 2) {
      wx.switchTab({
        url: '/pages/clockin/clockin',
      })
    }
  },

  bindchange(e) {
    // console.log(e.detail.current)
    let index = e.detail.current;
    this.setData({
      navState: index
    })
    if (index == 0) {
      var h = this.data.records.length;
      this.setData({
        swiperheight: h * 200
      })
    }
    if (index == 1) {
      var h = this.data.records1.length;
      this.setData({
        swiperheight: h * 200
      })
    }
    if (index == 2) {
      var h = this.data.records2.length;
      this.setData({
        swiperheight: h * 200
      })
    }
    if (index == 3) {
      var h = this.data.records3.length;
      this.setData({
        swiperheight: h * 200
      })
    }
    if (index == 4) {
      var h = this.data.records4.length;
      this.setData({
        swiperheight: h * 200
      })
    }
    if (index == 5) {
      var h = this.data.records5.length;
      this.setData({
        swiperheight: h * 200
      })
    }
    if (index == 6) {
      var h = this.data.records6.length;
      this.setData({
        swiperheight: h * 200
      })
    }

  },
  //点击导航
  navSwitch: function(e) {
    // console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    this.setData({
      navState: index
    })
  },
  // 以上左右滑动

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

  deleteEvent: function (e) {
    var index = e.currentTarget.dataset.index;
    var records = this.data.records;
    var flag = records[index].noti_flag;
    del(flag, records, index, this);
    this.onShow();
  },
  // 优化，写成类/删除失败
  deleteEvent1: function (e) {
    var index = e.currentTarget.dataset.index;
    var records = this.data.records1;
    var flag = records[index].noti_flag;
    del(flag, records, index, this);
    this.onShow();
  },
  deleteEvent2: function (e) {
    var index = e.currentTarget.dataset.index;
    var records = this.data.records2;
    var flag = records[index].noti_flag;
    del(flag, records, index, this);
    this.onShow();
  },
  deleteEvent3: function (e) {
    var index = e.currentTarget.dataset.index;
    var records = this.data.records3;
    var flag = records[index].noti_flag;
    del(flag, records, index, this);
    this.onShow();
  },
  deleteEvent4: function (e) {
    var index = e.currentTarget.dataset.index;
    var records = this.data.records4;
    var flag = records[index].noti_flag;
    del(flag, records, index, this);
    this.onShow();
  },
  deleteEvent5: function (e) {
    var index = e.currentTarget.dataset.index;
    var records = this.data.records5;
    var flag = records[index].noti_flag;
    del(flag, records, index, this);
    this.onShow();
  },
  deleteEvent6: function (e) {
    var index = e.currentTarget.dataset.index;
    var records = this.data.records6;
    var flag = records[index].noti_flag;
    del(flag, records, index, this);
    this.onShow();
  },
  /////////
  ////////////
  /////////
  //////////
  ////////////
  //////////
  ////////////
  //////////
  onShow: function() {
    var that = this;
    this.setData({
      spinstatus:true
    })
    setTimeout(function() {
      that.setData({
        spinstatus:false
      })

    }, 2000)
this.setData({
  totalh:wx.getSystemInfoSync().windowHeight
})
    
    var myDate = new Date();

    //this.onLoad()
    
    //change424
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    that.setData({
      time: time
    });
    that.setData({
      dates: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + time[6] + '-' + time[8] + time[9]
    });
    console.log(that.data.dates)
    console.log(12138)
    that.setData({
      t0: Number(time[8]) * 10 + Number(time[9])
    })
    console.log(that.data.t0)
    that.setData({
      t1: (that.data.t0 + 1) % 31,
    })
    that.setData({
      t2: (that.data.t1 + 1) % 31,
    })
    that.setData({
      t3: (that.data.t2 + 1) % 31,
    })
    that.setData({
      t4: (that.data.t3 + 1) % 31,
    })
    that.setData({
      t5: (that.data.t4 + 1) % 31,
    })
    that.setData({
      t6: (that.data.t5 + 1) % 31,
    })
    if (that.data.t1 < that.data.t0) {
      that.setData({
        m1: "6"
      })
    } else {
      that.setData({
        m1: time[6]
      })
    }
    console.log(that.data.m1)
    if (that.data.t2 < that.data.t0) {
      that.setData({
        m2: "6"
      })
    } else {
      that.setData({
        m2: time[6]
      })
    }

    if (that.data.t3 < that.data.t0) {
      that.setData({
        m3: "6"
      })
    } else {
      that.setData({
        m3: time[6]
      })
    }

    if (that.data.t4 < that.data.t0) {
      that.setData({
        m4: "6"
      })
    } else {
      that.setData({
        m4: time[6]
      })
    }
    if (that.data.t5 < that.data.t0) {
      that.setData({
        m5: "6"
      })
    } else {
      that.setData({
        m5: time[6]
      })
    }
    if (that.data.t6 < that.data.t0) {
      that.setData({
        m6: "6"
      })
    } else {
      that.setData({
        m6: time[6]
      })
    }
    if (that.data.t1 < 10) {
      that.setData({
        dates1: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m1 + '-' + '0' + String(that.data.t1)
      });
      console.log(that.data.dates1)
    } else {
      that.setData({
        dates1: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m1 + '-' + String(that.data.t1)
      });
      console.log(that.data.dates1)
    }
    if (that.data.t2 < 10) {
      that.setData({
        dates2: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m2 + '-' + '0' + String(that.data.t2)
      });
      console.log(that.data.dates2)
    } else {
      that.setData({
        dates2: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m2 + '-' + String(that.data.t2)
      });
      console.log(that.data.dates2)
    }
    if (that.data.t3 < 10) {
      that.setData({
        dates3: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m3 + '-' + '0' + String(that.data.t3)
      });
      console.log(that.data.dates3)
    } else {
      that.setData({
        dates3: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m3 + '-' + String(that.data.t3)
      });
      console.log(that.data.dates3)
    }
    if (that.data.t4 < 10) {
      that.setData({
        dates4: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m4 + '-' + '0' + String(that.data.t4)
      });
      console.log(that.data.dates4)
    } else {
      that.setData({
        dates4: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m4 + '-' + String(that.data.t4)
      });
      console.log(that.data.dates4)
    }
    if (that.data.t5 < 10) {
      that.setData({
        dates5: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m5 + '-' + '0' + String(that.data.t5)
      });
      console.log(that.data.dates5)
    } else {
      that.setData({
        dates5: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m5 + '-' + String(that.data.t5)
      });
      console.log(that.data.dates5)
    }
    if (that.data.t6 < 10) {
      that.setData({
        dates6: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m6 + '-' + '0' + String(that.data.t6)
      });
      console.log(that.data.dates6)
    } else {
      that.setData({
        dates6: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m6 + '-' + String(that.data.t6)
      });
      console.log(that.data.dates6)
    }
    //星期几
    this.setData({
      dayofweek: myDate.getDay()
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
                records: newrec,
              },
              () => {
                var h = this.data.records.length;
                this.setData({
                  swiperheight: h * 200
                })
              }
            )
            //end
          }
        })


      }
    })
    db.collection('test2').where({
      iyear: that.data.dates1
    }).get({
      success: res => {
        console.log(res.data)
        that.setData({
          records1: res.data
        })
        db.collection('test3').where({
          cdow: (that.data.dayofweek + 1) % 7
        }).get({
          success: res => {
            console.log(res.data)
            that.setData({
              records1: that.data.records1.concat(res.data)
            })
            //排序程序段
            var mid1 = '';
            var newrec1 = that.data.records1;
            for (var i = 1; i < newrec1.length; ++i) {
              for (var j = 1; j <= newrec1.length - i; ++j) {
                if (newrec1[j].cstart < newrec1[j - 1].cstart) {
                  mid1 = newrec1[j];
                  newrec1[j] = newrec1[j - 1];
                  newrec1[j - 1] = mid1;
                }
              }
            }
            that.setData({
              records1: newrec1
            })
            //end
          }
        })
      }
    })
    db.collection('test2').where({
      iyear: that.data.dates2
    }).get({
      success: res => {
        console.log(res.data)
        that.setData({
          records2: res.data
        })
        db.collection('test3').where({
          cdow: (that.data.dayofweek + 2) % 7
        }).get({
          success: res => {
            console.log(res.data)
            that.setData({
              records2: that.data.records2.concat(res.data)
            })
            //排序程序段
            var mid2 = '';
            var newrec2 = that.data.records2;
            for (var i = 1; i < newrec2.length; ++i) {
              for (var j = 1; j <= newrec2.length - i; ++j) {
                if (newrec2[j].cstart < newrec2[j - 1].cstart) {
                  mid2 = newrec2[j];
                  newrec2[j] = newrec2[j - 1];
                  newrec2[j - 1] = mid2;
                }
              }
            }
            that.setData({
              records2: newrec2
            })
            //end
          }
        })
      }
    })
    db.collection('test2').where({
      iyear: that.data.dates3
    }).get({
      success: res => {
        console.log(res.data)
        that.setData({
          records3: res.data
        })
        db.collection('test3').where({
          cdow: (that.data.dayofweek + 3) % 7
        }).get({
          success: res => {
            console.log(res.data)
            that.setData({
              records3: that.data.records3.concat(res.data)
            })
            //排序程序段
            var mid3 = '';
            var newrec3 = that.data.records3;
            for (var i = 1; i < newrec3.length; ++i) {
              for (var j = 1; j <= newrec3.length - i; ++j) {
                if (newrec3[j].cstart < newrec3[j - 1].cstart) {
                  mid3 = newrec3[j];
                  newrec3[j] = newrec3[j - 1];
                  newrec3[j - 1] = mid3;
                }
              }
            }
            that.setData({
              records3: newrec3
            })
            //end
          }
        })
      }
    })
    db.collection('test2').where({
      iyear: that.data.dates4
    }).get({
      success: res => {
        console.log(res.data)
        that.setData({
          records4: res.data
        })
        db.collection('test3').where({
          cdow: (that.data.dayofweek + 4) % 7
        }).get({
          success: res => {
            console.log(res.data)
            that.setData({
              records4: that.data.records4.concat(res.data)
            })
            //排序程序段
            var mid4 = '';
            var newrec4 = that.data.records4;
            for (var i = 1; i < newrec4.length; ++i) {
              for (var j = 1; j <= newrec4.length - i; ++j) {
                if (newrec4[j].cstart < newrec4[j - 1].cstart) {
                  mid4 = newrec4[j];
                  newrec4[j] = newrec4[j - 1];
                  newrec4[j - 1] = mid4;
                }
              }
            }
            that.setData({
              records4: newrec4
            })
            //end
          }
        })
      }
    })
    db.collection('test2').where({
      iyear: that.data.dates5
    }).get({
      success: res => {
        console.log(res.data)
        that.setData({
          records5: res.data
        })
        db.collection('test3').where({
          cdow: (that.data.dayofweek + 5) % 7
        }).get({
          success: res => {
            console.log(res.data)
            that.setData({
              records5: that.data.records5.concat(res.data)
            })
            //排序程序段
            var mid5 = '';
            var newrec5 = that.data.records5;
            for (var i = 1; i < newrec5.length; ++i) {
              for (var j = 1; j <= newrec5.length - i; ++j) {
                if (newrec5[j].cstart < newrec5[j - 1].cstart) {
                  mid5 = newrec5[j];
                  newrec5[j] = newrec5[j - 1];
                  newrec5[j - 1] = mid5;
                }
              }
            }
            that.setData({
              records5: newrec5
            })
            //end
          }
        })
      }
    })
    db.collection('test2').where({
      iyear: that.data.dates6
    }).get({
      success: res => {
        console.log(res.data)
        that.setData({
          records6: res.data
        })
        db.collection('test3').where({
          cdow: (that.data.dayofweek + 6) % 7
        }).get({
          success: res => {
            console.log(res.data)
            that.setData({
              records6: that.data.records6.concat(res.data)
            })
            //排序程序段
            var mid6 = '';
            var newrec6 = that.data.records6;
            for (var i = 1; i < newrec6.length; ++i) {
              for (var j = 1; j <= newrec6.length - i; ++j) {
                if (newrec6[j].cstart < newrec6[j - 1].cstart) {
                  mid6 = newrec6[j];
                  newrec6[j] = newrec6[j - 1];
                  newrec6[j - 1] = mid6;
                }
              }
            }
            that.setData({
              records6: newrec6
            })
            //end
          }
        })
      }
    })
    //获取major以及必修课
    db.collection('id-major').get({
      success: res => {
        app.globalData.major = res.data[0].major
        db.collection('bixiu').where({
          major: app.globalData.major
        }).get({
          success: res => {
            console.log(res.data)
            app.globalData.bixiuss = res.data

          }
        })

      }
    })

  },

  onLoad: function(options) {
    this.getapi();
  },
  getapi: function() {
    var _this = this;
    // 获取IP地址
    wx.request({
      url: 'https://tianqiapi.com/ip/?version=v6&appid=42921851&appsecret=ubJcta4Y',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res);
        // 根据IP获取天气数据
        _this.weathertoday(res.data.ip);
        _this.weatherweekday(res.data.ip);
      }
    });
  },
  // 天气api实况天气
  weathertoday: function(ip) {
    var _this = this;
    wx.request({
      url: 'https://www.tianqiapi.com/api/?version=v6&appid=42921851&appsecret=ubJcta4Y',
      data: {
        'ip': ip
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        _this.setData({
          weather: res.data
        });
        console.log(_this.data.weather)
      }
    });
  },
  // 天气api实况天气
  weatherweekday: function(ip) {
    var _this = this;
    wx.request({
      url: 'https://www.tianqiapi.com/api/?version=v1&appid=42921851&appsecret=ubJcta4Y',
      data: {
        'ip': ip
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        _this.setData({
          weatherweek: res.data
        });
        console.log(_this.data.weatherweek)
      }
    });
  },
})