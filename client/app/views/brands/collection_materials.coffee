CollectionView = require 'views/_base/card_collection_view'


module.exports = class CollectionMaterialsView extends CollectionView
  className: 'materials'
  template: require 'views/_templates/brands/collection_materials'
  itemView: require 'views/brands/card_material'
