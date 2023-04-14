import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {    
    Route.get('generate/qr', 'QRController.generateQR').as('generateQR')
  })
  .namespace('App/Controllers/Http/Helpers').middleware(['auth', 'signedRoute']);

  Route.group(() => {    
    Route.post('submit/qr', 'QRController.submitQR').as('submitQR')
  })
  .namespace('App/Controllers/Http/Helpers').middleware(['auth']);


  Route.group(() => {    
    Route.post('force/qr', 'QRController.forceQr').as('forceQr')
  })
  .namespace('App/Controllers/Http/Helpers');