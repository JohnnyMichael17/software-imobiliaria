'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoPessoaSchema extends Schema {
  up () {
    this.table('endereco_pessoa', (table) => {
      // alter table
      table.dropColumn('id_pessoa')
      table.integer('pessoa_id').references('id').inTable('pessoas').notNullable()
    })
  }

  down () {
    this.table('endereco_pessoa', (table) => {
      // reverse alternations
    })
  }
}

module.exports = EnderecoPessoaSchema
