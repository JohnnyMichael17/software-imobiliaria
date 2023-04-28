'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with casas
 */
const Casa = use('App/Models/Casa')
class CasaController {
  /**
   * Show a list of all casas.
   * GET casas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ request, response, view }) {
    const casa = await Casa.all()
    return casa;
  }

  /**
   * Render a form to be used for creating a new casa.
   * GET casas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async create ({ request, response, view }) {
    const casaData = request.only(["id","qtd_comodos", "qtd_suites", "qtd_salas_estar", "qtd_salas_jantar", "num_vagas_garagem", "armario_imbutido", "descricao"])
    const casa = await Casa.create(casaData)
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
   * Create/save a new casa.
   * POST casas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single casa.
   * GET casas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async show ({ params, request, response, view }) {
    try {
      const casa =await Casa.findOrFail(params.id)
      await casa.load('imoveiProp')
      return response.json(casa);
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações não encontradas!",
      });
    }
  }

  /**
   * Render a form to update an existing casa.
   * GET casas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async update ({ params, request, response }) {
    const casaData = request.only(["id","qtd_comodos", "qtd_suite", "qtd_salas_estar",
     "qtd_salas_jantar", "num_vagas_garagem", "armario_imbutido", "descricao"])

    try {
      const casa = await Casa.findOrFail(params.id)

      casa.qtd_quarto = casaData.qtd_quarto
      casa.qtd_suite = casaData.qtd_suite
      casa.qtd_salas_estar = casaData.qtd_salas_estar
      casa.qtd_salas_jantar = casaData.qtd_salas_jantar
      casa.num_vagas_garagem = casaData.num_vagas_garagem
      casa.armario_imbutido = casaData.armario_imbutido
      casa.descricao = casaData.descricao

      await casa.save()
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possivel atualisar informações"
      })
      
    }
  }

  /**
   * Update casa details.
   * PUT or PATCH casas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a casa with id.
   * DELETE casas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async destroy ({ params, request, response }) {
    try {
      const casa = await Casa.findOrFail(params.id)
      await casa.delete()
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

module.exports = CasaController
