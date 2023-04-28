'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TerrenoSchema extends Schema {
  up () {
    this.create('terrenos', (table) => {
      table.integer('id').references('id').inTable('imoveis')
      table.integer('largura').notNullable()
      table.integer('comprimeto').notNullable()
      table.string('nivel',10).notNullable()
      table.primary(['id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('terrenos')
  }
}

module.exports = TerrenoSchema
