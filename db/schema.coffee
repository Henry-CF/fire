customSchema ->
  mongoose = require("mongoose")  

  mongoose.plugin require('rw.mango').timestamp
  mongoose.plugin require('rw.mango').queries
  
  mongoose.connect "mongodb://ondreian:BfdLMHCFtYF75uF@localhost/product-manager"

  # Yes, i'm a cheeky bastard.
  # expose mongoose to entire app
  @self.compound.mongoose = mongoose 