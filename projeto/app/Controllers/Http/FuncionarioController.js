'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with funcionarios
 */
const Funcionario = use("App/Models/Funcionario")
class FuncionarioController {
  /**
   * Show a list of all funcionarios.
   * GET funcionarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const funcionarios = await Funcionario.all();

    return response.json(funcionarios);
  }

  /**
   * Render a form to be used for creating a new funcionario.
   * GET funcionarios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

    const funcionarioData = request.only(["data_ingresso","cargo_id","pessoa_id"])
        
        try {
            const funcionario = await Funcionario.create(funcionarioData);


            return response.json({
                status: "success"
            });
        } catch (error) {
            return response.status(500).json({
                status: "error",
                message: "Ocorreu um erro inesperado!",
                technical: error,
            });
        }


  }

  /**
   * Create/save a new funcionario.
   * POST funcionarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single funcionario.
   * GET funcionarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      return response.json(await Funcionario.findOrFail(params.id));
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Funcionario não encontrado!",
      });
    }
  }

  /**
   * Render a form to update an existing funcionario.
   * GET funcionarios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update funcionario details.
   * PUT or PATCH funcionarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const funcionarioData = request.only(["id","cargo_id"])

    try {
      const funcionario = await Funcionario.findOrFail(params.id);
      
      funcionario.caggo_id = funcionarioData.cargo_id
      await funcionario.save();
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Funcionario não encontrado!",
      });
      
    }


  }

  /**
   * Delete a funcionario with id.
   * DELETE funcionarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const funcionario = await Funcionario.findOrFail(params.id);

      await funcionario.delete();

      return response.json({
        status: "success",
        message: "Usuário removido com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Funcionario não encontrado!",
      });
    }
    
  }
}

module.exports = FuncionarioController
