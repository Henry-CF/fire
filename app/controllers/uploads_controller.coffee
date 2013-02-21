fs = require 'fs'



action 'initialize', ->
  
  unless compound.app.uploads
    compound.app.uploads = {}

  compound.app.uploads[params.name] = #Create a new Entry in The compound.app.files Variable
      filesize: params.size
      data: ""
      downloaded: 0
      db_data: params

  compound.app.uploads[params.name].db_data.client = req.session

  place = 0
  
  try
    Stat = fs.statSync(app.root+"/tmp/" + Name)
    if Stat.isFile()
      compound.app.uploads[params.name]["downloaded"] = Stat.size
      place = Stat.size / 524288
  
  #It's a New File
  
  fs.open compound.app.root+ "/tmp/" + params.name, "a", 0o0755, (err, fd) =>
  
    if err
      if err.errno is 50 then compound.app.io.sockets.emit 'image:message', 'permissions error'
    else
      compound.app.uploads[params.name]["handler"] = fd #We store the file handler so we can write to it later
      
      socket().emit 'moar', {
        place: place
        percent: 0
        name: params.name
      }


action 'upload', ->
   
   compound.app.uploads[params.name].downloaded += params.data.length
   compound.app.uploads[params.name].data += params.data

   if compound.app.uploads[params.name].downloaded is compound.app.uploads[params.name].filesize
        fs.write compound.app.uploads[params.name].handler, compound.app.uploads[params.name].data, null, "Binary", (err, written)=>
            socket().emit 'uploaded',
                name: params.name
                success: yes
            @image = compound.app.uploads[params.name].db_data
            delete compound.app.uploads[params.name]
            next()

    else if compound.app.uploads[params.name].data.length > 10485760 # data reached buffer limit
        fs.write compound.app.uploads[params.name].handler, compound.app.uploads[params.name].data, null, "Binary", (err, written)->
            compound.app.uploads[params.name].data = '' # reset buffer
            place = compound.app.uploads[params.name].downloaded / 524288
            percent = compound.app.uploads[params.name].downloaded / compound.app.uploads[params.name].filesize * 100
            socket().emit 'moar', {
              place: place
              percent: 0
              name: params.name
            }

    else
        place = compound.app.uploads[params.name].downloaded / 524288
        percent = compound.app.uploads[params.name].downloaded / compound.app.uploads[params.name].filesize * 100
        socket().emit 'moar', {
          place: place
          percent: 0
          name: params.name
        }

after 'initiate s3admix', ->
    compound.app.s3.addImage @image
, only: ['upload']