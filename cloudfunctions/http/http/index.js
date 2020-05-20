const cloud = require('wx-server-sdk')
const rp = require('request-promise')
cloud.init()

exports.main = async (event, context) => {
  const options = {
    method: 'POST',
    url: event.url,
    form: event._data,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return await rp(options)
    .then(function (res) {
      return res
    })
    .catch(function (err) {
      return {c:'失败',err}
    });
    
}