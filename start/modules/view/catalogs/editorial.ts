import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('editorials', 'EditorialsController')    
    Route.get('get/active/editorials', 'EditorialsController.getActiveEditorials')
    
})
.namespace('App/Controllers/Http/Catalogs')
.middleware(['auth', 'verifyUser'])