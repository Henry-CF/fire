Model = require 'models/base/model'

module.exports = class Variation extends Model
  defaults:
    type: ''
    sku: 'XX-XXX-XXX-X'
    mCode: ''
    skuMod: ''
    surcharge: 0
    inQuantity: 0
    exQuantity: 0
