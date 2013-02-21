Chaplin = require 'chaplin'

module.exports = class Collection extends Chaplin.Collection
  initialize: (models, options)->
    super
    # Initialize Syncmachine to make state globally accessible
    unless models
      @load()
  
  load: ->
    if @url
      @initSyncMachine()
      # Set sync state
      @beginSync()

      # Get collection from server
      @fetch
        success: (models, res)=>
          # @reset res <-- removed to prevent double reset since Chaplin already handles this nicely
          @finishSync()
    else
      return

