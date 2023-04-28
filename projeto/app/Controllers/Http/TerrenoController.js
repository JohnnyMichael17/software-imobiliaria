'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with terrenos
 */
const Terreno = use('App/Models/Terreno')
class TerrenoController {
  /**
   * Show a list of all terrenos.
   * GET terrenos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const terreno = await Terrenorequest.all()
    return terreno
  }

  /**
   * Render a form to be used for creating a new terreno.
   * GET terrenos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    const terrenoData = request.only(["id","largura","comprimeto","nivel"])
    const terreno = await Terreno.create(terrenoData)
    try {
     

      return response.json({
        status: "success"
      })
      
    } catch (error) {
      return response.status(500).json({
        status: "error",
        massage: "Ocorreu um erro inesperado!",
        rechnical: error, 
      })
      
    }
  }

  /**
   * Create/save a new terreno.
   * POST terrenos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single terreno.
   * GET terrenos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const terreno =await Terreno.findOrFail(params.id)
      await terreno.load('imoveiProp')
      return response.json(terreno);
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações pessoais não encontradas!",
      });
    }
  }

  /**
   * Render a form to update an existing terreno.
   * GET terrenos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update terreno details.
   * PUT or PATCH terrenos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const terrenoData = request.only(["id","largura","comprimento","nivel"])

    try {
      const terreno = await Terreno.findOrFail(params.id)

      terreno.largura = terrenoData.largura
      terreno.comprimento = terrenoData.comprimento
      terreno.nivel = terrenoData.nivel

      await terreno.save()
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possivel atualisar informações"
      })
      
    }
  }

  /**
   * Delete a terreno with id.
   * DELETE terrenos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const terreno = await Terreno.findOrFail(params.id)
      await terreno.delete()
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

module.exports = TerrenoController
