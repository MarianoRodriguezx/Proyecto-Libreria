/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from '../User'
import Author from './Author'
import Category from './Category'
import Editorial from './Editorial'

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

  // Relations
  @hasOne(() => User,{
    foreignKey: "id",
    localKey: "posted_by",
  })
  public postedBy: HasOne<typeof User>

  @hasOne(() => Author,{
    foreignKey: "id",
    localKey: "author_id",
  })
  public author: HasOne<typeof Author>

  @hasOne(() => Category,{
    foreignKey: "id",
    localKey: "category_id",
  })
  public category: HasOne<typeof Category>

  @hasOne(() => Editorial,{
    foreignKey: "id",
    localKey: "editorial_id",
  })
  public editorial: HasOne<typeof Editorial>

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
