'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistoricoSchema extends Schema {
  up () {
    this.schema.dropTable('historioco')
    this.create('historicos', (table) => {
      table.increments()
      table.integer('num_contrato').notNullable()
      table.date('data_tr')
      table.string('tipo_trans', 10)
      table.integer('funcionario_id').notNullable().references('id').inTable('funcionarios')
      table.integer('cliente_prorpietario_id').notNullable().references('id').inTable('clientes')
      table.integer('cliente_usuario_id').notNullable().references('id').inTable('clientes')
      table.integer('imovei_id').notNullable().references('id').inTable('imoveis')
      table.decimal('valor_operacao_imovel')
      table.decimal('valor_real')
      table.string('forma_pagamento', 10)
      table.timestamps()
    })
  }

  down () {
    this.drop('historicos')
  }
}

module.exports = HistoricoSchema
