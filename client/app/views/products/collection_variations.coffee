CollectionView = require 'views/_base/card_collection_view'
mediator = require 'mediator'

module.exports = class CollectionVariationsView extends CollectionView
  className: 'variations'
  template: require 'views/_templates/products/collection_variations'
  itemView: require 'views/products/card_variation'

  initialize: ->
    super
    if @collection.length isnt 0 then @swap_template_button_visibility()

  add: (e)->
    e.preventDefault()
    if @collection.at(0)
      psuedo_sku = @collection.at(0).get('sku').split('-')
      psuedo_sku[3] = 'xx'
      @collection.add sku: psuedo_sku.join('-')
    else
      @collection.add()
      mediator.publish 'variation:first'
      @swap_template_button_visibility()


  swap_template_button_visibility: ->
    button = @$('a.apply-template')
    if button.hasClass 'hidden' then button.removeClass('hidden') else button.addClass('hidden')
