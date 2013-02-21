CollectionView = require 'views/_base/collection_view'

UploaderView = require 'views/images/images_uploader'
UploaderCollection = require 'models/uploader'

module.exports = class ImagesGalleryView extends CollectionView
  className: 'image-gallery'
  tagName: 'section'
  template: require  'views/_templates/images/images_gallery'
  itemView: require 'views/images/images_card'
  subviews: []

  initialize: ->
    super
    @delegate 'change', '#fileupload', @initUploader

  
    @subscribeEvent 'image:saved', @addImage
    @subscribeEvent 'uploader:destroy', @destroyUploader

    window.gallery = @

  addImage: (image)-> @collection.push image

  initUploader: (e)->
    if e.target.files.length is 0 then return

    else
      @$('span.fileinput-button').addClass('hidden')
      window.queue = e.target.files
      @subview 'uploader', new UploaderView collection: new UploaderCollection()
      @subviewsByName.uploader.collection.push file for file in e.target.files 

  destroyUploader: -> 
    @$('span.fileinput-button').removeClass('hidden')
    @$('#fileupload').val('')
    @removeSubview 'uploader'
