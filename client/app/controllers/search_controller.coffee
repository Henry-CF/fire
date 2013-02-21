Controller = require 'controllers/base/controller'

Collection = require 'models/search_results'
Search_Results_View = require 'views/globals/search_results'

module.exports = class SearchController extends Controller
	initialize: ->
		@subscribeEvent 'performSearch', @query

	historyURL: (params)->
		if params.query then "#_q?#{params.query}" else ''

	query: (params)->
		if params.query && params.query.length >= 1
			@view = new Search_Results_View
				collection: new Collection
				query: params.query


