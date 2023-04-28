'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteSchema extends Schema {
  up() {
    this.create('clientes', (table) => {
      table.increments()
      table.integer('pessoas_id').references('id').inTable('pessoas')
      table.string('estado_civil', 14).notNullable()
      table.string('profissao', 256)
      table.timestamps()
    })
  }
  down() {
    this.drop('clientes')
  }
}

module.exports = ClienteSchema