import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', async ({ response }) => {
    return response.badRequest({data: 'Inicia sesión plis'});
    // Esta ruta debe redirigir al login (la vista)
  })