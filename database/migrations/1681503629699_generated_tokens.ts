import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'generated_tokens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('generated_by').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('used_email', 255).nullable()
      table.string('token', 255).notNullable()
      table.string('linked_table', 255).nullable()
      table.integer('type').notNullable(); // 1 Edit, 2 Delete
      table.boolean('status').notNullable().defaultTo(true) // true disponible, false usado
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
