Collection = require 'models/base/collection'
 

module.exports = class Product_Images extends Collection
  model: require 'models/product_image'

  initialize: ->
    super
    @initSyncMachine()
    @beginSync()
    @reset()
    @finishSync()

  setUrl: (url)->
    @url = url
    @load()
