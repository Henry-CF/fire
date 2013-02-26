before 'verify user', ->
  if req.session.user
    next()
  else
    redirect path_to.login()