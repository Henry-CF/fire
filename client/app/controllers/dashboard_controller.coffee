Controller = require 'controllers/base/controller'

Dashboard = require 'views/dashboard/dashboard_home'

module.exports = class DashboardsController extends Controller
	initialize: ->


	home: ->
		@view = new Dashboard()
