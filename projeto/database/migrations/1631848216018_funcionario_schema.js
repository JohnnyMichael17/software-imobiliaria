'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FuncionarioSchema extends Schema {
  up () {
    this.alter('funcionarios', (table) => {
      // alter table
      table.dropColumn('cargos_id')
      table.integer('cargo_id').references('id').inTable('cargos')
    })
  }

  down () {
    this.table('funcionarios', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FuncionarioSchema
