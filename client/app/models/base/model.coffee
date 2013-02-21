Chaplin = require 'chaplin'

module.exports = class Model extends Chaplin.Model
  clean: -> 
    unless @attributes_for_cleaning then return
  
    handle_model = (obj)-> 
      if obj._id then return obj._id

    handle_collection = (collection)->

      ids = []
      if collection.length > 0 # if it has a length
        wait = collection.length
        collection = collection.toJSON()
        for model in collection # iterate over models and return ids 
          if model._id then ids.push model._id
          if --wait is 0 then return ids 

    # Look at attributes that must be cleaned for persistance
    for attr in @attributes_for_cleaning

      # retrieve the current value of the attribute
      model_attribute = @attributes[attr]
      if model_attribute

        # if it has length it's a collection, otherwise it's an object
        new_val = if model_attribute.length then handle_collection(model_attribute) else handle_model(model_attribute)
        
        @attributes[attr] = new_val
