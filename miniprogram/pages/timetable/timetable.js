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
    records.splice(index,1);
    this.setData({
      records:records
    });
    wx.setStorageSync('records', this.data.records);
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
    const db = wx.cloud.database({   
      env: 'engineering-dvsy5'
    })  
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