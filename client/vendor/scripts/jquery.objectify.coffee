$.fn.objectify = ->
  fields = {}
  # Manipulate Form data to interface with RailwayJS JSON server

  for key, value in @serializeArray()
    if key.value isnt "undefined" and key.value isnt ''
      if key.value then fields[key.name] = key.value
  fields