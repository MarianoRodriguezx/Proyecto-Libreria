/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string


  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  static get store () {
    return [
      'name'
    ]
  }

  static get update () {
    return this.store
  }

}
