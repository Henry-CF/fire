action 'login', () -> 
  @layout = 'auth'
  render
      title: "Login"
  next()

action 'verify', () ->

  # find user
  compound.models.User.findByEmail req.body.email, (err, user)->
    
    # user exits
    if user
      user.authenticate req.body.password, (err, authenticated)->
        
        # some sort of database error occured
        if err 
          flash 'error', "an error occured during authentication"
          redirect path_to.login
          next()

        # user passed authentication
        if authenticated is yes
          req.session.user = user.id
          redirect path_to.root
          next()

        # user did not pass authentication
        else
          flash 'error', 'incorrect credentials'
          redirect path_to.login
          next()

    # user does not exist
    else
      flash 'error', 'unknown user'
      redirect path_to.login
      next()


action 'logout', () -> 
  req.session.regenerate (err) ->
    if err 
      console.log err
      flash 'error', 'Database Issue!'
      redirect path_to.login
      next()
    else
      flash 'info', 'Logged Out!'
      redirect path_to.login
      next()