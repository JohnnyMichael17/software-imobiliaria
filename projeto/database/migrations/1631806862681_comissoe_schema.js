'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComissoeSchema extends Schema {
  up () {
    this.alter('comissoes', (table) => {
      // alter table
      table.dropColumn('data_trans')
      table.integer('num_contrato').references('id').inTable('transacoes').alter()
    })
  }

  down () {
    this.table('comissoes', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ComissoeSchema
