Page({
  data: { 
    spinstatus:true
    },
  navg:function(){
    wx.navigateTo({
      url: '/pages/settings/settings',
    })
  },
  onShow:function(){
    var that = this;
    this.setData({
      spinstatus: true
    })
    setTimeout(function () {
      that.setData({
        spinstatus: false
      })

    }, 2000)
  }
})