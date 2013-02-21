Model = require 'models/base/model'

module.exports = class Upload extends Model
  defaults:
    status: 'Awaiting scope...'
    scope_name: 'scope required'