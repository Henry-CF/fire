Chaplin = require 'chaplin'
View = require 'views/_base/view'

module.exports = class Index_View extends Chaplin.CollectionView
  # This class doesn’t inherit from the application-specific View class,
  # so we need to borrow the method from the View prototype:
  container: '#page-container'
  autoRender: yes
  getTemplateFunction: View::getTemplateFunction

  loadingSelector: '.loading'
  listSelector: '#cards-container'
  fallbackSelector: '.fallback'

  initialize: ->
    super
    @delegateCommonEvents()

  delegateCommonEvents: ->
    @delegate 'click', '.delete', @delete

  delete: (e)->
    e.preventDefault()
    e = $(e)[0]

    model = @collection.get(e.currentTarget.dataset.id)

    instance = if model.attributes.name then model.get('name') else if model.attributes.title then model.get('title') else if model.attributes.stem then model.get('stem') else 'this'

    if confirm "Are you sure you want to permanently delete #{ instance }?"
      try
        model.destroy()
      catch err
        console.log err.message
    

  subscribeToChannels: ->
  	# handles index specific channels
  