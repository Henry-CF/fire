Chaplin = require 'chaplin'

module.exports = class Product_Market_Surcharges_View extends Chaplin.CollectionView
  tagName: 'li'
  autoRender: yes
  className: 'surcharges-collection'
  template: require 'views/_templates/products/collection_surcharges'
  itemView: require 'views/products/card_surcharge'
  containerMethod: 'prepend'
