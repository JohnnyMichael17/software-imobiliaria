'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.dropColumn('pessoas_id')
      table.integer('pessoa_id').references('id').inTable('pessoas').notNullable()
      // alter table
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations

    })
  }
}

module.exports = UserSchema
