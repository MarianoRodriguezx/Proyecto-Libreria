import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
		id: this.ctx.params.id
	})

  public schema = schema.create({
    params: schema.object().members({
      id: schema.number([
        rules.required(),
        rules.exists({ table: 'users', column: 'id' })
      ])
    }),
    email: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255),
      rules.unique({ table: 'users', column: 'email',
      whereNot: {
        id: this.refs.id,
      } }),
      rules.email()
    ]),
    username: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255)
    ]),
    role: schema.number([
        rules.required()
    ]),
    edit_token: schema.string({trim: true}, [
      rules.required(),
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {
    'params.id.required': 'El campo id es obligatorio',
    'params.id.exists': 'El id debe existir en la tabla de usuarios',
    'email.required': 'El campo correo es obligatorio',
    'email.maxLength': 'El máximo de caracteres para el campo correo son 255',
    'email.unique': 'El correo ingresado no está disponible',
    'email.email': 'El correo ingresado no tiene formato válido',
    'username.required': 'El campo nombre es obligatorio',
    'username.maxLength': 'El máximo de caracteres para el campo nombre son 255',
    'role.required': 'El campo rol es obligatorio',
    'edit_token.required': 'El campo token es obligatorio',
    'edit_token.maxLength': 'El máximo de caracteres para el campo token son 255'
  }
}
