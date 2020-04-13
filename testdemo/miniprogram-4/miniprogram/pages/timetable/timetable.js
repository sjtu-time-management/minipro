wx.cloud.init({
  env: 'engineering-dvsy5'
})
const db = wx.cloud.database({
  env: 'engineering-dvsy5'
})
const test = db.collection('test')
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
  //deleteEvent:function(e){
    //console.log(e);
    //var index = e.currentTarget.dataset.index;
    // var records=this.data.records;
    // records.splice(index,1);
    // this.setData({
      // records:records
    // });  
    // wx.setStorageSync('records', this.data.records);
  // },
  onLoad: function (options) {
    var _this = this;
    //1、引用数据库   
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'engineering-dvsy5'
    })
    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('test').get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          records: res.data
        })
      }
    })
  } ,
  onShow: function (options) {
    //  var app=getApp();

  }  
  
})