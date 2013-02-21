Model = require 'models/base/model'
mediator = require 'mediator'

Selling_Points = require 'models/selling_points'
Variations = require 'models/variations'
Product_Images = require 'models/product_images'
Product_Markets = require 'models/product_markets'

module.exports = class Product extends Model
    urlRoot: '/products'
    
    defaults:
        title: ''
        updatedAt: new Date
        description: ''
        male: true
        female: true
        markup: 1.30
        MAP: ''
        cost: 0
        price: 1000
        skuBase: ''
        selling_points: new Selling_Points()
        variations: new Variations()
        images: new Product_Images()
        price_points: new Product_Markets()

    attributes_for_cleaning: [
        '_color',
        '_material',
        '_brand',
        '_supplier',
        '_category',
        'images'
        ]

    initialize: ->
        super

    parse: (res)->
        res.selling_points = new Selling_Points res.selling_points
        res.variations = new Variations res.variations
        res.images = new Product_Images res.images

        if res.price_points
            price_points = res.price_points
            res.price_points = new Product_Markets()
            res.price_points.set_pricing price_points
            
        return res  