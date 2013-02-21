module.exports = (compound)->

  mongoose = compound.mongoose

  JobSchema = new mongoose.Schema
    suffix: 
      type: String
      lowercase: true
    height: Number
    width: Number
    job:
      type: String
      default: 'resize'

  Schema = new mongoose.Schema
    name: String
    actions: [ JobSchema ]

  # -- Pre Hooks

  compound.models.Scope = compound.mongoose.model 'Scope', Schema