Chaplin = require 'chaplin'
require 'lib/view_helper' # Just load the view helpers, no return value
mediator = require 'mediator'

module.exports = class Product_Image extends Chaplin.View
  # Precompiled templates function initializer.
  template: require 'views/_templates/products/card_product_image'

  tagName: 'li'
  className: 'image-container'

  getTemplateFunction: ->
    @template

  initialize: ->
    super
    @delegate 'click', '.image',  @remove_image

  remove_image: (e)-> 
    mediator.publish "image:remove", @model.id