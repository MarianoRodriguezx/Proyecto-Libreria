/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Env from '@ioc:Adonis/Core/Env'


import Route from '@ioc:Adonis/Core/Route'
// Auth
import './modules/api/auth'
// Helpers
import './modules/api/mail'
import './modules/api/qr'
import './modules/api/file'
import './modules/api/token'
// Views
import './modules/view/auth'
// Catalogs
import './modules/view/catalogs/category'
import './modules/view/catalogs/book'
import './modules/view/catalogs/author'
import './modules/view/catalogs/editorial'
import './modules/view/catalogs/user'

const isPrivate = Env.get('IS_PRIVATE')


/* Route.get('/', async ({ view }) => {
  return view.render('welcome')
  return view.render('pages/page_login')
}) */

Route.get('/dashboard', async ({ view, auth }) => {
  const data = {
    isPrivate: isPrivate,
    role: auth.user?.role
  }
  return view.render('pages/dashboard', data)  
}).middleware(['auth', 'verifyUser'])

Route.on('/').redirect('/login')

Route.get('/not-found', async ({ view }) => {
  return view.render('errors/not-found')  
})

/* Route.get('/dashboard',async ({ view }) => {
  return view.render('pages/dashboard')
}) */

// TEST

Route.get('/test', async ({ response }) => {
  return response.ok({data: 'funciona'});
})
