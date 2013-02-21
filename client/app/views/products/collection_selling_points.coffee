CollectionView = require 'views/_base/card_collection_view'


module.exports = class CollectionSellingPointsView extends CollectionView
  className: 'selling-points'
  template: require 'views/_templates/products/collection_selling_points'
  itemView: require 'views/products/card_selling_point'
