Page({
  data: {
    eventList: [{
        eventTag: "事件A",
        eventDetail: "备注A",
        eventDate: {
          year: 2020,
          month: "04",
          date: "03",
        },
        startTime: {
          startHour: "08",
          startMin: "10",
        },
        endTime: {
          endHour: "09",
          endMin: "20",
        }
      },
      {
        eventTag: "事件B",
        eventDetail: "长备注测试sjkdhfjdhsfakljhdfaklsadfaadsfasd",
        eventDate: {
          year: 2019,
          month: "04",
          date: "02",
        },
        startTime: {
          startHour:" 16",
          startMin: "10",
        },
        endTime: {
          endHour: "20",
          endMin: "46",
        }
      },
      {
        eventTag: "事件C",
        eventDetail: "备注C",
        eventDate: {
          year: 2020,
          month: "04",
          date: "03",
        },
        startTime: {
          startHour:" 21",
          startMin: "22",
        },
        endTime: {
          endHour: "22",
          endMin: "34",
        }
      }
    ],

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
  onShow: function (options) {
    this.setData({
      loading: this.data.loading = false,
      disabled: this.data.disabled = false,
    })
  }
})