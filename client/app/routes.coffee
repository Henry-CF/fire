module.exports = (match) ->
  
  match '', 'dashboard#home'
  match '_q?:query', 'search#query'

  match 'gallery', 'images#gallery'
  match 'gallery/upload', 'images#upload'

  match 'products', 'products#index'
  match 'products/:id/edit', 'products#update'
  match 'products/new', 'products#create'

  match 'brands', 'brands#index'
  match 'brands/:id/edit', 'brands#update'
  match 'brands/new', 'brands#create'

  match 'categories', 'categories#index'
  match 'categories/:id/edit', 'categories#update'
  match 'categories/new', 'categories#create'

  match 'suppliers', 'suppliers#index'
  match 'suppliers/:id/edit', 'suppliers#update'
  match 'suppliers/new', 'suppliers#create'

  match "templates", 'templates#index'
  match 'templates/:id/edit', 'templates#update'
  match 'templates/new', 'templates#create'

  match 'scopes', 'scopes#index'
  match 'scopes/:id/edit', 'scopes#update'
  match 'scopes/new', 'scopes#create'

  match 'markets', 'markets#index'
  match 'markets/:id/edit', 'markets#update'
  match 'markets/new', 'markets#create' 