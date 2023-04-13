/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  /* protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  } */

  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    /**
     * Self handle the validation exception
     */
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(400).send({
        status: false,
        message: 'Error de validación',
        data: error.messages
      }) //error.messages
      
    }

    if (+error.status === 500) {
      return ctx.response.status(500).send({
        status: false,
        message: 'Error interno en el servidor. Contacta a soporte para continuar.',
        data: error
      })
    }

    if (error.code === 'E_ROUTE_NOT_FOUND') {
      return ctx.response.redirect('/not-found') 
    }

    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(error, ctx)
  }

}
