'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class proprietarioSchema extends Schema {
  up() {
    this.create('proprietarios', (table) => {
      table.increments()
      table.integer('id_cliente_prorpietario', 14).notNullable().references('id').inTable('users')
      table.integer('id_imovel', 5).notNullable().references('id').inTable('imoveis')
      table.timestamps()
    })
  }

  down() {
    this.drop('proprietarios')
  }
}

module.exports = proprietarioSchema