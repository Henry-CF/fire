CollectionView = require 'views/_base/card_collection_view'


module.exports = class CollectionColorsView extends CollectionView
  className: 'colors'
  template: require 'views/_templates/brands/collection_colors'
  itemView: require 'views/brands/card_color'
