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

  if (config.ws.remote) {
    var remote = config.ws.remote
  } else {
    var remote = config.address
  }

  console.log(remote)

  var blobsUrl = host + '/blobs/get'

  return {
    config: config,
    remote: remote,
    blobsUrl: blobsUrl
  }
}


