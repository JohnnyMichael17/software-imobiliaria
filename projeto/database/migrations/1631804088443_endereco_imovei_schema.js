'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoImoveiSchema extends Schema {
  up () {
    this.alter('endereco_imoveis', (table) => {
      // alter table
      table.dropColumn('imovel_id')
      table.integer('imovei_id').references('id').inTable('imoveis')
    })
  }

  down () {
    this.table('endereco_imoveis', (table) => {
      // reverse alternations
    })
  }
}

module.exports = EnderecoImoveiSchema
