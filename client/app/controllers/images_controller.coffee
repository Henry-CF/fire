Controller = require 'controllers/base/controller'
mediate = require 'mediator'

Gallery_View = require 'views/images/images_gallery'

Uploader_View = require 'views/images/images_uploader'

Images = require 'models/images'
Image = require 'models/image'

module.exports = class ImagesController extends Controller
	initialize: ->

	gallery: ->
		@view = new Gallery_View collection: new Images()

	upload: ->
		@view = new Uploader_View()

	