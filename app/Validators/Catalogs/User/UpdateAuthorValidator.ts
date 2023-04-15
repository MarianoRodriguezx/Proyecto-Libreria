import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255),
      rules.unique({ table: 'users', column: 'email' }),
      rules.email()
    ]),
    username: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255)
    ]),
    role: schema.number([
        rules.required()
    ]),
  })

  public messages: CustomMessages = {
    'email.required': 'El campo correo es obligatorio',
    'email.maxLength': 'El máximo de caracteres para el campo correo son 255',
    'email.unique': 'El correo ingresado no está disponible',
    'email.email': 'El correo ingresado no tiene formato válido',
    'username.required': 'El campo nombre es obligatorio',
    'username.maxLength': 'El máximo de caracteres para el campo nombre son 255',
    'role.required': 'El campo rol es obligatorio',
  }
}
