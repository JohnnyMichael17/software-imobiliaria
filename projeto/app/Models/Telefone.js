'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Telefone extends Model {
    proprietario(){
        return this.belongsTo('App/Models/Pessoa')
    }

}

module.exports = Telefone
