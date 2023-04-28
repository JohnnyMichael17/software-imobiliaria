'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PessoaSchema extends Schema {
  up () {
    this.alter('pessoas', (table) => {
      table.dropColumn('name')
      table.string('nome').notNullable()
      // alter table
    })
  }

  down () {
    this.table('pessoas', (table) => {
      // reverse alternations
    })
  }
}

module.exports = PessoaSchema
