/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from '../User'

export default class GeneratedToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public generated_by: number

  @column()
  public used_email: string

  @column()
  public token: string

  @column()
  public linked_table: string

  @column()
  public type: number

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => User,{
    foreignKey: "id",
    localKey: "generated_by",
  })
  public generatedBy: HasOne<typeof User>

  static get EDIT () {
    return {
      id: 1,
      code: 'EDIT',
      role: User.SUPERVISOR.id
    }
  }

  static get DELETE () {
    return {
      id: 2,
      code: 'DELETE',
      roles: User.ADMIN.id
    }
  }

}
