import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {    
    Route.post('upload/image', 'FilesController.uploadImage').as('uploadImage')
    Route.post('get/image', 'FilesController.getImage').as('getImage')
    Route.post('upload/pdf', 'FilesController.uploadPDF').as('uploadPDF')
    Route.post('get/pdf', 'FilesController.getPDF').as('getPDF')
  })
  .namespace('App/Controllers/Http/Helpers');