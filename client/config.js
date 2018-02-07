var http = require('http')
var URL = require('url')

module.exports = function () {

  var host = window.location.origin

  http.get(host + '/get-config', function (res) {
    res.on('data', function (data, remote) {
      config = data
      localStorage[host] = config
    })
  })

  var config = JSON.parse(localStorage[host])
  var remote = config.address
  var blobsUrl = host + '/blobs/get'

  return {
    remote: remote,
    blobsUrl: blobsUrl
  }
}


