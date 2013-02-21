Model = require 'models/base/model'

Colors = require 'models/colors'
Materials = require 'models/materials'

module.exports = class Brand extends Model
  urlRoot: '/brands'
  defaults:
    name: ''
    description: ''
    colors: new Colors()
    materials: new Materials()

  initialize: ->
    super
    
  parse: (res)->
    (if color.id then delete color.id) for color in res.colors
    (if material.id then delete material.id) for material in res.materials
    res.colors = new Colors res.colors
    res.materials = new Materials res.materials
    return res

  dispose:->
    super
    console.log @
