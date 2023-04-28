'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoImoveiSchema extends Schema {
  up () {
    this.create('endereco_imoveis', (table) => {
      table.increments()
      table.integer('imovel_id').references('id').inTable('imoveis')
      table.string('bairro',256).notNullable()
      table.string('logadouro',256).notNullable()
      table.string('numero',10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('endereco_imoveis')
  }
}

module.exports = EnderecoImoveiSchema
