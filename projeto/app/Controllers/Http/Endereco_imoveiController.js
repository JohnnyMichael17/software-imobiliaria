'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with endereco_imovel
 */     
const Endereco_imovel = use('App/Models/Endereco_imovei')
class Endereco_imovelController {
     /**
   * Show a list of all endereco_imovel.
   * GET aps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const enderco_imovel = await Endereco_imovel.all()
    return enderco_imovel;
  }

  /**
   * Render a form to be used for creating a new endereco_imovel.
   * GET endereco_imovel/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async create ({ request, response, view }) {
    const endereco_imovelData = request.only(["imovei_id", "bairro", "logadouro", "numero"])
    const endereco_imovel = await Endereco_imovel.create(endereco_imovelData)
    try {
      

      return response.json({
        status: "sucess"
      })
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "Ocorreu um erro inesperado",
        rechnical: error,
      })
    }
  }
  /**
   * Display a single endereco_imovel.
   * GET endereco_imovel/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async show ({ params, request, response, view }) {
    try {
      const endereco_imovel =await params.imovel_id.findOrFail(params.imovei_id)
      await endereco_imovel.load('endereco_imovei')
      return response.json(Endereco_imovel);
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações do imóvel não encontradas!",
      });
    }
  }

   /**
   * Update endereco_imovel details.
   * PUT or PATCH endereco_imovel/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async update ({ params, request, response }) {
      const endereco_imovelData = request.only(["imovel_id", "bairro", "logradouro", "numero"])
        try {
          const endereco_imovel = await Endereco_imovel.findOrFail(params.imovei_id)
    
          endereco_imovel.bairro = endereco_imovelData.bairro
          endereco_imovel.logradouro = endereco_imovelData.logradouro
          endereco_imovel.numero = endereco_imovel.numero
    
          await endereco_imovel.save()
          
        } catch (error) {
          return response.status(404).json({
            status: "error",
            message: "Não foi possível atualizar informações"
          })
        }
    }

    /**
   * Delete a endereco_imovel with id.
   * DELETE endereco_imovel/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const endereco_imovel = await Endereco_imovel.findOrFail(params.imovei_id)
      await endereco_imovel.delete()
      return response.json({
        status: "success",
        message: "informações deletadas com sucesso"
      })
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações não encontradas"
      })
    }
  }

}

module.exports = Endereco_imovelController
