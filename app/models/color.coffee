module.exports = (compound)->

  mongoose = compound.mongoose

  Schema = new mongoose.Schema
  name:
    type: String
    lowercase: true
  description: String
  shortCode: 
    type: String
    uppercase: true 


  compound.models.Color = compound.mongoose.model 'Color', Schema