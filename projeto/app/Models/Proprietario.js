'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Proprietario extends Model {
    imovel() {
        return this.belongsTo('App/Models/Imovei')
    }
    cliente() {
        return this.belongsTo('App/Models/Cliente')
    }
}

module.exports = Proprietario
