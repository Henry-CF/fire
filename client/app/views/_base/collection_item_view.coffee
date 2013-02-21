Chaplin = require 'chaplin'
require 'lib/view_helper' # Just load the view helpers, no return value

module.exports = class CollectionItemView extends Chaplin.View
  # Precompiled templates function initializer.
  
  tagName: 'form'
  className: 'card'

  getTemplateFunction: ->
    @template

  initialize: ->
    super
    @subscribeCommonEvents()

  subscribeCommonEvents: ->
    @delegate 'click',  '.delete-card', @delete

  delete: ->
    if @model.collection
      @model.collection.remove @model
    else
      console.debug "model did not reference a parent collection"
      console.log @model
    return false;


