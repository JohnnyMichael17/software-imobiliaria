'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComerciaiSchema extends Schema {
  up () {
    this.create('comerciais', (table) => {
      table.integer('id').references('id').inTable('imoveis')
      table.integer('qtd_banheiros').notNullable()
      table.integer('qtd_comodos').notNullable()
      table.primary(['id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('comerciais')
  }
}

module.exports = ComerciaiSchema
