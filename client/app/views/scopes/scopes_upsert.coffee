template = require 'views/_templates/scopes/scopes_upsert'
ModelView = require 'views/_base/model_view'

Actions_View = require 'views/scopes/collection_actions'

module.exports = class ScopesUpsertView extends ModelView
  template: template
  tagName: 'section'
  className: 'scopes-upsert'

  initialize: ->
    super

  renderSubviews: ->
    @renderActions()

  renderActions: ->
    subview = new Actions_View
      collection: @model.get('actions')
      container: @$('#actions-container')
  
    @subview subview.cid, subview

  
