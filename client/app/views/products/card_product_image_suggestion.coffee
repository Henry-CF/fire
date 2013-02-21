Chaplin = require 'chaplin'
require 'lib/view_helper' # Just load the view helpers, no return value
mediator = require 'mediator'

module.exports = class Product_Image_Suggestion extends Chaplin.View
  # Precompiled templates function initializer.
  template: require 'views/_templates/products/card_product_image'

  tagName: 'li'
  className: 'image'

  getTemplateFunction: ->
    @template

  initialize: ->
    super
    @delegate 'click', @broadcast_image

  broadcast_image: (e)->
    mediator.publish 'image:add', @model
    collection = @model.collection
    collection.remove(@model.id)
    if collection.length is 0 then mediator.publish 'empty:collection'
