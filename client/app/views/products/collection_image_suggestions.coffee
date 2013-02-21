Chaplin = require 'chaplin'
View = require 'views/_base/view'
mediator = require 'mediator'


module.exports = class Product_Images_Suggestions_View extends Chaplin.CollectionView
  # This class doesn’t inherit from the application-specific View class,
  # so we need to borrow the method from the View prototype:
  autoRender: no
  getTemplateFunction: View::getTemplateFunction

  fallbackSelector: '.fallback'
  listSelector: '.suggested-images'
  loadingSelector: '.loading'

  className: 'suggestions-menu'
    
  template: require 'views/_templates/products/collection_image_suggestions'
  itemView: require 'views/products/card_product_image_suggestion'

  initialize: ->
    super
    @electDelegates()

    @gallery = @$('.gallery')

    @subscribeEvent 'empty:collection', @close_gallery

  electDelegates: ->
    @delegate 'click', '.automate-product-images', @init_suggestions
    @delegate 'click', '.upload-product-images', @init_uploader
    @delegate 'click', '.search-product-images', @init_search_menu
    @delegate 'click', '.close-gallery', @close_gallery
    @delegate 'keyup', '.search-param', @image_search


  init_search_menu: (e)->
    e.preventDefault()
    @change_gallery_visibility()
    @$('.search-bar').removeClass('hidden')

  init_uploader: (e)->
    e.preventDefault()
    console.log 'uploader triggered'

  init_suggestions: (e)->
    e.preventDefault()
    
    color = @options.parent.get('_color')
    title = $('#title').val()
    

    if color.shortCode
      if title
      
        @change_gallery_visibility()
        @collection.setUrl('/images/tags/blu.toorak')

      else
        mediator.publish 'message:flash', error: 'must have a title to generate suggestions'
    else
      if title then mediator.publish 'message:flash', error: 'must have a color shortcode to generate suggestions'
      else mediator.publish 'message:flash', error: 'must have a title and shortcode generate suggestions'
      

  image_search: (e)->
    unless @_searching is true
      @_searching = true
      setTimeout ()=>
        @collection.setUrl("/_q/image?#{e.target.value}")
        @_searching = false
      , 1000

   

  close_gallery: ->
    @change_gallery_visibility()
    @collection.reset()

  change_gallery_visibility: -> 
    if @gallery.hasClass('hidden')
      $('.overlay').removeClass('hidden') 
      @gallery.removeClass('hidden')
      @$('.search-bar').val('') 
    else
      $('.overlay').addClass('hidden')
      @$('.search-bar').addClass('hidden')
      @gallery.addClass('hidden')