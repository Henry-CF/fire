Collection = require 'models/base/collection'

module.exports = class SearchResults extends Collection
  model: require 'models/search_result'
  setUrl: (query)-> @url = "/_q?#{query}"
