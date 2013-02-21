Model = require 'models/base/model'

module.exports = class Action extends Model
  defaults:
    suffix: ''
    height: ''
    width: ''