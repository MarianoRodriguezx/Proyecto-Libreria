import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreBookValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255)
    ]),
    description: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(1000)
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
    image_file: schema.file({
      size: '10mb',
      extnames: ['jpg', 'jpeg' ,'gif', 'png'],
    }, [
        rules.required()
    ]),
    pdf_file: schema.file({
      size: '50mb',
      extnames: ['pdf'],
    }, [
        rules.required()
    ])
  })

  public messages: CustomMessages = {
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
    'image_file.required': 'La imagen es obligatorio',
    'image_file.size': 'La imagen no debe tener un tamaño mayor a 10mb',
    'image_file.extnames': 'La imagen no es un formato de imagen válido',
    'pdf_file.required': 'El pdf es obligatorio',
    'pdf_file.size': 'El pdf no debe tener un tamaño mayor a 50mb',
    'pdf_file.extnames': 'El pdf no es un formato de imagen válido',
  }
}
