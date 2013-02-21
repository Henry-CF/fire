s3admix = require('rw-s3admix')
_ = require 'underscore'

fn = ->

module.exports = (compound)->
  
  config = require '../s3.coffee'
  config.bin = compound.app.root + "/tmp"

  compound.app.s3 = new s3admix.Client config

  compound.app.s3.processor.on 'success', (worker, queue, job, result)->

    if result.message and result.type isnt 'cleanup' then compound.app.io.sockets.emit 'image:message', result

    if result.type is "batch:end"
      types = _.pluck(result.file.scope.actions, 'suffix')
      types.push 'original'

      console.log "Attempting to save image"
      

      # here we programmatically call the images#create action
      bridge = new compound.ControllerBridge(compound)
      ctl = bridge.loadController 'images'
      ctl.perform 'create',
        params: result
      , {}, fn
         

      