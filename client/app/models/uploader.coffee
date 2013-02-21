Collection = require 'models/base/collection'
_ = require 'underscore'

module.exports = class UploaderCollection extends Collection
  model: require 'models/upload'

  addFile: (file)-> @push file

  removeFile: (file_name)->

  queuedFiles: ->
    files = @filter (file)-> return file if file.get('queued') is yes
    return files

  fileName: (name)->
    models = @where name: name
    return models[0]

  removeByFileName: (name)-> @remove @where name: name

  updateStatus: (info)->
    if info.name 
      models = @where name: info.name
      models[0].set 'status', status
    else
      for model in @models
        model.set 'status', info.status

  setScope: (scope)->
    for model in @models
      model.set '_scope', scope._id
      model.set 'scope', scope
      model.set 'scope_name', scope.name

