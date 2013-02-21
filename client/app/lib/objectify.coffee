module.exports = (ele)->
	fields = {}
	#Manipulate Form data to interface with RailwayJS JSON server
	for key, value in $(ele).serializeArray()
			fields[key.name] = key.value if key.value
	fields
