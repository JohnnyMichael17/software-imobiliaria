'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProprietarioSchema extends Schema {
  up () {
    this.table('proprietarios', (table) => {
      // alter table
      table.dropColumn('cliente_id')
    
    })
  }

  down () {
    this.table('proprietarios', (table) => {
      // reverse alternations
      table.integer('cliente_id').notNullable().references('id').inTable('users')
    })
  }
}

module.exports = ProprietarioSchema
