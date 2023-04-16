import Route from '@ioc:Adonis/Core/Route'

// AUTH

Route.group(() => {    
    Route.post('login', 'AuthController.login').as('login')
    // Route.post('register', 'AuthController.register')
  })
  .namespace('App/Controllers/Http/Auth').prefix('api');
  
  Route.group(() => {    
    Route.post('logout', 'AuthController.logout')
  })
  .namespace('App/Controllers/Http/Auth').middleware(['auth'])

  Route.group(() => {    
    Route.get('profile', 'AuthController.profile')
  })
  .namespace('App/Controllers/Http/Auth').middleware(['auth', 'verifyUser'])