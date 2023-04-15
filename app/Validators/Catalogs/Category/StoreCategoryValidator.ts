import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'El campo nombre es obligatorio',
    'name.maxLength': 'El máximo de caracteres para el campo nombre son 255'
  }
}
