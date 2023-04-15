import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateBookValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.number([
        rules.required(),
        rules.exists({ table: 'books', column: 'id' })
      ])
    }),
    name: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255)
    ]),
    description: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255)
    ]),
    author_id: schema.number([
      rules.required(),
      rules.exists({ table: 'authors', column: 'id' })
    ]),
    category_id: schema.number([
      rules.required(),
      rules.exists({ table: 'categories', column: 'id' })
    ]),
    editorial_id: schema.number([
      rules.required(),
      rules.exists({ table: 'editorials', column: 'id' })
    ]),
    edit_token: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {
    'params.id.required': 'El campo id es obligatorio',
    'params.id.exists': 'El id debe existir en la tabla de libros',
    'name.required': 'El campo nombre es obligatorio',
    'name.maxLength': 'El máximo de caracteres para el campo nombre son 255',
    'description.required': 'El campo descripción es obligatorio',
    'description.maxLength': 'El máximo de caracteres para el campo descripción son 255',
    'author_id.required': 'El campo autor es obligatorio',
    'author_id.number': 'El autor debe ser de tipo número',
    'author_id.exists': 'El autor ingresado no existe',
    'category_id.required': 'El campo categoría es obligatorio',
    'category_id.number': 'El categoría debe ser de tipo número',
    'category_id.exists': 'El categoría ingresado no existe',
    'editorial_id.required': 'El campo editorial es obligatorio',
    'editorial_id.number': 'El editorial debe ser de tipo número',
    'editorial_id.exists': 'El editorial ingresado no existe',
    'edit_token.required': 'El campo token es obligatorio',
    'edit_token.maxLength': 'El máximo de caracteres para el campo token son 255'
  }
}
