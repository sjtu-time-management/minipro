wx.cloud.init({
  env: 'engineering-dvsy5'
})
const db = wx.cloud.database({
  env: 'engineering-dvsy5'
})
const test = db.collection('test2')
Page({
  data: {
    records:[],

    loading:false,
    disabled:false
  },
  
  addnew: function (e) {
    this.setData({
      loading: this.data.loading=true,
      disabled: this.data.disabled=true
    })
    wx.navigateTo({
      url: '/pages/newevent/newevent',
    })
  },
  deleteEvent:function(e){
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var records=this.data.records;
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
    records.splice(index,1);
    this.setData({
      records:records
    });
  },
  onShow: function () {

    this.onLoad() 

  },
  onLoad: function (options) {
    var app=getApp();
    this.setData({
      loading: this.data.loading = false,
      disabled: this.data.disabled = false
    });
    var _this = this;  
    db.collection('test2').get({   
      success: res => {
        console.log(res.data)
        this.setData({
          records: res.data
        })
      }
    })
  }
})