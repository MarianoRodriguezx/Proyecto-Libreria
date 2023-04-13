import Route from '@ioc:Adonis/Core/Route'

// AUTH

Route.group(() => {    
    Route.post('login', 'AuthController.login')
    Route.post('register', 'AuthController.register')
  })
  .namespace('App/Controllers/Http/Auth').prefix('api');
  
  Route.group(() => {    
    Route.post('logout', 'AuthController.logout')
    Route.get('profile', 'AuthController.profile')
  })
  .namespace('App/Controllers/Http/Auth').prefix('api').middleware(['auth'])