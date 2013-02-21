_ = require 'underscore'

module.exports = (compound)->

  mongoose = compound.mongoose

  Selling_Point = new mongoose.Schema
    description: String

  Price_Point = new mongoose.Schema
    _market:
      type: mongoose.Schema.Types.ObjectId
      ref: 'Market'
    price: Number
    roi: Number
    active: Boolean



  Schema = new mongoose.Schema
    title:
      type: String
      searchable: true
      lowercase: true
    description: String
    MAP: 
      type: Number
      default: 0
    cost: Number
    skuBase: String

    markup:
      type: Number
      default: 1.30
    male:
      type: Boolean
      default: true
    female:
      type: Boolean
      default: true
    active:
      type: Boolean
      default: false

    selling_points: [Selling_Point]
    price_points: [Price_Point]

    _color:
      type: mongoose.Schema.Types.ObjectId
      ref: 'Color'
    _material:
      type: mongoose.Schema.Types.ObjectId
      ref: 'Material'
    _brand:
      type: mongoose.Schema.Types.ObjectId
      ref: 'Brand'
    _category: 
      type: mongoose.Schema.Types.ObjectId
      ref: 'Category'
    _template:
      type: mongoose.Schema.Types.ObjectId
      ref: 'VariationsTemplate'
    _supplier:
      type: mongoose.Schema.Types.ObjectId
      ref: "Supplier"
    
    _group:
      type: mongoose.Schema.Types.ObjectId
      ref: "ProductGroup"

    variations: [{
      type: mongoose.Schema.Types.ObjectId
      ref: 'Variation'
    }]
    images: [{
      type: mongoose.Schema.Types.ObjectId
      ref: 'Image'
    }]


  Schema.plugin require('rw.mango').search

  # -- Methods
  Schema.methods.loadGrandChildren = (next)->
    wait = 2
    product = @toObject()

    progress = ->  if --wait is 0 then next(null, product)
    if product._brand
      compound.model.Color.find
        _id:
          $in: product._brand.colors
      , (err, colors)=>
        if err then callback(err) else
          product._brand.colors = colors
          progress()
    else progress()

    if product._brand
      compound.model.Material.find
        _id:
          $in: product._brand.materials
      , (err, materials)=>
        if err then callback(err) else
          product._brand.materials = materials
          progress()
    else progress()

  Schema.methods.updateVariations = (variations, next)->
    # Step 1
    # pluck current ids from client
    # get saved dbs from document and stringify them so they can be properly compared  
    collect_ids = =>
      console.log 'step 1 started'
      client_ids = _(variations).pluck('_id')
      db_ids = ("#{id}" for id in @variations)


      ids_for_deletion = []
      step_1_wait = db_ids.length
      
      if db_ids.length > 0
        for id in db_ids
          if id not in client_ids then ids_for_deletion.push id
          if --step_1_wait is 0 then delete_old_variations(ids_for_deletion)
      else
        delete_old_variations(ids_for_deletion)

    delete_old_variations = (ids_for_deletion)=>
      console.log 'step 2 started'
      docs_for_upsert = _(variations).filter (variation)-> 
        if variation._id
          if variation._id not in ids_for_deletion then variation
        else
          variation


      if ids_for_deletion.length > 0
        
        app.debug @variations
        compound.model.Variation.remove { _id: { $in: ids_for_deletion  } } , (err, nRemoved)=>
          if err then next(err)
          else
            app.debug "Number removed :: #{nRemoved} <> Expected :: #{ids_for_deletion.length}"

            app.debug "<-- performing pull -->"
            app.debug ids_for_deletion
            @variations.pull(id) for id in ids_for_deletion
            
            upsert_variations(docs_for_upsert)
      else
        upsert_variations(docs_for_upsert)

    upsert_variations = (docs_for_upsert)=>
      step_3_wait = docs_for_upsert.length
      app.debug 'step 3 started'
      if step_3_wait > 0
        for variation in docs_for_upsert
          do (variation)=>
            variation['_product'] = @_id
            if variation._id 
              compound.model.Variation.findById variation._id, (err, doc)=>
                if err then next(err)
                doc.set variation
                doc.save (err, doc)->
                  if err then next(err)                
                  if --step_3_wait is 0 then next(null) 
            else
              console.log 'create new variation'
              new_v = new model.Variation variation
              new_v.save (err, doc)=>
                if err then next(err) else @variations.push new_v._id
                if --step_3_wait is 0 then next(null)
      else
        next(null)

    collect_ids()

  Schema.pre 'save', (next)->

    verify_membership = =>
      compound.model.ProductGroup.findOne(title: @title).exec (err, group)=>
        if group
          console.log 'Group exists :: verifying membership'
          console.log "Membership test: #{group._members.indexOf(@_id)}"
          if group._members.indexOf(@_id) < 0
            group._members.push @_id
            group.save (err,group)=>
              if err then app.debug err.message
              next()
          else
            next()

        else
          console.log 'Creating new group but @_group was defined'
          console.log @_id
          # a new group is required
          group = new model.ProductGroup
          group.title = @title
          group._members = [@_id]
          group.save (err, group)=>
            if err then app.debug err.message
            @_group = group._id
            next()

      
    upsert_group = =>
      app.debug 'upserting product to group'
      
      compound.model.ProductGroup.findOne(title: @title).exec (err, group)=>
        if group
          # add this product as a group member
          unless group._members.indexOf @_id
            group._members.push @_id

        else
          # a new group is required
          group = new model.ProductGroup
          group.title = @title
          group._members = [@_id]

        group.save (err, group)=>
          if err then app.debug err.message else @_group = group._id
          console.log group
          next()
      
    if @_group then verify_membership() else upsert_group()


  compound.models.Product = compound.mongoose.model 'Product', Schema