'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cargos
 */
const Cargo = use('App/Models/Cargo')
class CargoController {
  /**
   * Show a list of all cargos.
   * GET cargos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ request, response, view }) {
    const cargo = await Cargo.all()
    return cargo;
  }

  /**
   * Render a form to be used for creating a new cargo.
   * GET cargos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async create ({ request, response, view }) {
    const cargoData = request.only([ "nome", "salario_base"])
    try {
      const cargo = await Cargo.create(cargoData)

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
   * Create/save a new cargo.
   * POST cargos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single cargo.
   * GET cargos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async show ({ params, request, response, view }) {
    try {
      return response.json(await Cargo.findOrFail(params.id));
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Cargo não encontrado!",
      });
    }
  }

  /**
   * Render a form to update an existing cargo.
   * GET cargos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Update cargo details.
   * PUT or PATCH cargos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async update({ auth, params, resquest, response }) {

    const cargoData = request.only([ "nome", "salario_base"]);

    try {
        const cargo = await Cargo.findOrfail (params.id)

        cargo.nome = cargoData.nome;
        cargo.salario_base = cargoData.salario_base;

        await cargo.save();
    } catch (error) {
        return response.status(404).json({
            status: "error",
            message: "Não foi possível atualizar o cliente!"
        })
    }
}

  /**
   * Delete a cargo with id.
   * DELETE cargos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async destroy ({ params, request, response }) {
    try {
      const cargo = await Cargo.findOrFail(params.id)
      await cargo.delete()
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

module.exports = CargoController
