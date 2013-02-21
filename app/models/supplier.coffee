module.exports = (compound)->

  mongoose = compound.mongoose

  Surcharge = new mongoose.Schema
    type: String
    cost: Number

  Schema = new mongoose.Schema
    name: 
      type: String
      lowercase: true

    surcharges: [ Surcharge ]

    skuCode:
      type: String
      set: (origin)->
        if origin
          words = origin.toLowerCase().split(' ')
          switch words.length
            when 1 then return words[0].substr(0,2);
            when 2 then return words[0].substr(0,1) + words[1].substr(0,1);
        else return '';


  compound.models.Supplier = compound.mongoose.model 'Supplier', Schema