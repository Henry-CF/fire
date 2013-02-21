module.exports = (compound)->

  mongoose = compound.mongoose

  Surcharge = new mongoose.Schema
    type: String
    cost: Number

  Schema = new mongoose.Schema
    name:
      type: String
      unique: true
    
    surcharges: [ Surcharge ]
        
    _products:  
      type: mongoose.Schema.Types.ObjectId
      ref: 'Product'

  compound.models.Market = compound.mongoose.model 'Market', Schema