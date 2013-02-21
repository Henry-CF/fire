View = require 'views/_base/view'
mediator = require 'mediator'

module.exports = class DynamoMenuOptionView extends View
  tagName: 'li'
  template: require 'views/_templates/menus/dynamo_option'

  initialize: ->
    super
    @delegate 'click', 'span', @announce_selection


  announce_selection: (e)->
    data = {}
    data[@model.collection.field]= @model.getAttributes()
    mediator.publish 'update:field', data