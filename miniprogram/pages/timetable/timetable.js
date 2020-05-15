
wx.cloud.init({
  env: 'engineering-dvsy5'
})
const db = wx.cloud.database({
  env: 'engineering-dvsy5'
})
const test = db.collection('test2')
const test3 = db.collection('test3')
const idmajor = db.collection('id-major')
var app = getApp();
var util = require('../../utils/util.js'); //获取时间
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
    navState: 0 ,//导航状态
    d2: '',
    t0:'',
    t1:'',
    t2:'',
    t3:'',
    t4:'',
    t5:'',
    t6:'',
    m1:'',
    m2:'',
    m3:'',
    m4:'',
    m5:'',
    m6:'',
    dates1:'',
    dates2:'',
    dates3:'',
    dates4:'',
    dates5:'',
    dates6:'',
    swiperheight:0
  },
  bindchange(e) {
    // console.log(e.detail.current)
    let index = e.detail.current;
    this.setData({
      navState: index
    })
    if (index==0)
    {
      var h = this.data.records.length;
      this.setData({
        swiperheight: h * 200 + 100
      })
    }
    if (index == 1) {
      var h = this.data.records1.length;
      this.setData({
        swiperheight: h * 200 + 100
      })
    }
    if (index == 2) {
      var h = this.data.records2.length;
      this.setData({
        swiperheight: h * 200 + 100
      })
    }
    if (index == 3) {
      var h = this.data.records3.length;
      this.setData({
        swiperheight: h * 200 + 100
      })
    }
    if (index == 4) {
      var h = this.data.records4.length;
      this.setData({
        swiperheight: h * 200 + 100
      })
    } 
    if (index == 5) {
      var h = this.data.records5.length;
      this.setData({
        swiperheight: h * 200 + 100
      })
    } 
    if (index == 6) {
      var h = this.data.records6.length;
      this.setData({
        swiperheight: h * 200 + 100
      })
    }

  },
  //点击导航
  navSwitch: function (e) {
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
  deleteEvent1: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var records = this.data.records1;
    db.collection('test2').doc(this.data.records1[index]._id).remove({
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
      records1: records
    });
    wx.setStorageSync('records', this.data.records1);
  },
  deleteEvent2: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var records = this.data.records2;
    db.collection('test2').doc(this.data.records2[index]._id).remove({
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
      records2: records
    });
    wx.setStorageSync('records', this.data.records2);
  },
  deleteEvent3: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var records = this.data.records3;
    db.collection('test2').doc(this.data.records3[index]._id).remove({
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
      records3: records
    });
    wx.setStorageSync('records', this.data.records3);
  },
  deleteEvent4: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var records = this.data.records4;
    db.collection('test2').doc(this.data.records4[index]._id).remove({
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
      records4: records
    });
    wx.setStorageSync('records', this.data.records4);
  },
  deleteEvent5: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var records = this.data.records5;
    db.collection('test2').doc(this.data.records5[index]._id).remove({
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
      records5: records
    });
    wx.setStorageSync('records', this.data.records5);
  },
  deleteEvent6: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var records = this.data.records6;
    db.collection('test2').doc(this.data.records6[index]._id).remove({
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
      records6: records
    });
    wx.setStorageSync('records', this.data.records6);
  },
  onShow: function() {
    var myDate = new Date(); 
    this.setData({
      d2: myDate.getDay()
    })//以上是周几的函数

    //this.onLoad()
    var that = this;
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
      t0:Number(time[8])*10+Number(time[9])
    })
    console.log(that.data.t0)
    that.setData({
      t1:(that.data.t0+1)%31,
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
    if(that.data.t1 < that.data.t0)
    {that.setData({
      m1:"6"})
    }else
    {
      that.setData({
        m1: time[6] })
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
    if(that.data.t1<10){
    that.setData({
      dates1: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m1 + '-'  +'0'+ String(that.data.t1) });
    console.log(that.data.dates1)}
    else{
      that.setData({
        dates1: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m1 + '-'  + String     (that.data.t1)
      }); 
      console.log(that.data.dates1) }
    if (that.data.t2 < 10) {
      that.setData({
        dates2: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m2 + '-' + '0' + String(that.data.t2)
      });
      console.log(that.data.dates2)
    }
    else {
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
    }
    else {
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
    }
    else {
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
    }
    else {
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
    }
    else {
      that.setData({
        dates6: time[0] + time[1] + time[2] + time[3] + '-' + time[5] + that.data.m6 + '-' + String(that.data.t6)
      });
      console.log(that.data.dates6)
    }
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
              records: newrec,},
              () => {
                var h = this.data.records.length;
                this.setData({
                  swiperheight: h * 200 + 100
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
          cdow: (that.data.dayofweek+1)%7
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
          cdow: (that.data.dayofweek + 2)%7
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
          cdow: (that.data.dayofweek + 3)%7
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
          cdow: (that.data.dayofweek + 4)%7
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
          cdow: (that.data.dayofweek + 5)%7
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
          cdow: (that.data.dayofweek + 6)%7
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
        //console.log(111)
        app.globalData.major = res.data
        //console.log(app.globalData.major[0].major)
        db.collection('bixiu').where({
          major: app.globalData.major[0].major
        }). get({
          success: res => {
            console.log(res.data)
            app.globalData.bixiuss = res.data
           
          }
        })

      }
    })
    
  },
  onLoad: function(options) {

  },
})