Collection = require 'models/base/collection'

module.exports = class DynamoMenuCollection extends Collection
  model: require 'models/dynamo_menu_option'

  query: (param)-> $.get @query_location+param, (res)=> @reset res