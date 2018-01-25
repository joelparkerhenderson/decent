var http = require('http')
var serve = require('ecstatic')
var open = require('opener')

exports.name = 'serve'
exports.version = '1.0.0'

exports.init = function(sbot) {
  http.createServer( 
    serve({ root: __dirname + '/build/'})
  ).listen(3001)

  open('http://localhost:3001')

  sbot.ws.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    if(req.url == '/get-address')
      res.end(sbot.ws.getAddress())
    else next()
  })
}
