'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class Imovei extends Model {

    proprietarios (){
        return this.belongsToMany (
          'App/Models/Cliente', 
          'cliente_id',
          'imivei_id'
          ).pivotTable ('proprietarios');
      }
    proprietario(){
        return this.belongsTo('App/Models/Cliente')
    }
    terreno(){
        return this.hasOne('App/Models/Terreno',"id","id")
    }
    ap(){
        return this.hasOne('App/Models/Ap',"id","id")
    }
    comercial(){
        return this.hasOne('App/Models/Comerciai',"id","id")
    }
    casa(){
        return this.hasOne('App/Models/Casa',"id","id")
    }

    endereco (){
        return this.hasOne('App/Models/Endereco_imovei')
    }
    
}

module.exports = Imovei
