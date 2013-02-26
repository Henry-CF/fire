load 'application'

before 'load user', ->
  compound.models.User.findById params.id, (err, user) =>
      if err
        console.log err
      else if user
          @user = user
          next()
      else
          res.json error: 'User does not exist'

, only: ['show', 'edit', 'update', 'destroy']


action 'index', -> 
  compound.models.User.all (err, users) -> 
    @title = 'Users Index'
    @users = users
    render()

###
action 'show', -> 
  res.json @user
###

action 'new', ->
  @title = 'New User'
  @user = new compound.models.User
  render()

action 'edit', ->
  @title = "Edit #{@user.id}"
  render()

action 'create', ->
  @title = 'New User'
  if body.password isnt body['password-check']
    flash 'error', 'passwords did not match'
    delete body.password
    delete body['password-check']
    render 'new', user: body
  else
    @user = new compound.models.User body
    @user.bcrypt (err, user)=>
      if err 
        flash 'error', 'problem 754 occured while creating the user'
        render 'new', user: body

      else
        @user.save (err, user) =>
            if not err
                redirect path_to.users()         
                next()
            else
                flash 'error', 'problem 750 occured while creating the user'
                render 'new', user: body

action 'update', ->
  @user.set body
  @user.save (err, user) =>
      if err
        flash 'error', 'a problem occured while updating the user'
        render 'edit',
          user: body
        next()
      else
        flash 'info', 'user was updated'
        redirect path_to.users()
        next()
            
           
action 'destroy', ->
  @user.remove (err) =>
    if err
      flash 'error', 'a problem occured while deleting the user'
    else
      flash 'info', 'user was deleted'
    res.send "'" + path_to.users() + "'"
    next()
        