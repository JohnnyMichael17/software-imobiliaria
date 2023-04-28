'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Terreno extends Model {

  imovei (){
      return this.belongsTo('App/Models/Imovei')
    }
  

  proprietarios (){
    return this.belongsToMany (
      'App/Models/User', 
      'cliente_id',
      'mivei_id'
      ).pivotTable ('proprietarios');
  }
}

module.exports = Terreno
