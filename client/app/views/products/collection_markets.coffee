Chaplin = require 'chaplin'

module.exports = class Product_Markets_Collection_View extends Chaplin.CollectionView
  className: 'markets'
  template: require 'views/_templates/products/collection_markets'
  itemView: require 'views/products/card_market'

  initialize: ->
    super
    @collection.load()