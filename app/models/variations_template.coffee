module.exports = (compound)->

  mongoose = compound.mongoose

  Schema = new mongoose.Schema
    name: String
    variations: [ new mongoose.Schema({ type: String, skuMod: String }) ]

  compound.models.VariationsTemplate = compound.mongoose.model 'VariationsTemplate', Schema