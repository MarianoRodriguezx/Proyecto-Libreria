import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', async ({ view, auth, response }) => {
    return !auth.use('web').isLoggedIn ? view.render('pages/page_login') : response.redirect('/dashboard') 
  }).middleware(['silenthAuth'])