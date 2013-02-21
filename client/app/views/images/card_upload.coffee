View = require 'views/_base/collection_item_view'

module.exports = class UploadCardView extends View
  tagName: 'li'
  template: require 'views/_templates/images/card_upload'
  decay: 1000
  
  initialize: ->
    super
    @$el.attr 'data-id', @model.cid
    @$el.attr 'data-name', @model.get('name')
    @pass 'status', '.status-bar'
    @pass 'scope_name', '.scope'
    @model.set 'id', @model.cid 