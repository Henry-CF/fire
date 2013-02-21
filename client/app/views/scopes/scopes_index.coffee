CollectionView = require 'views/_base/collection_view'


module.exports = class ScopesIndexView extends CollectionView
  className: 'scopes-index'
  tagName: 'section'
  template:  require 'views/_templates/scopes/scopes_index'
  itemView: require 'views/scopes/scopes_card'
  