'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class comissoeSchema extends Schema {
  up () {
    this.create('comissoes', (table) => {
      table.increments()
      table.integer('funcionario_id').notNullable().unsigned().references('id').inTable('funcionarios')
      table.integer('num_contrato')
      table.date('data_trans')
      table.decimal('valor').notNullable()
      //table.primary(['1', '2'])
      table.timestamps()
    })
  }

  down () {
    this.drop('comissoes')
  }
}

module.exports = comissoeSchema
