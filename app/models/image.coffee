module.exports = (compound)->

  mongoose = compound.mongoose

  Schema = new mongoose.Schema
    stem: 
      type: String
      unique: true
      searchable: true

    tags: []

    ext: String
    types: []
    _job:
      type: mongoose.Schema.Types.ObjectId
      ref: 'Scope'

  Schema.plugin require('rw.mango').search
  Schema.plugin require('rw.mango').tags

  Schema.statics.loadSuggestions = (tags, cb)->
    lower_case_tags = []
    lower_case_tags.push(tag.toLowerCase()) for tag in tags
    @
      .where('tags')
      .in(lower_case_tags)
      .exec (err, images)->
          if err then cb(err) else cb(null, images)


  compound.models.Image = compound.mongoose.model 'Image', Schema