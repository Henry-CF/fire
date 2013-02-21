template = require 'views/_templates/products/products_updateorcreate'
ModelView = require 'views/_base/model_view'
mediator = require 'mediator'


# -- Menus -- #
Menu_Dropdown = require 'views/menus/menu_dropdown'
Drop_Down_Menu_Options = require 'models/drop_down_menu'

Menu_Dynamo = require 'views/menus/menu_dynamo'
Dynamo_Menu_Options = require 'models/dynamo_menu'



Variations_View = require 'views/products/collection_variations'
Selling_Points_View = require 'views/products/collection_selling_points'
Image_Gallery = require 'views/products/collection_image_gallery'
Product_Markets_View = require 'views/products/collection_markets'


Product_Images = require 'models/product_images'


module.exports = class ProductUpdateOrCreateView extends ModelView
  template: template
  tagName: 'section'
  className: 'product-updateorcreate'

  initialize: ->
    super   
    @decay = 1000

  renderSubviews: ->
    @renderVariations()
    @renderSellingPoints()
    @render_image_gallery()
    @render_product_markets()

  viewBindings: ->
    @registerSubscriptions()
    @electDelegates()

  registerSubscriptions: ->
    @subscribeEvent 'destroy:dynamo_menu', @destroy_dynamo_menu
    @subscribeEvent 'destroy:drop_down_menu', @destroy_drop_down_menu
    @subscribeEvent 'update:field', @update_field
    @subscribeEvent 'fetch_pricing_data', @fetch_pricing_data
    @subscribeEvent 'variation:first', @set_first_sku

  electDelegates: ->

    # Submenus
    @delegate "click", "a.dynamo-menu", @create_dynamo_menu
    @delegate "click", "a.drop-down-trigger", @create_drop_down_menu
    @delegate "click", "a.apply-template", @create_drop_down_menu


    @delegate "blur", 'input.sku-base', @update_sku_supplier_base
    @delegate "blur", "input#cost", @fetch_pricing_data
    @delegate "blur", "input#markup", @fetch_pricing_data
    @delegate "blur", 'input.product-map', @fetch_pricing_data

  # ------------------------------ #
  #  View specific model bindings  #
  # ------------------------------ #
  initModelBindings: ->
    super
    
    @modelBind 'change:_brand', @update_brand
    @modelBind 'change:_category', @update_category
    @modelBind 'change:_supplier', @update_supplier

    @modelBind 'change:_color', @update_color
    @modelBind 'change:_material', @update_material

    @modelBind 'change:_variationsTemplate', @update_variations
    
  # ------------ Sub View Rendering -------------------- #
  #    Handles the rendering of subviews                 #
  #    for variations & selling points                   #
  # ---------------------------------------------------- #

  renderVariations: ->    
    @subview 'variations_list', new Variations_View
      collection: @model.get('variations')
      container: @$('#variations-container')

  renderSellingPoints: ->
    @subview 'selling_points_list', new Selling_Points_View
      collection: @model.get('selling_points')
      container: @$('#selling-points-container')

  render_image_gallery: ->
    @subview 'image_gallery', new Image_Gallery
      collection: @model.get('images')
      container: @$('.gallery-container')
      parent: @model # pass model in so that it may be referenced for suggestions

  render_product_markets: ->
    @subview 'product_markets', new Product_Markets_View
      collection: @model.get('price_points')
      container: @$('#markets-container')

  # ------------ Menu Handlers ----------------------- #
  # These methods handle the two types of menus that   #
  # a user can activate (dynamo, drop_down)            #
  # ---------------------------------------------------#

  create_dynamo_menu: (e)->
    @resetMenus()
    @subview 'dynamo_menu', new Menu_Dynamo
      collection: new Dynamo_Menu_Options()
      field: e.target.dataset.field
      urlChunk: e.target.dataset.querymodel
    e.preventDefault()
  
  destroy_dynamo_menu: -> 
    $('.overlay').addClass 'hidden'
    @removeSubview 'dynamo_menu'

  create_drop_down_menu: (e)->
    @resetMenus()

    # for some reason calling the collection in the few is not delegating the item visibility, so I am chaining it here.
    # It could also be argued this offers more transparency as to where the models come from
    # TODO: Cache url queries?
    if @model.get(e.target.dataset.parent) or e.target.dataset.url

      @subview 'drop_down_menu', new Menu_Dropdown
        collection: new Drop_Down_Menu_Options() 
        field: e.target.dataset.field
        container: e.target

      if not e.target.dataset.url then @subview('drop_down_menu').collection.reset(@model.get(e.target.dataset.parent)[e.target.dataset.key]).finishSync()
    
    else

      mediator.publish 'message:flash', error: "#{e.target.dataset.parent.replace("_", '')} must be set first"

    e.preventDefault()


  destroy_drop_down_menu: -> @removeSubview 'drop_down_menu'

  update_field: (data)->
    @model.set(key, value) for key, value of data
    @resetMenus()

  resetMenus: ->
    if @subviewsByName['dynamo_menu'] then @destroy_dynamo_menu()
    if @subviewsByName['drop_down_menu'] then @destroy_drop_down_menu()

  # ------------ Model Updaters ----------- #
  #
  # --------------------------------------- #

  update_brand: (model, brand)->
    @notify_client '.brand', brand.name
    @model.set '_color', null
    @model.set '_material', null
    @$('.brand-dependants-container').removeClass('hidden') if brand.name

  update_category: (model, category)-> @notify_client '.category', category.name

  update_supplier: (model, supplier)-> 
    @notify_client '.supplier', supplier.name
    @update_sku supplier.skuCode, 0

    @$('.supplier-surcharges').empty()

    if supplier?.surcharges.length > 0
      for surcharge in supplier.surcharges
        ele = "<div class='supplier-surcharge'><span class='supplier-surcharge-type'>#{surcharge.type} </span><span class='supplier-surcharge-cost'> #{surcharge.cost }</span></div>"
        @$('.supplier-surcharges').append ele
    # update supplier costs 

  update_color: (model, color)-> 
    if color
      @notify_client '.color', color.name 
      @update_sku color.shortCode, 2 
    else 
      @notify_client '.color', 'add color'

  update_material: (model, material)-> if material then @notify_client '.material', material.name else @notify_client '.material', 'add material'

  update_variations: (model, template)->
    for variation in template.variations
      # remove mongo ids so it doesn't mess up a save
      delete variation.id
      delete variation._id
      @subview('variations_list').collection.push variation

    @subview('variations_list').swap_template_button_visibility()

  set_first_sku: ->
    if @model.get('_supplier')
      @update_sku @model.get('_supplier').skuCode, 0

    if @model.get('_color')
      @update_sku @model.get('_color').shortCode, 2

    if @$('.sku-base').val()
      @update_sku @$('.sku-base').val(), 1 


  # ------------------- #
  # Change client html  #
  # ------------------- #

  notify_client: (selector, value) -> 
    $(selector).text(value).addClass('changed')
    setTimeout ()-> 
      $(selector).removeClass('changed')
    , @decay
    
  # ---------------------------- #
  # Variations Template handlers #
  # ---------------------------- #

  applyDefaultTemplate: (e)->
    @model.set 'productVariationTemplateId', @model.get('parent').category.categoryVariationTemplateId
    e.preventDefault()


  update_sku: (val, position)-> mediator.publish 'update:sku', { value: val, position: position}

  update_sku_supplier_base: (e)-> mediator.publish 'update:sku', { value: e.target.value, position: 1 }

  fetch_pricing_data: (instance)->
    pricing_data =
      MAP: Number($('.product-map').val(), 10) || 0
      supplier_costs: if @model.get('_supplier') then _(@model.get('_supplier').surcharges).pluck('cost').reduce (total, surcharge)-> return total+surcharge; else 0
      product_cost: Number(@$('#cost').val(), 10)
      markup: Number(@$('#markup').val(), 10)

    if instance.target
      mediator.publish "pricing_data", pricing_data
    else
      mediator.publish "pricing_data:#{instance}", pricing_data
      