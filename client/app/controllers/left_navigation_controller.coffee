Controller = require 'controllers/base/controller'
mediator = require 'mediator'

Left_Navigation = require 'models/left_navigation'
Left_Navigation_View = require 'views/globals/left_navigation'

module.exports = class LeftNavigationController extends Controller
	initialize: ->
    super
    @model = new Left_Navigation()
    @view = new Left_Navigation_View({@model})
