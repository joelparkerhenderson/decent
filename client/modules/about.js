var h = require('hyperscript')

exports.needs = {
  avatar_name: 'first',
  avatar_link: 'first',
  blob_url: 'first',
  markdown: 'first'
}

exports.gives = { 
  message_content: true,
  message_content_mini: true
}

exports.create = function (api) {
  var exports = {}
 
  exports.message_content = /* = function (msg) {
    if(msg.value.content.type == 'about') {
      var about = msg.value.content
      if (msg.value.content.description) {
        return h('span', api.markdown('**Description:** ' + about.description))
      }
    }
  }*/


  exports.message_content_mini = function (msg) {
    var about = msg.value.content
    var id = msg.value.content.about
    if (msg.value.content.type == 'description') {
      return h('span', api.markdown('**Description:** ' + about.description))
    }
    if (msg.value.content.type == 'loc') {
      return h('span', h('strong', 'Location: '), about.loc)
    } 
    if (msg.value.content.type == 'about') {
      if (msg.value.content.name) {
        return h('span', ' identifies as ', about.name)
      }
      if (msg.value.content.image) {
        return h('span', ' identifies as ', h('img.avatar--thumbnail', {src: api.blob_url(about.image)}))
      }
    } else { return }
  }
  return exports
}
