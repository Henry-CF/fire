mediator = require 'mediator'
Chaplin = require 'chaplin'
View = require 'views/_base/view'


module.exports = class DynamoMenuView extends Chaplin.CollectionView
  getTemplateFunction: View::getTemplateFunction
  template: require 'views/_templates/menus/menu_dynamo'
  tagName: 'section'
  className: 'dynamo-menu'
  containerMethod: 'before'
  container: '.content'

  itemView: require 'views/menus/dynamo_option'
  listSelector: '.cards'
  fallbackSelector: '.fallback'
  
  subviews: [] # Hack to prevent null failure
  initialize: ->
    super
    $('.overlay').removeClass 'hidden'
    @$('input.search-bar').focus()
    # sets the collection url for when we use the query method later
    @collection.query_location = "/_q/#{@options.urlChunk}?"

    # Set the field so a model can access it when it is selected
    @collection.field = @options.field

    @delegate 'keyup', '.search-bar', @query
    @delegate 'click', '.destroy', @destroy
    
  query: (e)-> @collection.query e.target.value

  destroy: (e)->
    mediator.publish 'destroy:dynamo_menu', @cid
    e.preventDefault()




