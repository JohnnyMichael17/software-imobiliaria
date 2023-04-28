'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransacoeSchema extends Schema {
  up () {
    this.alter('transacoes', (table) => {
      // alter table
      table.dropColumn('id_funcionario')
      table.dropColumn('id_cliente_prorpietario')
      table.dropColumn('id_cliente_usuario')
      table.dropColumn('id_imovel')

      table.integer('funcionario_id').notNullable().references('id').inTable('funcionarios')
      table.integer('cliente_prorpietario_id').notNullable().references('id').inTable('clientes')
      table.integer('cliente_usuario_id').notNullable().references('id').inTable('clientes')
      table.integer('imovei_id').references('id').inTable('imoveis')
    })
  }

  down () {
    this.table('transacoes', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TransacoeSchema
