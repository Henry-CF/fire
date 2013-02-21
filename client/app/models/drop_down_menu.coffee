Collection = require 'models/base/collection'

module.exports = class DropDownMenuCollection extends Collection
  model: require 'models/drop_down_menu_option'

  setUrl: (url)->
    @url = url
    @load()