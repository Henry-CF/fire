Collection = require 'models/base/collection'
Template = require 'models/template'

module.exports = class Templates extends Collection
	url: '/variationstemplates'
	model: Template