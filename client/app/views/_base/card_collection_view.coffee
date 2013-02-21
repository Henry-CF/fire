Chaplin = require 'chaplin'
View = require 'views/_base/view'
mediator = require 'mediator'

module.exports = class CardCollectionView extends Chaplin.CollectionView
  # This class doesn’t inherit from the application-specific View class,
  # so we need to borrow the method from the View prototype:
  autoRender: no
  getTemplateFunction: View::getTemplateFunction

  fallbackSelector: '.fallback'
  listSelector: '.cards'

  initialize: ->
    super

    @delegateCommonActions()
    @subscribeCommonEvents()

  # delegates events common to the CardCollectionView
  delegateCommonActions: ->
    @delegate 'click', '.add-card', @add

  # pub/sub for parent view to request the state of the collection prior to a sync with server
  subscribeCommonEvents: ->
    @subscribeEvent 'subcollection:serialize', @collect_user_input

  collect_user_input: -> 
    view.model.set view.$el.objectify() for cid,view of @viewsByCid

  add: (e)->
    @collection.add()
    e.preventDefault()