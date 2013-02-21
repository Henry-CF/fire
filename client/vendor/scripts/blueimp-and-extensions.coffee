_ajax_request = (url, data, callback, type, method) ->
  if jQuery.isFunction(data)
    callback = data
    data = {}
  jQuery.ajax
    type: method
    url: url
    data: data
    success: callback
    dataType: type
((factory) ->
  if typeof define is "function" and define.amd
    define [ "jquery" ], factory
  else
    factory jQuery
) ($, undefined_) ->
  if $.cleanData
    _cleanData = $.cleanData
    $.cleanData = (elems) ->
      i = 0
      elem = undefined

      while (elem = elems[i])?
        try
          $(elem).triggerHandler "remove"
        i++
      _cleanData elems
  else
    _remove = $.fn.remove
    $.fn.remove = (selector, keepData) ->
      @each ->
        unless keepData
          if not selector or $.filter(selector, [ this ]).length
            $("*", this).add([ this ]).each ->
              try
                $(this).triggerHandler "remove"
        _remove.call $(this), selector, keepData
  $.widget = (name, base, prototype) ->
    namespace = name.split(".")[0]
    fullName = undefined
    name = name.split(".")[1]
    fullName = namespace + "-" + name
    unless prototype
      prototype = base
      base = $.Widget
    $.expr[":"][fullName] = (elem) ->
      !!$.data(elem, name)

    $[namespace] = $[namespace] or {}
    $[namespace][name] = (options, element) ->
      @_createWidget options, element  if arguments.length

    basePrototype = new base()
    basePrototype.options = $.extend(true, {}, basePrototype.options)
    $[namespace][name]:: = $.extend(true, basePrototype,
      namespace: namespace
      widgetName: name
      widgetEventPrefix: $[namespace][name]::widgetEventPrefix or name
      widgetBaseClass: fullName
    , prototype)
    $.widget.bridge name, $[namespace][name]

  $.widget.bridge = (name, object) ->
    $.fn[name] = (options) ->
      isMethodCall = typeof options is "string"
      args = Array::slice.call(arguments, 1)
      returnValue = this
      options = (if not isMethodCall and args.length then $.extend.apply(null, [ true, options ].concat(args)) else options)
      return returnValue  if isMethodCall and options.charAt(0) is "_"
      if isMethodCall
        @each ->
          instance = $.data(this, name)
          methodValue = (if instance and $.isFunction(instance[options]) then instance[options].apply(instance, args) else instance)
          if methodValue isnt instance and methodValue isnt `undefined`
            returnValue = methodValue
            false
      else
        @each ->
          instance = $.data(this, name)
          if instance
            instance.option(options or {})._init()
          else
            $.data this, name, new object(options, this)
      returnValue

  $.Widget = (options, element) ->
    @_createWidget options, element  if arguments.length

  $.Widget:: =
    widgetName: "widget"
    widgetEventPrefix: ""
    options:
      disabled: false

    _createWidget: (options, element) ->
      $.data element, @widgetName, this
      @element = $(element)
      @options = $.extend(true, {}, @options, @_getCreateOptions(), options)
      self = this
      @element.bind "remove." + @widgetName, ->
        self.destroy()

      @_create()
      @_trigger "create"
      @_init()

    _getCreateOptions: ->
      $.metadata and $.metadata.get(@element[0])[@widgetName]

    _create: ->

    _init: ->

    destroy: ->
      @element.unbind("." + @widgetName).removeData @widgetName
      @widget().unbind("." + @widgetName).removeAttr("aria-disabled").removeClass @widgetBaseClass + "-disabled " + "ui-state-disabled"

    widget: ->
      @element

    option: (key, value) ->
      options = key
      return $.extend({}, @options)  if arguments.length is 0
      if typeof key is "string"
        return @options[key]  if value is `undefined`
        options = {}
        options[key] = value
      @_setOptions options
      this

    _setOptions: (options) ->
      self = this
      $.each options, (key, value) ->
        self._setOption key, value

      this

    _setOption: (key, value) ->
      @options[key] = value
      @widget()[(if value then "addClass" else "removeClass")](@widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr "aria-disabled", value  if key is "disabled"
      this

    enable: ->
      @_setOption "disabled", false

    disable: ->
      @_setOption "disabled", true

    _trigger: (type, event, data) ->
      prop = undefined
      orig = undefined
      callback = @options[type]
      data = data or {}
      event = $.Event(event)
      event.type = (if type is @widgetEventPrefix then type else @widgetEventPrefix + type).toLowerCase()
      event.target = @element[0]
      orig = event.originalEvent
      if orig
        for prop of orig
          event[prop] = orig[prop]  unless prop of event
      @element.trigger event, data
      not ($.isFunction(callback) and callback.call(@element[0], event, data) is false or event.isDefaultPrevented())

((factory) ->
  "use strict"
  if typeof define is "function" and define.amd
    define [ "jquery", "jquery.ui.widget" ], factory
  else
    factory window.jQuery
) ($) ->
  "use strict"
  $.support.xhrFileUpload = !!(window.XMLHttpRequestUpload and window.FileReader)
  $.support.xhrFormDataFileUpload = !!window.FormData
  $.widget "blueimp.fileupload",
    options:
      namespace: `undefined`
      dropZone: $(document)
      fileInput: `undefined`
      replaceFileInput: true
      paramName: `undefined`
      singleFileUploads: true
      limitMultiFileUploads: `undefined`
      sequentialUploads: false
      limitConcurrentUploads: `undefined`
      forceIframeTransport: false
      redirect: `undefined`
      redirectParamName: `undefined`
      postMessage: `undefined`
      multipart: true
      maxChunkSize: `undefined`
      uploadedBytes: `undefined`
      recalculateProgress: true
      progressInterval: 100
      bitrateInterval: 500
      formData: (form) ->
        form.serializeArray()

      add: (e, data) ->
        data.submit()

      processData: false
      contentType: false
      cache: false

    _refreshOptionsList: [ "namespace", "dropZone", "fileInput", "multipart", "forceIframeTransport" ]
    _BitrateTimer: ->
      @timestamp = +(new Date())
      @loaded = 0
      @bitrate = 0
      @getBitrate = (now, loaded, interval) ->
        timeDiff = now - @timestamp
        if not @bitrate or not interval or timeDiff > interval
          @bitrate = (loaded - @loaded) * (1000 / timeDiff) * 8
          @loaded = loaded
          @timestamp = now
        @bitrate

    _isXHRUpload: (options) ->
      not options.forceIframeTransport and ((not options.multipart and $.support.xhrFileUpload) or $.support.xhrFormDataFileUpload)

    _getFormData: (options) ->
      formData = undefined
      return options.formData(options.form)  if typeof options.formData is "function"
      return options.formData  if $.isArray(options.formData)
      if options.formData
        formData = []
        $.each options.formData, (name, value) ->
          formData.push
            name: name
            value: value

        return formData
      []

    _getTotal: (files) ->
      total = 0
      $.each files, (index, file) ->
        total += file.size or 1

      total

    _onProgress: (e, data) ->
      if e.lengthComputable
        now = +(new Date())
        total = undefined
        loaded = undefined
        return  if data._time and data.progressInterval and (now - data._time < data.progressInterval) and e.loaded isnt e.total
        data._time = now
        total = data.total or @_getTotal(data.files)
        loaded = parseInt(e.loaded / e.total * (data.chunkSize or total), 10) + (data.uploadedBytes or 0)
        @_loaded += loaded - (data.loaded or data.uploadedBytes or 0)
        data.lengthComputable = true
        data.loaded = loaded
        data.total = total
        data.bitrate = data._bitrateTimer.getBitrate(now, loaded, data.bitrateInterval)
        @_trigger "progress", e, data
        @_trigger "progressall", e,
          lengthComputable: true
          loaded: @_loaded
          total: @_total
          bitrate: @_bitrateTimer.getBitrate(now, @_loaded, data.bitrateInterval)

    _initProgressListener: (options) ->
      that = this
      xhr = (if options.xhr then options.xhr() else $.ajaxSettings.xhr())
      if xhr.upload
        $(xhr.upload).bind "progress", (e) ->
          oe = e.originalEvent
          e.lengthComputable = oe.lengthComputable
          e.loaded = oe.loaded
          e.total = oe.total
          that._onProgress e, options

        options.xhr = ->
          xhr

    _initXHRData: (options) ->
      formData = undefined
      file = options.files[0]
      multipart = options.multipart or not $.support.xhrFileUpload
      paramName = options.paramName[0]
      if not multipart or options.blob
        options.headers = $.extend(options.headers,
          "X-File-Name": file.name
          "X-File-Type": file.type
          "X-File-Size": file.size
        )
        unless options.blob
          options.contentType = file.type
          options.data = file
        else unless multipart
          options.contentType = "application/octet-stream"
          options.data = options.blob
      if multipart and $.support.xhrFormDataFileUpload
        if options.postMessage
          formData = @_getFormData(options)
          if options.blob
            formData.push
              name: paramName
              value: options.blob
          else
            $.each options.files, (index, file) ->
              formData.push
                name: options.paramName[index] or paramName
                value: file
        else
          if options.formData instanceof FormData
            formData = options.formData
          else
            formData = new FormData()
            $.each @_getFormData(options), (index, field) ->
              formData.append field.name, field.value
          if options.blob
            formData.append paramName, options.blob, file.name
          else
            $.each options.files, (index, file) ->
              formData.append options.paramName[index] or paramName, file, file.name  if file instanceof Blob
        options.data = formData
      options.blob = null

    _initIframeSettings: (options) ->
      options.dataType = "iframe " + (options.dataType or "")
      options.formData = @_getFormData(options)
      if options.redirect and $("<a></a>").prop("href", options.url).prop("host") isnt location.host
        options.formData.push
          name: options.redirectParamName or "redirect"
          value: options.redirect

    _initDataSettings: (options) ->
      if @_isXHRUpload(options)
        unless @_chunkedUpload(options, true)
          @_initXHRData options  unless options.data
          @_initProgressListener options
        options.dataType = "postmessage " + (options.dataType or "")  if options.postMessage
      else
        @_initIframeSettings options, "iframe"

    _getParamName: (options) ->
      fileInput = $(options.fileInput)
      paramName = options.paramName
      unless paramName
        paramName = []
        fileInput.each ->
          input = $(this)
          name = input.prop("name") or "files[]"
          i = (input.prop("files") or [ 1 ]).length
          while i
            paramName.push name
            i -= 1

        paramName = [ fileInput.prop("name") or "files[]" ]  unless paramName.length
      else paramName = [ paramName ]  unless $.isArray(paramName)
      paramName

    _initFormSettings: (options) ->
      options.form = $(options.fileInput.prop("form"))  if not options.form or not options.form.length
      options.paramName = @_getParamName(options)
      options.url = options.form.prop("action") or location.href  unless options.url
      options.type = (options.type or options.form.prop("method") or "").toUpperCase()
      options.type = "POST"  if options.type isnt "POST" and options.type isnt "PUT"

    _getAJAXSettings: (data) ->
      options = $.extend({}, @options, data)
      @_initFormSettings options
      @_initDataSettings options
      options

    _enhancePromise: (promise) ->
      promise.success = promise.done
      promise.error = promise.fail
      promise.complete = promise.always
      promise

    _getXHRPromise: (resolveOrReject, context, args) ->
      dfd = $.Deferred()
      promise = dfd.promise()
      context = context or @options.context or promise
      if resolveOrReject is true
        dfd.resolveWith context, args
      else dfd.rejectWith context, args  if resolveOrReject is false
      promise.abort = dfd.promise
      @_enhancePromise promise

    _chunkedUpload: (options, testOnly) ->
      that = this
      file = options.files[0]
      fs = file.size
      ub = options.uploadedBytes = options.uploadedBytes or 0
      mcs = options.maxChunkSize or fs
      slice = file.webkitSlice or file.mozSlice or file.slice
      upload = undefined
      n = undefined
      jqXHR = undefined
      pipe = undefined
      return false  if not (@_isXHRUpload(options) and slice and (ub or mcs < fs)) or options.data
      return true  if testOnly
      if ub >= fs
        file.error = "uploadedBytes"
        return @_getXHRPromise(false, options.context, [ null, "error", file.error ])
      n = Math.ceil((fs - ub) / mcs)
      upload = (i) ->
        return that._getXHRPromise(true, options.context)  unless i
        upload(i -= 1).pipe ->
          o = $.extend({}, options)
          o.blob = slice.call(file, ub + i * mcs, ub + (i + 1) * mcs)
          o.chunkSize = o.blob.size
          that._initXHRData o
          that._initProgressListener o
          jqXHR = ($.ajax(o) or that._getXHRPromise(false, o.context)).done(->
            unless o.loaded
              that._onProgress $.Event("progress",
                lengthComputable: true
                loaded: o.chunkSize
                total: o.chunkSize
              ), o
            options.uploadedBytes = o.uploadedBytes += o.chunkSize
          )
          jqXHR

      pipe = upload(n)
      pipe.abort = ->
        jqXHR.abort()

      @_enhancePromise pipe

    _beforeSend: (e, data) ->
      if @_active is 0
        @_trigger "start"
        @_bitrateTimer = new @_BitrateTimer()
      @_active += 1
      @_loaded += data.uploadedBytes or 0
      @_total += @_getTotal(data.files)

    _onDone: (result, textStatus, jqXHR, options) ->
      unless @_isXHRUpload(options)
        @_onProgress $.Event("progress",
          lengthComputable: true
          loaded: 1
          total: 1
        ), options
      options.result = result
      options.textStatus = textStatus
      options.jqXHR = jqXHR
      @_trigger "done", null, options

    _onFail: (jqXHR, textStatus, errorThrown, options) ->
      options.jqXHR = jqXHR
      options.textStatus = textStatus
      options.errorThrown = errorThrown
      @_trigger "fail", null, options
      if options.recalculateProgress
        @_loaded -= options.loaded or options.uploadedBytes or 0
        @_total -= options.total or @_getTotal(options.files)

    _onAlways: (jqXHRorResult, textStatus, jqXHRorError, options) ->
      @_active -= 1
      options.textStatus = textStatus
      if jqXHRorError and jqXHRorError.always
        options.jqXHR = jqXHRorError
        options.result = jqXHRorResult
      else
        options.jqXHR = jqXHRorResult
        options.errorThrown = jqXHRorError
      @_trigger "always", null, options
      if @_active is 0
        @_trigger "stop"
        @_loaded = @_total = 0
        @_bitrateTimer = null

    _onSend: (e, data) ->
      that = this
      jqXHR = undefined
      slot = undefined
      pipe = undefined
      options = that._getAJAXSettings(data)
      send = (resolve, args) ->
        that._sending += 1
        options._bitrateTimer = new that._BitrateTimer()
        jqXHR = jqXHR or (resolve isnt false and that._trigger("send", e, options) isnt false and (that._chunkedUpload(options) or $.ajax(options))) or that._getXHRPromise(false, options.context, args).done((result, textStatus, jqXHR) ->
          that._onDone result, textStatus, jqXHR, options
        ).fail((jqXHR, textStatus, errorThrown) ->
          that._onFail jqXHR, textStatus, errorThrown, options
        ).always((jqXHRorResult, textStatus, jqXHRorError) ->
          that._sending -= 1
          that._onAlways jqXHRorResult, textStatus, jqXHRorError, options
          if options.limitConcurrentUploads and options.limitConcurrentUploads > that._sending
            nextSlot = that._slots.shift()
            while nextSlot
              unless nextSlot.isRejected()
                nextSlot.resolve()
                break
              nextSlot = that._slots.shift()
        )
        jqXHR

      @_beforeSend e, options
      if @options.sequentialUploads or (@options.limitConcurrentUploads and @options.limitConcurrentUploads <= @_sending)
        if @options.limitConcurrentUploads > 1
          slot = $.Deferred()
          @_slots.push slot
          pipe = slot.pipe(send)
        else
          pipe = (@_sequence = @_sequence.pipe(send, send))
        pipe.abort = ->
          args = [ `undefined`, "abort", "abort" ]
          unless jqXHR
            slot.rejectWith args  if slot
            return send(false, args)
          jqXHR.abort()

        return @_enhancePromise(pipe)
      send()

    _onAdd: (e, data) ->
      that = this
      result = true
      options = $.extend({}, @options, data)
      limit = options.limitMultiFileUploads
      paramName = @_getParamName(options)
      paramNameSet = undefined
      paramNameSlice = undefined
      fileSet = undefined
      i = undefined
      if not (options.singleFileUploads or limit) or not @_isXHRUpload(options)
        fileSet = [ data.files ]
        paramNameSet = [ paramName ]
      else if not options.singleFileUploads and limit
        fileSet = []
        paramNameSet = []
        i = 0
        while i < data.files.length
          fileSet.push data.files.slice(i, i + limit)
          paramNameSlice = paramName.slice(i, i + limit)
          paramNameSlice = paramName  unless paramNameSlice.length
          paramNameSet.push paramNameSlice
          i += limit
      else
        paramNameSet = paramName
      data.originalFiles = data.files
      $.each fileSet or data.files, (index, element) ->
        newData = $.extend({}, data)
        newData.files = (if fileSet then element else [ element ])
        newData.paramName = paramNameSet[index]
        newData.submit = ->
          newData.jqXHR = @jqXHR = (that._trigger("submit", e, this) isnt false) and that._onSend(e, this)
          @jqXHR

        result = that._trigger("add", e, newData)

      result

    _normalizeFile: (index, file) ->
      if file.name is `undefined` and file.size is `undefined`
        file.name = file.fileName
        file.size = file.fileSize

    _replaceFileInput: (input) ->
      inputClone = input.clone(true)
      $("<form></form>").append(inputClone)[0].reset()
      input.after(inputClone).detach()
      $.cleanData input.unbind("remove")
      @options.fileInput = @options.fileInput.map((i, el) ->
        return inputClone[0]  if el is input[0]
        el
      )
      @element = inputClone  if input[0] is @element[0]

    _onChange: (e) ->
      that = e.data.fileupload
      data =
        files: $.each($.makeArray(e.target.files), that._normalizeFile)
        fileInput: $(e.target)
        form: $(e.target.form)

      data.files = [ name: e.target.value.replace(/^.*\\/, "") ]  unless data.files.length
      that._replaceFileInput data.fileInput  if that.options.replaceFileInput
      false  if that._trigger("change", e, data) is false or that._onAdd(e, data) is false

    _onPaste: (e) ->
      that = e.data.fileupload
      cbd = e.originalEvent.clipboardData
      items = (cbd and cbd.items) or []
      data = files: []
      $.each items, (index, item) ->
        file = item.getAsFile and item.getAsFile()
        data.files.push file  if file

      false  if that._trigger("paste", e, data) is false or that._onAdd(e, data) is false

    _onDrop: (e) ->
      that = e.data.fileupload
      dataTransfer = e.dataTransfer = e.originalEvent.dataTransfer
      data = files: $.each($.makeArray(dataTransfer and dataTransfer.files), that._normalizeFile)
      return false  if that._trigger("drop", e, data) is false or that._onAdd(e, data) is false
      e.preventDefault()

    _onDragOver: (e) ->
      that = e.data.fileupload
      dataTransfer = e.dataTransfer = e.originalEvent.dataTransfer
      return false  if that._trigger("dragover", e) is false
      dataTransfer.dropEffect = dataTransfer.effectAllowed = "copy"  if dataTransfer
      e.preventDefault()

    _initEventHandlers: ->
      ns = @options.namespace
      if @_isXHRUpload(@options)
        @options.dropZone.bind("dragover." + ns,
          fileupload: this
        , @_onDragOver).bind("drop." + ns,
          fileupload: this
        , @_onDrop).bind "paste." + ns,
          fileupload: this
        , @_onPaste
      @options.fileInput.bind "change." + ns,
        fileupload: this
      , @_onChange

    _destroyEventHandlers: ->
      ns = @options.namespace
      @options.dropZone.unbind("dragover." + ns, @_onDragOver).unbind("drop." + ns, @_onDrop).unbind "paste." + ns, @_onPaste
      @options.fileInput.unbind "change." + ns, @_onChange

    _setOption: (key, value) ->
      refresh = $.inArray(key, @_refreshOptionsList) isnt -1
      @_destroyEventHandlers()  if refresh
      $.Widget::_setOption.call this, key, value
      if refresh
        @_initSpecialOptions()
        @_initEventHandlers()

    _initSpecialOptions: ->
      options = @options
      if options.fileInput is `undefined`
        options.fileInput = (if @element.is("input:file") then @element else @element.find("input:file"))
      else options.fileInput = $(options.fileInput)  unless options.fileInput instanceof $
      options.dropZone = $(options.dropZone)  unless options.dropZone instanceof $

    _create: ->
      options = @options
      $.extend options, $(@element[0].cloneNode(false)).data()
      options.namespace = options.namespace or @widgetName
      @_initSpecialOptions()
      @_slots = []
      @_sequence = @_getXHRPromise(true)
      @_sending = @_active = @_loaded = @_total = 0
      @_initEventHandlers()

    destroy: ->
      @_destroyEventHandlers()
      $.Widget::destroy.call this

    enable: ->
      $.Widget::enable.call this
      @_initEventHandlers()

    disable: ->
      @_destroyEventHandlers()
      $.Widget::disable.call this

    add: (data) ->
      return  if not data or @options.disabled
      data.files = $.each($.makeArray(data.files), @_normalizeFile)
      @_onAdd null, data

    send: (data) ->
      if data and not @options.disabled
        data.files = $.each($.makeArray(data.files), @_normalizeFile)
        return @_onSend(null, data)  if data.files.length
      @_getXHRPromise false, data and data.context

((factory) ->
  "use strict"
  if typeof define is "function" and define.amd
    define [ "jquery" ], factory
  else
    factory window.jQuery
) ($) ->
  "use strict"
  counter = 0
  $.ajaxTransport "iframe", (options) ->
    if options.async and (options.type is "POST" or options.type is "GET")
      form = undefined
      iframe = undefined
      send: (_, completeCallback) ->
        form = $("<form style=\"display:none;\"></form>")
        iframe = $("<iframe src=\"javascript:false;\" name=\"iframe-transport-" + (counter += 1) + "\"></iframe>").bind("load", ->
          fileInputClones = undefined
          paramNames = (if $.isArray(options.paramName) then options.paramName else [ options.paramName ])
          iframe.unbind("load").bind "load", ->
            response = undefined
            try
              response = iframe.contents()
              throw new Error()  if not response.length or not response[0].firstChild
            catch e
              response = `undefined`
            completeCallback 200, "success",
              iframe: response

            $("<iframe src=\"javascript:false;\"></iframe>").appendTo form
            form.remove()

          form.prop("target", iframe.prop("name")).prop("action", options.url).prop "method", options.type
          if options.formData
            $.each options.formData, (index, field) ->
              $("<input type=\"hidden\"/>").prop("name", field.name).val(field.value).appendTo form
          if options.fileInput and options.fileInput.length and options.type is "POST"
            fileInputClones = options.fileInput.clone()
            options.fileInput.after (index) ->
              fileInputClones[index]

            if options.paramName
              options.fileInput.each (index) ->
                $(this).prop "name", paramNames[index] or options.paramName
            form.append(options.fileInput).prop("enctype", "multipart/form-data").prop "encoding", "multipart/form-data"
          form.submit()
          if fileInputClones and fileInputClones.length
            options.fileInput.each (index, input) ->
              clone = $(fileInputClones[index])
              $(input).prop "name", clone.prop("name")
              clone.replaceWith input
        )
        form.append(iframe).appendTo document.body

      abort: ->
        iframe.unbind("load").prop "src", "javascript".concat(":false;")  if iframe
        form.remove()  if form

  $.ajaxSetup converters:
    "iframe text": (iframe) ->
      $(iframe[0].body).text()

    "iframe json": (iframe) ->
      $.parseJSON $(iframe[0].body).text()

    "iframe html": (iframe) ->
      $(iframe[0].body).html()

    "iframe script": (iframe) ->
      $.globalEval $(iframe[0].body).text()

jQuery.extend
  put: (url, data, callback, type) ->
    _ajax_request url, data, callback, type, "PUT"

  delete: (url, data, callback, type) ->
    _ajax_request url, data, callback, type, "DELETE"


  backboneDelete: (@model) ->
    if confirm "Are you sure you want to delete this?"
        @model.destroy
          success: (model, res)->
            if res.success
              $(".index-row[data-id=#{model.id}]").fadeOut 300, ->
                $(this).remove()




