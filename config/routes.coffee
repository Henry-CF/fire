exports.routes = (map) ->
  
  map.get '/', 'application#dashboard'
  map.get '/_q', 'search#globalQuery'
  map.get '/_q/:model', 'search#dynamicQuery'

  map.resources 'suppliers'
  map.resources "categories"
  map.resources "brands"
  map.resources "products"
  map.resources 'images'
  map.resources 'scopes'
  map.resources 'variationstemplates'

  map.resources 'markets'

  map.get 'product-markets', "markets#product_markets"
  
  map.get 'groups', 'product_groups#index'
  map.get 'destroy', 'product_groups#destroy'

  map.get '/images/tags/:tags', 'images#tags'


  # Handles uploads
  # Abstracted away from Image controller due to future uploading capabilities
  map.socket 'upload:initialize', 'uploads#initialize'
  map.socket 'upload:continue', 'uploads#upload'
