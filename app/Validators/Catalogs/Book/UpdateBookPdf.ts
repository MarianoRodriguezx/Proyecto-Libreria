import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateBookPdf {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.number([
        rules.required(),
        rules.exists({ table: 'books', column: 'id' })
      ])
    }),
    image_file: schema.file({
      size: '10mb',
      extnames: ['jpg', 'jpeg' ,'gif', 'png'],
    }, [
        rules.required()
    ]),
    edit_token: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {
    'params.id.required': 'El campo id es obligatorio',
    'params.id.exists': 'El id debe existir en la tabla de libros',
    'edit_token.required': 'El campo token es obligatorio',
    'edit_token.maxLength': 'El máximo de caracteres para el campo token son 255'
  }
}
