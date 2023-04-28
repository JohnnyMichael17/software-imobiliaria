'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Funcionario extends Model {

    pessoas() {
        return this.belongsTo('App/Models/Pessoa')
    }
    cargos() {
        return this.belongsTo('App/Models/Cargo')
    }
    
}

module.exports = Funcionario
