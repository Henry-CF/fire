bcrypt = require 'bcrypt'

module.exports = (compound) ->

  mongoose = compound.mongoose

  Fingerprint = new mongoose.Schema
    pattern: String
    ip: String

  Session = new mongoose.Schema
    ip: String

  Schema = new mongoose.Schema
    first_name: String
    last_name: String
    email: 
      type: String
      unique: true
    superuser: 
      type: Boolean
      default: false
    password: String 
    fingerprints: [ Fingerprint ]
    sessions: [ Session ]

  Schema.methods.bcrypt = (cb)->
    bcrypt.hash @password, 10, (err, hash)=>
      if err then cb(err)
      else 
        @password = hash
        cb(null, @)

  Schema.methods.authenticate = (password, cb)->
    bcrypt.compare password, @password, (err, result)=>
      if err then cb(err) else cb(null, result)

  Schema.static 'findByEmail', (email, cb)->
    return @findOne(email: email, cb)
  
  compound.models.User = compound.mongoose.model 'User', Schema