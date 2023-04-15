import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('books', 'BooksController')    
    Route.get('get/active/books', 'BooksController.getActiveBooks')
    
})
.namespace('App/Controllers/Http/Catalogs')
//.middleware(['auth'])