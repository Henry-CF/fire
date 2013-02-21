Model = require 'models/base/model'

Template_Variations = require 'models/template_variations'

module.exports = class Template extends Model
  urlRoot: '/variationstemplates'
  defaults:
    name: ''
    variations: new Template_Variations()

  initialize: ->
    super

  parse: (res)->
    (if variation.id then delete variation.id) for variation in res.variations
    res.variations = new Template_Variations res.variations
    return res
