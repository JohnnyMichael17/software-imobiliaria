'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProprietarioSchema extends Schema {
  up () {
    this.alter('proprietarios', (table) => {
      // alter table
      table.dropColumn('id_cliente_prorpietario')
      table.dropColumn('id_imovel')

      table.integer('cliente_id').notNullable().references('id').inTable('users')
      table.integer('imivei_id').notNullable().references('id').inTable('imoveis')
    })
  }

  down () {
    this.table('proprietarios', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ProprietarioSchema
