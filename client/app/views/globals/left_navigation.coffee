mediator = require 'mediator'
View = require 'views/_base/view'
template = require 'views/_templates/globals/left_navigation'

module.exports = class LeftNavigationView extends View
  template: template
  tagName: 'ul'
  id: 'navigation'
  container: '#left-pane'
  autoRender: true

  initialize: ->
    super
    # Delete search event
    @delegate 'keyup input#query', @search

  search: (e)->
    unless @_searching is true
      @_searching = true
      setTimeout ()=>
        mediator.trigger '!startupController', 'search', 'query', query: e.target.value
        @_searching = false
      , 700
    
    return false;


