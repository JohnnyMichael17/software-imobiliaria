'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pessoas
 */
const Pessoa = use('App/Models/Pessoa')
class PessoaController {
  /**
   * Show a list of all pessoas.
   * GET pessoas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const pessoa = await Pessoa.all();

    return response.json(pessoa);
  }

  /**
   * Render a form to be used for creating a new pessoa.
   * GET pessoas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   
  async create ({ request, response, view }) {
    const pessoaData = request.only(["nome","cpf","sexo"])

    try {
        const pessoa = await Pessoa.create(pessoaData);
        

        return response.json({
            status: "success",
            data: pessoa.id,

            
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
   * Create/save a new pessoa.
   * POST pessoas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

 

  /**
   * Render a form to update an existing pessoa.
   * GET pessoas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }


  /**
   * Display a single pessoa.
   * GET pessoas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      return response.json(await Pessoa.findOrFail(params.id));
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações pessoais não encontradas!",
      });
    }
  }

  /**
   * Render a form to update an existing pessoa.
   * GET pessoas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  
  //async edit ({ params, request, response, view }) {
  //}

  /**
   * Update pessoa details.
   * PUT or PATCH pessoas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const pessoasData = request.only(["id", "nome", "cpf", "sexo"]);

    try {
      const pessoas = await Pessoa.findOrFail(params.id);

      pessoas.name = pessoasData.name;
      pessoas.cpf = pessoasData.cpf;
      pessoas.sexo = pessoasData.sexo;

      await pessoas.save();
      return response.json({
        status: "success",
        message: "Informações atualizadas",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar informações!",
      });
    }
  }

  /**
   * Delete a pessoa with id.
   * DELETE pessoas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async destroy({ params, auth, request, response }) {
    try {
      const pessoas = await Pessoa.findOrFail(params.id);

      await pessoas.delete();

      return response.json({
        status: "success",
        message: "Informações pessoais deletadas com sucesso.",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações não encontradas!",
      });
    }
  }
}
  
module.exports = PessoaController
