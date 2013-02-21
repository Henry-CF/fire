Model = require 'models/base/model'

module.exports = class Surcharge extends Model
  defaults:
    type: ''
    cost: ''  