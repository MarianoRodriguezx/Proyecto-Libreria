import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('categorias', 'CategoriesController')    
    // Route.get('get/active/categories', 'CategoriesController.getActiveCategories')
})
.namespace('App/Controllers/Http/Catalogs')
.middleware(['auth'])