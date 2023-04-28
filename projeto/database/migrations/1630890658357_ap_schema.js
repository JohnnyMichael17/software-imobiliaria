'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ApSchema extends Schema {
  up () {
    this.create('aps', (table) => {
      table.integer('id').references('id').inTable('imoveis')
      table.integer('qtd_comodos')
      table.integer('qtd_suites')
      table.integer('qtd_salas_estar')
      table.integer('qtd_salas_jantar')
      table.integer('num_vagas_garagem')
      table.boolean('armario_imbutido')
      table.text('descricao').notNullable()
      table.integer('andar').notNullable()
      table.decimal('valor_condo').notNullable()
      table.boolean('portaria_24hrs').notNullable()
      table.primary(['id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('aps')
  }
}

module.exports = ApSchema
