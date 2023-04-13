import Route from '@ioc:Adonis/Core/Route'

// AUTH

Route.group(() => {    
    Route.get('sendMail', 'MailController.sendMail').as('sendMail')
    Route.post('submitCode', 'MailController.submitCode').as('submitCode')
  })
  .namespace('App/Controllers/Http/Helpers');