View = require 'views/_base/view'
mediator = require 'mediator'

module.exports = class DropDownMenuOptionView extends View
  tagName: 'li'
  className: 'option'
  template: require 'views/_templates/menus/dynamo_option'

  initialize: ->
    super
    @delegate 'click', @announce_selection


  announce_selection: (e)->
    data = {}
    data[@model.collection.field]= @model.getAttributes()
    mediator.publish 'update:field', data