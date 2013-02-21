Model = require 'models/base/model'

Actions = require 'models/actions'

module.exports = class Supplier extends Model
  urlRoot: '/scopes'
  defaults:
    name: ''
    actions: new Actions()

  parse: (res)->
    (if action.id then delete action.id) for action in res.actions
    res.actions = new Actions res.actions
    return res