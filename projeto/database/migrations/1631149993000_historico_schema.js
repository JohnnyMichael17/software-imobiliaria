'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class historicoSchema extends Schema {
  up () {
    this.create('historioco', (table) => {
      table.increments()
      table.integer('num_contrato').notNullable()
      table.date('data_tr')
      table.string('tipo_trans', 10)
      table.integer('id_funcionario', 14).notNullable().references('id').inTable('funcionarios')
      table.integer('id_cliente_prorpietario', 14).notNullable().references('id').inTable('users')
      table.integer('id_cliente_usuario', 14).notNullable().references('id').inTable('pessoas')
      table.integer('id_imovel', 5).notNullable().references('id').inTable('imoveis')
      table.decimal('valor_operacao_imovel')
      table.decimal('valor_real')
      table.string('forma_pagamento', 10)
      table.timestamps()
    })
  }

  down () {
    this.drop('historico')
  }
}

module.exports = historicoSchema
