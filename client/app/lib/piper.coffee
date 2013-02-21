module.exports = class Piper
	constructor: (@self)->
		if @self

			if @self instanceof Array
				@length = @self.length
				@self = @self.join('|')

		else
			@self = ''
			@length = 0

	toArray: =>
		if @self is "" then return [] else @self.split('|');

	toString: =>
		@self

	push: (val)=>
		length++
		if @self is '' then @self = val else @self+="|#{val}"
