module.exports = (ele)->
	fields = {}
	#Manipulate Form data to interface with RailwayJS JSON server
	for key in $(ele).serializeArray()
		do (key) ->
			unless key.value is 'undefined' or key.value is null
				fields[key.name] = key.value
	fields