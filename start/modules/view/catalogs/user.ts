import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('users', 'UsersController')    
    Route.get('get/active/users', 'UsersController.getActiveUsers')
    
})
.namespace('App/Controllers/Http/Catalogs')
.middleware(['auth', 'adminRole'])