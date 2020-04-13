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
  onShow: function (options) {
    var app=getApp();
    this.setData({
      loading: this.data.loading = false,
      disabled: this.data.disabled = false,
      records:wx.getStorageSync('records')
    })
  }
})