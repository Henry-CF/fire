module.exports = (compound)->

  mongoose = compound.mongoose

  Schema = new mongoose.Schema
  
    type: 
      type: String
      lowercase: true

    surcharge: 
      type:Number
      default: 0
      
    sku: String
    skuMod: String
    surcharge: Number
    mCode: String
    inQuantity: Number
    exQuantity: Number
    displayWeight: Number

    _product: 
      type: mongoose.Schema.Types.ObjectId
      ref: "Product"
    

  compound.models.Variation = compound.mongoose.model 'Variation', Schema