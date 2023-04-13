import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255),
      rules.email()
    ]),
    password: schema.string({trim: true}, [
        rules.required(),
        rules.maxLength(180)
    ])
  })

  public messages: CustomMessages = {
    'email.required': 'El campo correo es obligatorio',
    'email.maxLength': 'El máximo de caracteres para el campo correo son 255',
    'email.unique': 'El correo ingresado no está disponible',
    'email.email': 'El correo ingresado no tiene formato válido',
    'password.required': 'El campo contraseña es obligatorio',
    'password.maxLength': 'El máximo de caracteres para el campo contraseña son 180',
  }
}
