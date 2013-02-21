CollectionView = require 'views/_base/collection_view'

module.exports = class BrandsIndexView extends CollectionView
	className: 'brands-index'
	tagName: 'section'
	template: require 'views/_templates/brands/brands_index'
	itemView: require 'views/brands/brands_card'