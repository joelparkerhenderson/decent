var h = require('hyperscript')
var u = require('../util')
var pull = require('pull-stream')
var Scroller = require('pull-scroll')

var config = require('./../../config/inject.js')(process.env.ssb_appname)

exports.gives = {
  screen_view: true
}

exports.create = function (api) {
  return {
    screen_view: function (path, sbot) {
      if(path === 'Key') {
        if(process.title === 'browser') {
          console.log(config.path)
          var appName = h('input.import', {placeholder: localStorage.appname, name:'textarea', style: 'width: 50%'})
          var importKey = h('textarea.import', {placeholder: 'Import your Decent public/private key', name: 'textarea', style: 'width: 97%; height: 100px;'})
          var importRemote = h('textarea.import', {placeholder: 'Import a new Decent websocket remote', name: 'textarea', style: 'width: 97%;'})
          var content = h('div.column.scroller__content')
          var div = h('div.column.scroller',
            {style: {'overflow':'auto'}},
            h('div.scroller__wrapper',
              h('div.column.scroller__content',
                h('div.message',
                  h('h1', 'Your Key'),
                  h('p', {innerHTML: 'Your Decent public/private key is: <pre><code>' + localStorage[config.path + '/secret'] + '</code></pre>'},
                    h('button.btn.btn-danger', {onclick: function (e){
                      localStorage[config.path +'/secret'] = ''
                      alert('Your public/private key has been deleted')
                      e.preventDefault()
                      location.hash = ""
                      location.reload()
                    }}, 'Delete Key')
                  ),
                  h('hr'),
                  h('p', {innerHTML: 'Your Decent websocket remote is: <pre>' + localStorage[config.path + '/remote'] + '</pre>'},
                    h('button.btn.btn-danger', {onclick: function (e){
                      localStorage[config.path + '/remote'] = ''
                      alert('Your remote pub has been deleted')
                      e.preventDefault()
                      location.hash = ""
                      location.reload()
                    }}, 'Delete Pub')
                  ),
                  h('hr'),
                  h('form',
                    importKey,
                    h('button.btn.btn-success', {onclick: function (e){
                      if(importKey.value) {
                        localStorage[config.path + '/secret'] = importKey.value.replace(/\s+/g, ' ')
                        e.preventDefault()
                        alert('Your public/private key has been updated')
                      }
                      location.hash = ""
                      location.reload()
                    }}, 'Import key'),
                    h('hr'),
                    importRemote,
                    h('button.btn.btn-success', {onclick: function (e){
                      if(importRemote.value) {
                        localStorage[config.path + '/remote'] = importRemote.value
                        e.preventDefault()
                        alert('Your websocket remote has been updated')
                      }
                      location.hash = ""
                      location.reload()
                    }}, 'Import remote'),
                    h('hr'),
                    appName,
                    h('button.btn.btn-success', {onclick: function (e){
                      if(appName.value) {
                        localStorage.appname = appName.value
                        e.preventDefault()
                        alert('Your appname is set to '+ localStorage.appname)
                      }
                      location.hash = ""
                      location.reload()
                    }}, 'Change appname'),
                  )
                )
              )
            )
          )
          return div
        } else { 
          return h('p', 'Your key is saved at .decent/secret')
        }
      }
    }
  }
}

