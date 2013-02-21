template = require 'views/_templates/brands/brands_updateorcreate'
ModelView = require 'views/_base/model_view'


# Subcollections
Colors = require 'models/colors'
Materials = require 'models/materials'

# Subcollection views
Colors_View = require 'views/brands/collection_colors'
Materials_View = require 'views/brands/collection_materials'



module.exports = class BrandUpdateOrCreateView extends ModelView
	template: template
	tagName: 'section'
	className: 'brands-updateorcreate'

	initialize: ->
		super

	renderSubviews: ->
		@renderColors()
		@renderMaterials()
		

	renderMaterials: (colors_array)->
		subview = new Materials_View
      collection: @model.get('materials')
      container: @$('#materials-container')
    @subview subview.cid, subview

	renderColors: (materials_array)->
		subview = new Colors_View
      collection: @model.get('colors')
      container: @$('#colors-container')
    @subview subview.cid, subview