var http = require('http')
var serve = require('ecstatic')
var open = require('opener')
var ws = require('./plugins/ws')

var PORT = 3001

exports.init = function() {
  http.createServer(
    serve({ root: __dirname + '/build/'})
  ).listen(PORT)
  open('http://localhost:' + PORT)
}
