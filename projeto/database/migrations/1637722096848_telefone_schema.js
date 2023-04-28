'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TelefoneSchema extends Schema {
  up () {
    this.table('telefones', (table) => {
      table.integer("id")
      table.dropColumn('telefone')
      table.integer('numeroT')
      table.primary(['id'])
    })
  }

  down () {
    this.table('telefones', (table) => {
     table.dropColumn("id")
     table.dropColumn('numeroT')
    })
  }
}

module.exports = TelefoneSchema
