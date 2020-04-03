Page({
  data: {
    itag: ''
  },


  inputTag: function (e) {
    this.setData({ itag: e.detail.value.trim() });
    console.log('qwert');
  }
})
