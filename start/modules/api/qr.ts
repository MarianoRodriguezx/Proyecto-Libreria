import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {    
    Route.get('generate/qr', 'QRController.generateQR').as('generateQR')
  })
  .namespace('App/Controllers/Http/Helpers').middleware(['auth']);