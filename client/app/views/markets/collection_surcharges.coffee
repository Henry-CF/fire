CollectionView = require 'views/_base/card_collection_view'

module.exports = class Collection_Surcharges_View extends CollectionView
  className: 'surcharges-collection'
  template: require 'views/_templates/markets/collection_surcharges'
  itemView: require 'views/markets/card_surcharge'