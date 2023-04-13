import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {    
    Route.get('sendMail', 'MailController.sendMail').as('sendMail')
  })
  .namespace('App/Controllers/Http/Helpers').middleware(['auth', 'signedRoute']);

Route.group(() => {    
    Route.post('submitCode', 'MailController.submitCode').as('submitCode')
  })
  .namespace('App/Controllers/Http/Helpers').middleware(['auth']);