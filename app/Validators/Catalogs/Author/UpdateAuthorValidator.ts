import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateAuthorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.number([
        rules.required(),
        rules.exists({ table: 'authors', column: 'id' })
      ])
    }),
    name: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255)
    ]),
    nationality: schema.string({trim: true}, [
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
    'params.id.exists': 'El id debe existir en la tabla de autores',
    'name.required': 'El campo nombre es obligatorio',
    'name.maxLength': 'El máximo de caracteres para el campo nombre son 255',
    'edit_token.required': 'El campo token es obligatorio',
    'edit_token.maxLength': 'El máximo de caracteres para el campo token son 255',
    'nationality.required': 'El campo nacionalidad es obligatorio',
    'nationality.maxLength': 'El máximo de caracteres para el campo nacionalidad son 255'
  }
}
