wx.cloud.init({
  env: 'engineering-dvsy5'
})
const db = wx.cloud.database({
  env: 'engineering-dvsy5'
})
const test = db.collection('test')
Page({
  data: {
    itag: '',
    idetail:'',
    iyear:'',
    imonth:'',
    idate:'',
    ish:'',
    ism:'',
    ieh:'',
    iem:'',
    // records: []
  },


  inputTag: function (e) {
    this.setData({ itag: e.detail.value.trim() });
  },

  inputDetail: function (e) {
    this.setData({ idetail: e.detail.value.trim() });
  },
  
  inputYear: function (e) {
    this.setData({ iyear: e.detail.value.trim() });
  },

  inputMonth: function (e) {
    this.setData({ imonth: e.detail.value.trim() });
  },
  
  inputDate: function (e) {
    this.setData({ idate: e.detail.value.trim() });
  },
  
  inputStartHour: function (e) {
    this.setData({ ish: e.detail.value.trim() });
  },
  
  inputStartMin: function (e) {
    this.setData({ ism: e.detail.value.trim() });
  },
  
  inputEndHour: function (e) {
    this.setData({ ieh: e.detail.value.trim() });
  },

  inputEndMin: function (e) {
    this.setData({ iem: e.detail.value.trim() });
  },
  commitbutton:function(){
    if (!this.data.itag) {
      wx.showToast({ title: '请完整填写', icon: 'none' });
      return;
    }
    db.collection('test').add({
      data:{
      tag:this.data.itag,
      detail:this.data.idetail,
      year:this.data.iyear,
      month:this.data.imonth,
      date:this.data.idate,
      sh:this.data.ish,
      sm:this.data.ism,
      eh:this.data.ieh,
      em:this.data.iem

      }, 
      success:function(res){
        console.log(res)
      },
    }),
    db.collection('test').get({
      success: function (res) {
        // this.setData({
          // records: res.data
        // });
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data);
    
      },      
    }),
    //console.log(res.data.length),
    // var records=wx.getStorageSync('records')||[];
    // var record={
      // itag:this.data.itag,
      // idetail: this.data.idetail,
      // iyear:this.data.iyear,
      // imonth: this.data.imonth,
      // idate: this.data.idate,
      // ish: this.data.ish,
      // ism: this.data.ism,
      // ieh: this.data.ieh,
      // iem: this.data.iem
    // };
    // records.push(record);
    //排序程序段
   //var mid='';
    // for(var i=1;i<records.length;++i){
      // for (var j=1;j<=records.length-i;++j){
        // if(records[j].iyear<records[j-1].iyear){
          // mid = records[j];
          // records[j] = records[j - 1];
          // records[j - 1]=mid;
        // }
        // if (records[j].iyear == records[j - 1].iyear){
          // if (records[j].imonth < records[j - 1].imonth){
            // mid = records[j];
            // records[j] = records[j - 1];
            // records[j - 1] = mid;
          // }
          // if (records[j].imonth == records[j - 1].imonth){
            // if (records[j].idate < records[j - 1].idate){
              // mid = records[j];
              // records[j] = records[j - 1];
              // records[j - 1] = mid;
            // }
            // if (records[j].idate == records[j - 1].idate){
              // if (records[j].ish < records[j - 1].ish){
                // mid = records[j];
                // records[j] = records[j - 1];
                // records[j - 1] = mid;
              // }
              // if (records[j].ish == records[j - 1].ish){
                // if (records[j].ism < records[j - 1].ism){
                  // mid = records[j];
                  // records[j] = records[j - 1];
                  // records[j - 1] = mid;
           //     }
             // }
            //}
          // }
        // }
      // }
    // }
    // wx.setStorageSync('records', records);

    // wx.navigateBack({ });
       wx.navigateTo({

         url: '../homepage/homepage'

       })
  }
})

