module.exports = (compound)->

  mongoose = compound.mongoose

  Schema = new compound.mongoose.Schema
    name: 
      type: String
      searchable: true
      lowercase: true
    
    description: String
    
    active: Boolean
    
    colors: 
      type: [{ type: mongoose.Schema.ObjectId, ref: 'Color' }]
      populate_with_search: true 
    
    materials: 
      type: [{ type: mongoose.Schema.ObjectId, ref: 'Material'}]
      populate_with_search: true 

  # -- Plugins

  Schema.plugin require('rw.mango').search

  # -- Options
  Schema.set 'toJSON', 
    virtuals: true 


  compound.models.Brand = compound.mongoose.model 'Brand', Schema