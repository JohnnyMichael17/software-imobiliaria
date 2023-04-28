'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with aps
 */
const Ap = use('App/Models/Ap')
class ApController {
  /**
   * Show a list of all aps.
   * GET aps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const ap = await Ap.all()
    return ap;
  }

  /**
   * Render a form to be used for creating a new ap.
   * GET aps/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    const apData = request.only(["id", "qtd_comodos", "qtd_suites", "qtd_salas_estar", "qtd_salas_jantar", "num_vagas_garagem", "armario_imbutido", "descricao", "andar", "valor_condo", "portaria_24hrs"])
    try {
      const ap = await Ap.create(apData)

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
   * Create/save a new ap.
   * POST aps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single ap.
   * GET aps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const ap =await Ap.findOrFail(params.id)
      await ap.load('imoveiProp')
      return response.json(ap);
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações pessoais não encontradas!",
      });
    }
  }

  /**
   * Render a form to update an existing ap.
   * GET aps/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update ap details.
   * PUT or PATCH aps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const apData = request.only(["id", "qtd_comodos", "qtd_suites", "qtd_salas_estar", "qtd_salas_jantar", "num_vagas_garagem", "armario_imbutido", "descricao", "andar", "valor_condo", "portaria_24hrs"])
    try {
      const ap = await Ap.findOrFail(params.id)

      ap.qtd_comodos = apData.qtd_comodos
      ap.qtd_suites = apData.qtd_suites
      ap.qtd_salas_estar = apData.qtd_salas_estar
      ap.qtd_salas_jantar = apData.qtd_salas_jantar
      ap.num_vagas_garagem = apData.num_vagas_garagem
      ap.armario_imbutido = apData.armario_imbutido
      ap.descricao = apData.descricao
      ap.andar = apData.andar
      ap.valor_condo = apData.valor_condo
      ap.portaria_24hrs = apData.portaria_24hrs

      await ap.save()
      
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possivel atualisar informações"
      })
    }
  }

  /**
   * Delete a ap with id.
   * DELETE aps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const ap = await Ap.findOrFail(params.id)
      await ap.delete()
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

module.exports = ApController
