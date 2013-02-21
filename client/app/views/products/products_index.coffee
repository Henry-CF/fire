CollectionView = require 'views/_base/collection_view'


module.exports = class ProductsIndexView extends CollectionView
	className: 'products-index'
	tagName: 'section'
	template: require 'views/_templates/products/products_index'
	itemView: require 'views/products/products_card'
	