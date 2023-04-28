'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with comissoes
 */
const Comissoe = use('App/Models/Comissoe')
class ComissoeController {
     /**
   * Show a list of all comissoe.
   * GET aps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const comissoe = await Comissoe.all()
    return comissoe;
  }

  /**
   * Render a form to be used for creating a new comissoe.
   * GET comissoes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async create ({ request, response, view }) {
    const comissoeData = request.only(["funcionario_id","num_contrato","valor"])
    try {
      const comissoe = await Comissoe.create(comissoeData)

      return response.json({
        status: "sucess"
      })
    } catch (error) {
      return response.status(500),json({
        status: "error",
        message: "Ocorreu um erro inesperado",
        rechnical: error,
      })
    }
  }
  /**
   * Display a single comissoe.
   * GET comissoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async show ({ params, request, response, view }) {
    try {
      const comissoe =await Comissoe.findOrFail(params.id)
      await comissoe.load('imoveiProp')
      return response.json(comissoe);
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações pessoais não encontradas!",
      });
    }
  }

   /**
   * Update comissoe details.
   * PUT or PATCH comissoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async update ({ params, request, response }) {
        const comissoeData = request.only(["funcionario_id","num_contrato","valor"])
        try {
          const comissoe = await Comissoe.findOrFail(params.id)
    
          comissoe.funcionario_id = comissoeData.funcionario_id
          comissoe.num_contrato = comissoeData.num_contrato
          comissoe.valor = comissoeData.valor
    
          await comissoe.save()
          
        } catch (error) {
          return response.status(404).json({
            status: "error",
            message: "Não foi possivel atualizar informações"
          })
        }
    }

    /**
   * Delete a comissoe with id.
   * DELETE comissoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const comissoe = await Comissoe.findOrFail(params.id)
      await comissoe.delete()
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

module.exports = ComissoeController
