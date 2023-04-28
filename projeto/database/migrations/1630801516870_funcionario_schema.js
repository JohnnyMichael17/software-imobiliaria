'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FuncionarioSchema extends Schema {
  up() {
    this.create('funcionarios', (table) => {
      table.increments()
      table.integer('pessoas_id').references('id').inTable('pessoas')
      table.string('data_ingresso', 256).notNullable()
      table.integer('cargos_id').references('id').inTable('cargos')
      table.timestamps()
    })
  }

  down() {
    this.drop('funcionarios')
  }
}

module.exports = FuncionarioSchema