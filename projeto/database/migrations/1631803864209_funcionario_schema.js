'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FuncionarioSchema extends Schema {
  up () {
    this.alter('funcionarios', (table) => {
      // alter table
      table.dropColumn('pessoas_id')
      table.integer('pessoa_id').references('id').inTable('pessoas').notNullable()
    })
  }

  down () {
    this.table('funcionarios', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FuncionarioSchema
