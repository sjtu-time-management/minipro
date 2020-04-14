wx.cloud.init({
  env: 'engineering-dvsy5'
})
const db = wx.cloud.database({
  env: 'engineering-dvsy5'
})
const test2 = db.collection('test2')
Page({
  data: {
    itag: '',
    idetail:'',
    // iyear:'',
    // imonth:'',
    // idate:'',
    // ish:'',
    // ism:'',
    // ieh:'',
    // iem:''
    dates: '2016-11-08',

    times: '12:00',
  },


  inputTag: function (e) {
    this.setData({ itag: e.detail.value.trim() });
  },

  inputDetail: function (e) {
    this.setData({ idetail: e.detail.value.trim() });
  },
  bindTimeChange: function (e) {

    console.log(e)

    this.setData({

      times: e.detail.value

    })

  },

  //  点击日期组件确定事件  

  bindDateChange: function (e) {

    console.log(e.detail.value)

    this.setData({

      dates: e.detail.value

    })
  },

  // inputYear: function (e) {
    // this.setData({ iyear: e.detail.value.trim() });
  // },

  // inputMonth: function (e) {
    // this.setData({ imonth: e.detail.value.trim() });
  // },
  
  // inputDate: function (e) {
    // this.setData({ idate: e.detail.value.trim() });
  // },
  
  // inputStartHour: function (e) {
    // this.setData({ ish: e.detail.value.trim() });
  // },
  
  // inputStartMin: function (e) {
    // this.setData({ ism: e.detail.value.trim() });
  // },
  
  // inputEndHour: function (e) {
    // this.setData({ ieh: e.detail.value.trim() });
  // },

  // inputEndMin: function (e) {
    // this.setData({ iem: e.detail.value.trim() });
  // },
  commitbutton:function(){
    if (!this.data.itag) {
      wx.showToast({ title: '请完整填写', icon: 'none' });
      return;
    }
    db.collection('test2').add({
     data:{
      itag:this.data.itag,
      idetail: this.data.idetail,
      iyear:this.data.dates,
      itime:this.data.times
      // imonth: this.data.imonth,
      // idate: this.data.idate,
      // ish: this.data.ish,
      // ism: this.data.ism,
      // ieh: this.data.ieh,
      // iem: this.data.iem
      },
      success: function (res) {
        console.log(res)
      },
    })

    
    //wx.navigateBack({ });
    // var now = getCurrentPages(); 
    // var before = now[now.length - 2];
    // before.changeData();
    //  wx.navigateBack({
      // success: () => {    // 执行前一页面的onLoad方法  
        // before.onLoad();     }})
    wx.navigateBack({});
  }
})

