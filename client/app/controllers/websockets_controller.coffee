Controller = require 'controllers/base/controller'
mediator = require 'mediator'

module.exports = class WebsocketsController extends Controller
  initialize: ->
    @socket = io.connect("http://#{DOMAIN}")
    
    @subscribeEvent 'upload:start', @uploadStart
    @subscribeEvent 'upload:data', @uploadData

    @socket.on 'moar', @ask_for_moar
    @socket.on 'uploaded', @uploaded
    @socket.on 'image:message', @image_message
    @socket.on "image:saved", @image_saved

  addChannel: (namespace)-> return

  image_message: (data)-> mediator.publish 'upload:message', data

  image_saved: (data)-> mediator.publish 'image:saved', data

  ask_for_moar: (data)-> mediator.publish 'upload:moar', data

  uploaded: (data)-> mediator.publish 'upload:finished', data

  uploadStart: (data)-> @socket.emit 'upload:initialize', data
  
  uploadData: (data)-> @socket.emit 'upload:continue', data