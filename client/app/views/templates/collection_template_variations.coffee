CollectionView = require 'views/_base/card_collection_view'


module.exports = class CollectionTemplateVariationsView extends CollectionView
  className: 'template-variations'
  template: require 'views/_templates/templates/collection_template_variations'
  itemView: require 'views/templates/card_template_variation'