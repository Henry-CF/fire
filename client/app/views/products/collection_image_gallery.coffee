Chaplin = require 'chaplin'
View = require 'views/_base/view'
mediator = require 'mediator'

Image_Suggestions_View = require 'views/products/collection_image_suggestions'
Image_Suggestions = require 'models/product_images'

module.exports = class Product_Images_View extends Chaplin.CollectionView
  # This class doesn’t inherit from the application-specific View class,
  # so we need to borrow the method from the View prototype:
  autoRender: no
  getTemplateFunction: View::getTemplateFunction

  fallbackSelector: '.fallback'
  listSelector: '.current-images'

  className: 'gallery'
    
  template: require 'views/_templates/products/collection_image_gallery'
  itemView: require 'views/products/card_product_image'

  initialize: ->
    super
    @subscribeEvent 'image:add', @add_image
    @subscribeEvent 'image:remove', @remove_image
    @init_image_suggestions()

  init_image_suggestions: ->
    @subview 'suggestions_menu', new Image_Suggestions_View
      collection: new Image_Suggestions()
      container: @$('.image-suggestions-container')
      parent: @options.parent  


  add_image: (image)-> @collection.add image

  remove_image: (id)-> @collection.remove id


