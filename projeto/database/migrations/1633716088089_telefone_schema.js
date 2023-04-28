'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TelefoneSchema extends Schema {
  up () {
    this.table('telefones', (table) => {
      // alter table
      table.dropColumn('id_pessoa')
      table.integer('pessoa_id').references('id').inTable('pessoas').notNullable()
      table.primary(['pessoa_id', 'telefone'])
    })
  }

  down () {
    this.table('telefones', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TelefoneSchema
