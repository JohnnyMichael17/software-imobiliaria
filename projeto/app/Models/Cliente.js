'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cliente extends Model {
    pessoas() {
        return this.belongsTo('App/Models/Pessoa')
    }

    
}

module.exports = Cliente
