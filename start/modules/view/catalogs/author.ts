import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('authors', 'AuthorsController')    
    Route.get('get/active/authors', 'AuthorsController.getActiveAuthors')
    
})
.namespace('App/Controllers/Http/Catalogs')
.middleware(['auth'])