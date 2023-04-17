import Route from '@ioc:Adonis/Core/Route'

// AUTH

Route.group(() => {    
    Route.post('login', 'AuthController.login').as('login')
    // Route.post('register', 'AuthController.register')
  })
  .namespace('App/Controllers/Http/Auth').prefix('api');
  
  Route.group(() => {    
    Route.post('logout', 'AuthController.logout')
    Route.post('get/role', 'AuthController.getRole')
  })
  .namespace('App/Controllers/Http/Auth').middleware(['auth'])

  Route.group(() => {    
    Route.get('profile', 'AuthController.profile')
    Route.get('change-password', 'AuthController.changePassword')
    Route.post('update-password', 'AuthController.updatePassword')
  })
  .namespace('App/Controllers/Http/Auth').middleware(['auth', 'verifyUser'])