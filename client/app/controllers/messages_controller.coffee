Controller = require 'controllers/base/controller'
mediator = require 'mediator'

Flash_Message = require 'models/flash_message'
Flash_Message_View = require 'views/messages/flash_message'

module.exports = class Messages_Controller extends Controller
  initialize: ->
    super
    # Handle messages

    @subscribeEvent 'message:flash', @flash_message

  flash_message: (message)->
    new Flash_Message_View(model: new Flash_Message({type: type, text: msg}), container: '#page-container', decay: 2500) for type, msg of message
