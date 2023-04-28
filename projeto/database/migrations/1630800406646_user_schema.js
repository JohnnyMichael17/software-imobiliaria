'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.integer('pessoas_id').references('id').inTable('pessoas')
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('permissao', 20).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema