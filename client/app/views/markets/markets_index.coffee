CollectionView = require 'views/_base/collection_view'


module.exports = class MarketsIndexView extends CollectionView
  className: 'markets-index'
  tagName: 'section'
  template:  require 'views/_templates/markets/markets_index'
  itemView: require 'views/markets/markets_card'


  