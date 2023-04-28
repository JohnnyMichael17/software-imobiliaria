'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Historico extends Model {
    cliente_prop(){
        return this.belongsTo('App/Models/Cliente','cliente_proprietario_id')
    }
    cliente_us(){
        return this.belongsTo('App/Models/Cliente','cliente_usuario_id')
    }
    funcionario(){
        return this.belongsTo('App/Models/Funcionario')
    }
    imovel(){
        return this.belongsTo('App/Models/Imovei')
    }
}

module.exports = Historico
