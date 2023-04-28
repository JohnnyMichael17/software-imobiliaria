'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImoveiSchema extends Schema {
  up () {
    this.create('imoveis', (table) => {
      table.increments()
      table.integer('cliente_id').references('id').inTable('clientes')
      table.integer('area').notNullable()
      table.decimal('valor_loc').unsigned()
      table.decimal('valor_vend').unsigned()
      table.date('data_const').notNullable()
      table.string('end_foto',126)
      table.string('situacao',33)
      table.timestamps()
    })
  }

  down () {
    this.drop('imoveis')
  }
}

module.exports = ImoveiSchema
