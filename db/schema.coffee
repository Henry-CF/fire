customSchema ->
  mongoose = require("mongoose")  

  mongoose.plugin require('rw.mango').timestamp
  mongoose.plugin require('rw.mango').queries
  
  mongoose.connect "mongodb://localhost/product-manager-dev"

  # Yes, i'm a cheeky bastard.
  @self.compound.mongoose = mongoose # expose mongoose to entire app

