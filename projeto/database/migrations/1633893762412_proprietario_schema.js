'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProprietarioSchema extends Schema {
  up () {
    this.table('proprietarios', (table) => {
      // alter table
      table.integer('cliente_id').references('id').inTable('clientes').notNullable()
    })
  }

  down () {
    this.table('proprietarios', (table) => {
      // reverse alternations
      table.dropColumn('cliente_id')
    })
  }
}

module.exports = ProprietarioSchema
