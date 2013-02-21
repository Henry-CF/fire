module.exports = (compound)->

  mongoose = compound.mongoose

  Schema = new mongoose.Schema
    _members: [{
      type: mongoose.Schema.Types.ObjectId
      ref: 'Product'
    }]
    title: String

  compound.models.ProductGroup = compound.mongoose.model 'ProductGroup', Schema