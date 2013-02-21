Chaplin = require 'chaplin'
View = require 'views/_base/view'
mediator = require 'mediator'
_ = require 'underscore'
Scopes = require 'models/scopes'

Drop_Down_Menu = require 'views/menus/menu_dropdown'
Drop_Down_Menu_Options = require 'models/drop_down_menu'

module.exports = class ImageUploader extends Chaplin.CollectionView
  getTemplateFunction: View::getTemplateFunction

  loadingSelector: '.loading'
  listSelector: '#cards-container'
  fallbackSelector: '.fallback'

  className: 'gallery-uploader'
  container: '.image-gallery'
  containerMethod: 'prepend'
  template: require 'views/_templates/images/images_uploader'

  itemView: require 'views/images/card_upload'  

  initialize: ->
    super

    # For dropdown menu
    @scopes = new Scopes()
    
    @delegate 'click', '.set-scope', @initMenu
    @delegate 'click', '.upload', @initUploads
    @delegate 'click', '.close-uploader', @destroyUploader

    @subscribeEvent 'destroySubview', @destroyMenu
    @subscribeEvent 'update:field', @updateScopes

    # Listen to server requesting more data
    @subscribeEvent 'upload:moar', @moar_data

    # Updates client when file has been fully streamed & is then passed on to s3admix
    @subscribeEvent 'upload:finished', @finish_upload

    # Subscribes to events from s3admix background process
    @subscribeEvent 'upload:message', @updateCard

    @subscribeEvent 'image:saved', @cleanUp

    #window.uploader = @
  initMenu: (e)->
    @destroyMenu()
    @subview 'drop_down_menu', new Drop_Down_Menu 
      collection: new Drop_Down_Menu_Options()
      field: '_scope'
      container: e.target
    e.preventDefault()

  updateScopes: (data)-> 
    @destroyMenu()
    @collection.setScope(data._scope)
    @collection.updateStatus status: 'Awaiting upload...'

   
  initUploads: (e)->
    for Item in @collection.models
      unless Item.get('_upload') or not Item.get('_scope')
       
       @spawnUploadInstance Item.getAttributes()
    e.preventDefault()

  spawnUploadInstance: (item)->
    (uploadable_file = file if file.name is item.name ) for file in window.queue

    mediator.publish 'upload:start', item

    @$("form.card[data-name=#{item.name}]").children('.status-bar').text('uploading...')

    window.current_uploads[uploadable_file.name] = new FileReader()

    window.current_uploads[uploadable_file.name].onload = (e)->
      mediator.publish 'upload:data',
        name: uploadable_file.name
        data: e.target.result

  moar_data: (data)->
    (file = stream if stream.name is data.name) for stream in window.queue
    place = data.place * 524288
    new_file = file.slice(place, place + Math.min(524288, (file.size - place)))
    window.current_uploads[data.name].readAsBinaryString new_file
    
  finish_upload: (data)-> @collection.updateStatus name: data.name, status: 'resizing...'

  updateCard: (data)-> @collection.updateStatus name: data.name, status: data.message

  cleanUp: (image)->
    @collection.removeByFileName("#{image.stem}.#{image.ext}")
    if @collection.length is 0 then mediator.publish 'uploader:destroy'

  destroyMenu: (cid)-> @removeSubview 'drop_down_menu'

  destroyUploader: (e)->
    window.queue = null 
    mediator.publish 'uploader:destroy', e # if @collection.modelsUploading().length is 0
    e.preventDefault()