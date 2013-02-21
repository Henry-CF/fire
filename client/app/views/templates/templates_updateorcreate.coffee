template = require 'views/_templates/templates/templates_updateorcreate'
ModelView = require 'views/_base/model_view'


Template_Variations_Collection = require 'views/templates/collection_template_variations'


module.exports = class TemplatesUpdateOrCreateView extends ModelView
	template: template
	tagName: 'section'
	className: 'templates-updateorcreate'

	initialize: ->
		super

	renderSubviews: ->
		@renderTemplateVariations()

	renderTemplateVariations: ->
		 subview = new Template_Variations_Collection
      collection: @model.get('variations')
      container: @$('#variations-container')
  
    @subview subview.cid, subview


	
