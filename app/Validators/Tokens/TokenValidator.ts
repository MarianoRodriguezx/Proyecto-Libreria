import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TokenValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    edit_token: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {
    'edit_token.required': 'El campo correo es obligatorio',
    'edit_token.maxLength': 'El máximo de caracteres para el campo correo son 255'
  }
}
