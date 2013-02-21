View = require 'views/_base/collection_item_view'

module.exports = class Variation_Card_View extends View
  template: require 'views/_templates/products/card_variation'
  
  initialize: ->
    super
    @delegate "blur", 'input.sku-mod', @update_sku
    @delegate 'click', '.add-internal-item', @add_item
    @delegate 'click', '.subtract-internal-item', @subtract_item

    @subscribeEvent 'update:sku', @update_sku_bit

    @pass 'sku', 'input.sku'
    if @model.get('skuMod') isnt '' then @update_sku_bit value: @model.get('skuMod'), position: 3

  update_sku: (e)->
    sku_bits = @model.get('sku').split('-')
    sku_bits[3] = e.target.value
    @model.set 'sku', sku_bits.join('-').toUpperCase()

  update_sku_bit: (options)->
    sku_bits = @model.get('sku').split('-')
    sku_bits[options.position] = options.value 
    @model.set 'sku', sku_bits.join('-').toUpperCase()

  add_item: (e)->
    e.preventDefault()
    console.log @model.id

  subtract_item: (e)->
    e.preventDefault()
    console.log @model.id