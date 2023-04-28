'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Casa extends Model {
  imovei (){
      return this.belongsTo('App/Models/Imovei')
    }
    
}

module.exports = Casa
