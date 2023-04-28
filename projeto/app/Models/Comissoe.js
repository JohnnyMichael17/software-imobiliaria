'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comissoe extends Model {
    funcionarios (){
    return this.belongsTo('App/Models/Funcionario')
    }
    transacoes (){
    return this.belongsTo('App/Models/transacoe')
    }
}

module.exports = Comissoe
