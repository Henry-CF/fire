Model = require 'models/base/model'

module.exports = class LeftNavigation extends Model
	defaults:
    links: [
      { href: '#', title: 'Dashboard' },
      { href: '#/products', title: 'Products' },
      { href: '#/gallery', title: 'Gallery' },
      { href: '#/brands', title: 'Brands' },
      { href: '#/categories', title: 'Categories' },
      { href: '#/suppliers', title: 'Suppliers' },
      { href: '#/templates', title: 'Templates'},
      { href: '#/scopes', title: 'Scopes' },
      { href: '#/markets', title: 'Markets' },
      

      { href: '/_logout', title: 'Log Out', class: 'logout'}

    ]