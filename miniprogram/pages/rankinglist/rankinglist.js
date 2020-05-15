wx.cloud.init({
  env: 'engineering-dvsy5'
})
const db = wx.cloud.database({
  env: 'engineering-dvsy5'
})
const score = db.collection('score')

Page({
  data: {
    scoredata: []
  },
  onShow: function() {
    var that = this;
    const db = wx.cloud.database({
      env: 'engineering-dvsy5'
    })
    db.collection('score').get({
      success: res => {
        console.log(res.data)
        var mid = '';
        var newrec = res.data;
        for (var i = 1; i < newrec.length; ++i) {
          for (var j = 1; j <= newrec.length - i; ++j) {
            if (newrec[j].score > newrec[j - 1].score) {
              mid = newrec[j];
              newrec[j] = newrec[j - 1];
              newrec[j - 1] = mid;
            }
          }
        }
        that.setData({
          scoredata: newrec
        })
      }
    })
  }
})