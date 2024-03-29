mediator = require 'mediator'
View = require 'views/_base/view'

module.exports = class PageView extends View
  container: '#page-container'
  autoRender: yes
  renderedSubviews: no
  subviews: []
  subviewsByName: {}


  initialize: ->
    super
    if @model or @collection
      rendered = no
      @modelBind 'change', =>
        @render() unless rendered
        rendered = yes

  renderSubviews: ->
    return

  render: ->
    super
    unless @renderedSubviews
      @renderSubviews()
      @renderedSubviews = yes
