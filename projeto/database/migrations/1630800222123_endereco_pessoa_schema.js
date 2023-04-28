'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EndereçoPessoaSchema extends Schema {
  up() {
    this.create('endereco_pessoa', (table) => {
      table.increments()
      table.integer('id_pessoa').notNullable().references('id').inTable('pessoas')
      table.string('logadouro', 256).notNullable()
      table.string('numero', 10).notNullable()
      table.string('bairro', 256).notNullable()
      table.timestamps()
    })
  }
  down() {
    this.drop('endereco_pessoa')
  }
}

module.exports = EndereçoPessoaSchema