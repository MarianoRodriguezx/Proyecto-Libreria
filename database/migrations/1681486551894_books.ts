import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.text('description').notNullable()
      table.string('book_path', 255).notNullable()
      table.string('cover_path', 255).notNullable()
      table.boolean('status').notNullable().defaultTo(true)
      table.integer('posted_by').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('author_id').unsigned().references('id').inTable('authors').onDelete('CASCADE')
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE')
      table.integer('editorial_id').unsigned().references('id').inTable('editorials').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
