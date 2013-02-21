mediator = require 'mediator'
View = require 'views/_base/view'

module.exports = class ModelView extends View
  container: '#page-container'
  autoRender: no
  renderedSubviews: no
  subviews: []
  subviewsByName: {}

  initialize: ->
    super
    @intelligentFetch()
    @registerCommonSubscriptions()
    @registerCommonDelegates()

  intelligentFetch: ->
    # this function insures that superfluous fetch requests are not made upon the creation of "new" models 
    if @model.get('id')
      @model.initSyncMachine()
      @model.beginSync()
      @model.fetch
        success: (model, res)=>
          @model.finishSync()
          @render()
          @initModelBindings()       
    else
      @initModelBindings()       
      @render()

  renderSubviews: ->
    # defined in individual view with super
    return

  initModelBindings: ->
    # over-ride in individual view with super
    return

  viewBindings: ->
    # must defined in indiviaul view with super
   return


  render: ->
    super
    unless @renderedSubviews
      @renderSubviews()
      @renderedSubviews = yes

    @viewBindings()


  registerCommonSubscriptions: ->
      @subscribeEvent 'destroySubview', @destroySubview
      @subscribeEvent 'updateField', @updateField
      #@subscribeEvent 'beforeControllerDispose', @persistLocalStore

  persistLocalStore: ->
    unless @__synced is true
      @updateModel()
      namespace = @model.constructor.name
      model = @model.toJSON()
      
      localStorage.setItem "#{namespace}:#{model.id}", JSON.stringify(model)
      console.log localStorage.getItem "#{namespace}:#{model.id}"

  destroyLocalStore: (key)-> localStorage.removeItem(key)


  registerCommonDelegates: ->
    @delegate "click", "a#sync", @sync
    @delegate 'click', '.click-to-change.checkbox', @swapState

  destroySubview: (cid)-> @removeSubview cid

  updateField: (field, value)-> @model.set field, value

  collect_user_input: ->
    if @$('form#main-form') then @model.set @$('form#main-form').objectify()
    else throw new Error('no #main-form DOM ele is defined!')
    return

  updateModel: ->
    mediator.publish 'subcollection:serialize'
    @collect_user_input()
    @model.clean()

  sync: ->
    
    @updateModel()
    
    # make syncing logic agnostic of model since collect_user_input handles this

    @model.save null,
      error: (model, res)=>
        res.responseTxt
        mediator.publish 'message:flash', error: res.text

      success: (model, res)=>
        @__synced = true
        mediator.publish '!router:route', @model.urlRoot
        mediator.publish 'message:flash', success: 'synced to server'

    return false;


  swapState: (e)->
    console.log @
    if @model.get(e.target.dataset.field) is true then @model.set(e.target.dataset.field, false) else @model.set(e.target.dataset.field, true)
    $(e.target).toggleClass('on')

