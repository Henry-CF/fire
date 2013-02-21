template = require 'views/_templates/globals/search_results'
CollectionView = require 'views/_base/collection_view'

module.exports = class SearchResultsView extends CollectionView
  template: template
  autoRender: yes
  tagName: 'section'
  className: 'search-results'
  itemView: require 'views/globals/search_result'

  initialize: ->
    super
    @collection.setUrl @options.query
    @collection.load()
    window.Results = @

