CollectionView = require 'views/_base/card_collection_view'

module.exports = class CollectionActionsView extends CollectionView
  className: 'actions-collection'
  template: require 'views/_templates/scopes/collection_actions'
  itemView: require 'views/scopes/card_action'
