var fs = require('fs')
var path = require('path')
var ssbKeys = require('ssb-keys')
var stringify = require('pull-stringify')
var yargs = require('yargs').argv
var open = require('opener')

var config = require('./config/inject')(yargs.appname || 'decent')

config.keys = ssbKeys.loadOrCreateSync(path.join(config.path, 'secret'))

var manifestFile = path.join(config.path, 'manifest.json')

var decentClient = fs.readFileSync(path.join('./build/index.html'))

var createSbot = require('scuttlebot')
  .use(require('scuttlebot/plugins/master'))
  .use(require('scuttlebot/plugins/gossip'))
  .use(require('scuttlebot/plugins/replicate'))
  .use(require('ssb-friends'))
  .use(require('ssb-blobs'))
  .use(require('ssb-query'))
  .use(require('ssb-links'))
  .use(require('ssb-ebt'))
  .use(require('scuttlebot/plugins/invite'))
  .use(require('scuttlebot/plugins/local'))
  .use(require('./plugins/ws'))
  .use({
    name: 'serve',
    version: '1.0.0',
    init: function (sbot) {
      sbot.ws.use(function (req, res, next) {
        var send = {} 
        send = config
        delete send.keys
        send.address = sbot.ws.getAddress()
        if(req.url == '/')
          res.end(decentClient)
        if(req.url == '/get-config')
          res.end(JSON.stringify(send))
        else next()
      })
    }
  })

open('http://localhost:' + config.ws.port)

var server = createSbot(config)

fs.writeFileSync(manifestFile, JSON.stringify(server.getManifest(), null, 2))




