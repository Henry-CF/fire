Model = require 'models/base/model'

module.exports = class Image extends Model
  urlRoot: '/images'
  

  initialize: ->
    super
