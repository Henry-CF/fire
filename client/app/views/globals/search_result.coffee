View = require 'views/_base/view'
mediator = require 'mediator'

module.exports = class SearchResultView extends View
  tagName: 'li'
  className: 'result'
  template: require 'views/_templates/globals/search_result'

  initialize: ->
    super
    