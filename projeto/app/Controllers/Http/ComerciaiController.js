'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with comercials
 */
const Comerciai = use('App/Models/Comerciai')
class ComercialController {
  /**
   * Show a list of all comercials.
   * GET comercials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const comerciai = await Comerciai.all()
    return comerciai
  }

  /**
   * Render a form to be used for creating a new comercial.
   * GET comercials/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    const comerciaiDATA = request.only(['id', 'qtd_banheiros','qtd_comodos'])

    try {
     await Comerciai.create(comerciaiDATA);

     return response.json({
       status: "success"
     })
    } catch (error ) {
      return response.status(500).json({
        status: "error",
        message: "Ocorreu um erro inesperado!",
        technical: error,
      })
      
    }
  }

  /**
   * Create/save a new comercial.
   * POST comercials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single comercial.
   * GET comercials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const comerciai =await Comerciai.findOrFail(params.id)
      await comerciai.load('imoveiProp')
      return response.json(comerciai);
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações não encontradas", 
      })
    }
  }

  /**
   * Render a form to update an existing comercial.
   * GET comercials/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update comercial details.
   * PUT or PATCH comercials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const comerciaiDATA = request.only(['id', 'qtd_banheiros','qtd_comodos'])
    try {
      const comerciai = await Comerciai.findOrFail(params.id)
      comerciai.qtd_banheiros = comerciaiDATA.qtd_banheiros
      comerciai.qtd_comodos = comerciaiDATA.qtd_comodos
      comerciai.save()
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar informações do imovel!",
      })
      
    }
  }

  /**
   * Delete a comercial with id.
   * DELETE comercials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const comerciai = await Comerciai.findOrFail(params.id);

      await comerciai.delete();

      return response.json({
        status: "success",
        message: "Informações deletadas com sucesso.",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações não encontradas!",
      });
    }
  }
}

module.exports = ComercialController
