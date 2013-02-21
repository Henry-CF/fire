CollectionView = require 'views/_base/collection_view'


module.exports = class TemplatesIndexView extends CollectionView
	className: 'templates-index'
	tagName: 'section'
	template: require 'views/_templates/templates/templates_index'
	itemView: require 'views/templates/templates_card'
