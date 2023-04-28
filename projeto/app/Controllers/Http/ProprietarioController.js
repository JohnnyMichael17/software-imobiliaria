'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with proprietarios
 */
const Proprietario = use('App/Models/Proprietario')
class ProprietarioController {
  /**
   * Show a list of all proprietarios.
   * GET proprietarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ request, response, view }) {
    const proprietario = await Proprietario.all()
    return proprietario;
  }

  /**
   * Render a form to be used for creating a new proprietario.
   * GET proprietarios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async create ({ request, response, view }) {
    const proprietarioData = request.only(["cliente_id", "imovei_id"]);
    try {
      const proprietario = await Proprietario.create(proprietarioData)

      return response.json({
        status: "success"
      })
      
    } catch (error) {
      return response.status(500).jason({
        status: "error",
        massage: "Ocorreu um erro inesperado!",
        rechnical: error, 
      })
      
    }
  }

  /**
   * Create/save a new proprietario.
   * POST proprietarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single proprietario.
   * GET proprietarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async show ({ params, request, response, view }) {
    try {
      return response.json(await Proprietario.findOrFail(params.id));
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Proprietário não encontrado!",
      });
    }
  }

  /**
   * Render a form to update an existing proprietario.
   * GET proprietarios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Update proprietario details.
   * PUT or PATCH proprietarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async update({ auth, params, resquest, response }) {

    const proprietarioData = resquest.only(["cliente_id", "imovei_id"]);

    try {
        const proprietario = await Proprietario.findOrfail (params.id)

        proprietario.cliente_id = proprietarioData.cliente_id;
        proprietario.imovei_id = proprietarioData.imovei_id;

        await proprietario.save();
    } catch (error) {
        return response.status(404).json({
            status: "error",
            message: "Não foi possível atualizar informações!"
        })
    }
}

  /**
   * Delete a proprietario with id.
   * DELETE proprietarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async destroy ({ params, request, response }) {
    try {
      const proprietario = await Proprietario.findOrFail(params.id)
      await proprietario.delete()
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

module.exports = ProprietarioController
