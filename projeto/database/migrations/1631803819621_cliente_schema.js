'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteSchema extends Schema {
  up () {
    this.alter('clientes', (table) => {
      // alter table
      table.dropColumn('pessoas_id')
      table.integer('pessoa_id').references('id').inTable('pessoas').notNullable()
    })
  }

  down () {
    this.table('clientes', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ClienteSchema
