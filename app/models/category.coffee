natural = require 'natural'

module.exports = (compound)->

  mongoose = compound.mongoose

  Schema = new compound.mongoose.Schema
    onlyPlural: Boolean
    
    name: 
      type: String
      searchable: true
      lowercase:true
        

    singular: 
      type: String
      searchable: true

    variationsTemplate: 
      type: mongoose.Schema.Types.ObjectId
      ref: 'VariationsTemplate'


  # -- Options
  Schema.set 'toJSON', 
    virtuals: true 

  Schema.plugin require('rw.mango').search

  # -- Pre Hooks

  Schema.pre 'save', (next)->
    if @onlyPlural is 1 then next() 
    else
      if @name
        Inflector = new natural.NounInflector()
        @singular = Inflector.singularize @name
        next()

  compound.models.Category = compound.mongoose.model 'Category', Schema


