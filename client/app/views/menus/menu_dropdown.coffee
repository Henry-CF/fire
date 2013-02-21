mediator = require 'mediator'
Chaplin = require 'chaplin'
View = require 'views/_base/view'

module.exports = class DropDownMenuView extends Chaplin.CollectionView
  getTemplateFunction: View::getTemplateFunction
  template: require 'views/_templates/menus/menu_dropdown'
  className: 'drop-down-menu'
  autoRender: yes
  containerMethod: 'after'
  container: null

  itemView: require 'views/menus/drop_down_option'
  listSelector: '.cards'
  loadingSelector: '.loading'
  fallbackSelector: '.fallback'
  
  subviews: [] # Hack to prevent null failure
  
  initialize: ->
    super

    @collection.field = if @container.dataset.field then @container.dataset.field else @options.field
    
    if @container.dataset.url then @collection.setUrl(@container.dataset.url)

    else
      @collection.initSyncMachine()
      @collection.beginSync()

    @delegate 'click', '.destroy', @destroy
    
  destroy: (e)->
    mediator.publish 'destroy:drop_down_menu', @cid
    if e then e.preventDefault()

