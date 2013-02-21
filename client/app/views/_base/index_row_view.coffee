Chaplin = require 'chaplin'
require 'lib/view_helper' # Just load the view helpers, no return value

module.exports = class Index_Row_View extends Chaplin.View
  # Precompiled templates function initializer.
  className: 'index-row'
  getTemplateFunction: ->
    @template
