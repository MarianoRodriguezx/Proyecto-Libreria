/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column()
  public status: boolean

  @column()
  public verified: boolean

  @column()
  public role: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  // General Variables

  static get login () {
    return [
      'password',
      'email'
    ]
  }

  static get register () {
    return [
      'password',
      'email',
      'username',
      'role'
    ]
  }

  static get NORMAL () {
    return {
      id: 1,
      code: 'NORMAL'
    }
  }

  static get SUPERVISOR () {
    return {
      id: 2,
      code: 'SUPERVISOR'
    }
  }

  static get ADMIN () {
    return {
      id: 3,
      code: 'ADMIN'
    }
  }

  static get roles () {
    return [
      this.NORMAL,
      this.SUPERVISOR,
      this.ADMIN
    ]
  }

  static get privateAccess () {
    return [
      this.ADMIN.id, 
      this.SUPERVISOR.id
    ]
  }

  static get publicAccess () {
    return [
      this.NORMAL.id, 
      this.SUPERVISOR.id
    ]
  }

}
