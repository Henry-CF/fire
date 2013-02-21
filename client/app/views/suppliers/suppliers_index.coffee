CollectionView = require 'views/_base/collection_view'


module.exports = class SuppliersIndexView extends CollectionView
	className: 'suppliers-index'
	tagName: 'section'
	template: require 'views/_templates/suppliers/suppliers_index'
	itemView: require 'views/suppliers/suppliers_card'
