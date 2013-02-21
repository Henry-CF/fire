mediator = require 'mediator'
utils = require 'lib/utils'
View = require 'views/_base/view'
template = require 'views/_templates/messages/flash_message'

module.exports = class FlashMessage extends View
  template: template
  className: 'flash-message'
  autoRender: true
  containerMethod: 'before'
  container: null

  initialize: ->
    super
    @container = $(@options.container)
    @$el.addClass @model.get('type')

    if @options.decay 

      # @ hack to maintain wrapper for this instead of having window (default for setTimeout) 
      callback = => @destroy()

      setTimeout callback, @options.decay


    @delegate 'click', '.delete', @destroy

  destroy: (e)-> 
    @$el.fadeOut 300, =>
      @dispose()
    return false