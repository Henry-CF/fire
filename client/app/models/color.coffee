Model = require 'models/base/model'

module.exports = class Variation extends Model
	defaults:
		name: ''
		description: ''