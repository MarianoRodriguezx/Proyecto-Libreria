import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateEditorialValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.number([
        rules.required(),
        rules.exists({ table: 'editorials', column: 'id' })
      ])
    }),
    name: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255)
    ]),
    location: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255)
    ]),
    edit_token: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {
    'params.id.required': 'El campo id es obligatorio',
    'params.id.exists': 'El id debe existir en la tabla de editoriales',
    'name.required': 'El campo nombre es obligatorio',
    'name.maxLength': 'El máximo de caracteres para el campo nombre son 255',
    'location.required': 'El campo ubicación es obligatorio',
    'location.maxLength': 'El máximo de caracteres para el campo ubicación son 255',
    'edit_token.required': 'El campo token es obligatorio',
    'edit_token.maxLength': 'El máximo de caracteres para el campo token son 255'
  }
}
