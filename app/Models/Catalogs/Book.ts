/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public book_path: string

  @column()
  public cover_path: string

  @column()
  public status: boolean

  @column()
  public posted_by: number

  @column()
  public author_id: number

  @column()
  public category_id: number

  @column()
  public editorial_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  static get store () {
    return [
      'name',
      'description',
      'author_id',
      'category_id',
      'editorial_id'
    ]
  }

  static get update () {
    return this.store
  }
}
