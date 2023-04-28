'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PessoaSchema extends Schema {
  up() {
    this.create('pessoas', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('cpf', 14).notNullable().unique()
      table.string('sexo', 1).notNullable()
      table.timestamps()
    })
  }
  down() {
    this.drop('pessoas')
  }
}

module.exports = PessoaSchema