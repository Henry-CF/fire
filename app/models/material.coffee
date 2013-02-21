module.exports = (compound)->

  mongoose = compound.mongoose

  Schema = new mongoose.Schema
    name:
      type: String
      lowercase: true
    description: String

  compound.models.Material = compound.mongoose.model 'Material', Schema