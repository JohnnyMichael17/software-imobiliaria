'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pessoa extends Model {
    endereco (){
        return this.belongsTo('App/Models/Endereco_pessoa')
    }
    telefone (){
        return this.hasOne('App/Models/Telefone')
    }
}

module.exports = Pessoa
