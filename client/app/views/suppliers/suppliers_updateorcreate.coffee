template = require 'views/_templates/suppliers/suppliers_updateorcreate'
ModelView = require 'views/_base/model_view'

Surcharges_View = require 'views/markets/collection_surcharges'

module.exports = class Suppliers_Upsert_View extends ModelView
  template: template
  tagName: 'section'
  className: 'suppliers-updateorcreate'

  initialize: ->
    super    

  renderSubviews: ->
    @renderSurcharges()

  renderSurcharges: ->
    subview = new Surcharges_View
      collection: @model.get('surcharges')
      container: @$('#surcharges-container')
  
    @subview 'surcharges_collection', subview

  
