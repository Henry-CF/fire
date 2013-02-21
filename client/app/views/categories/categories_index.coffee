CollectionView = require 'views/_base/collection_view'

module.exports = class CategoriesIndexView extends CollectionView
	className: 'categories-index'
	tagName: 'section'
	template: require 'views/_templates/categories/categories_index'
	itemView: require 'views/categories/categories_card'