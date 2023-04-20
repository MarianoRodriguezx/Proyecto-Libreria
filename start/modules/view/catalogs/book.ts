import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('books', 'BooksController')    
    Route.get('all/books', 'BooksController.getActiveBooks')
    Route.put('books/update/cover/:id', 'BooksController.updateCover')
    Route.put('books/update/pdf/:id', 'BooksController.updatePdf')
})
.namespace('App/Controllers/Http/Catalogs')
.middleware(['auth', 'verifyUser'])