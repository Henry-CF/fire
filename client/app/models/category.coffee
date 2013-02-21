Model = require 'models/base/model'

module.exports = class Category extends Model
	urlRoot: '/categories'
	defaults:
		name: ''
		singular: ''
		onlyPlural: 0

	initialize: ->
		super