import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {    
    Route.post('generate/token', 'GeneratedTokensController.generateToken').as('generateToken')
  })
  .namespace('App/Controllers/Http/Tokens').middleware(['auth']);;

  Route.group(() => {    
    Route.post('generate/token/f/edit', 'GeneratedTokensController.forceTokenEdit').as('forceTokenEdit')
    Route.post('generate/token/f/delete', 'GeneratedTokensController.forceTokenDelete').as('forceTokenDelete')
  })
  .namespace('App/Controllers/Http/Tokens');