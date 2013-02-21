template = require 'views/_templates/categories/categories_updateorcreate'
ModelView = require 'views/_base/model_view'


module.exports = class CategoriesUpdateOrCreateView extends ModelView
  template: template
  tagName: 'section'
  className: 'categories-updateorcreate'

  initialize: ->
    super