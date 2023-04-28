'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TelefoneSchema extends Schema {
  up() {
    this.create('telefones', (table) => {
      table.integer('id_pessoa').notNullable().unique().unsigned().references('id').inTable('pessoas')
      table.string('telefone', 24).notNullable()
      table.string('tipoNumero', 15).notNullable()
      table.primary(['id_pessoa', 'telefone'])
      table.timestamps()
    })
  }
  down() {
    this.drop('telefone')
  }
}

module.exports = TelefoneSchema
