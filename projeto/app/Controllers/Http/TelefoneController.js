'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with telefones
 */
const Telefone = use('App/Models/Telefone')
class TelefoneController {
  /**
   * Show a list of all telefones.
   * GET telefones
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const telefone = await Telefone.all();

    return response.json(telefone);
  }

  /**
   * Render a form to be used for creating a new telefone.
   * GET telefones/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   
  async create ({ request, response, view }) {
      const telefoneData = request.only(["numeroT","pessoa_id","tipoNumero",'id'])
     await Telefone.create(telefoneData);

    try {
        
      

        return response.json({
            status: "success",

            
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
   * Create/save a new telefone.
   * POST telefones
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }


  /**
   * Render a form to update an existing telefone.
   * GET telefones/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Display a single telefone.
   * GET telefones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      return response.json(await Telefone.findOrFail(params.pessoa_id));
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações telefoneis não encontradas!",
      });
    }
  }

  /**
   * Update telefone details.
   * PUT or PATCH telefones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const telefonesData = request.only(["telefone","tipoNumero","pessoa_id"]);

    try {
      const telefones = await Telefone.findOrFail(params.pessoa_id);

      telefones.telefone = telefonesData.telefone;
      telefones.tipoNumero = telefonesData.tipoNumero;
      

      await telefones.save();
      return response.status(404).json({
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
   * Delete a telefone with id.
   * DELETE telefones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async destroy({ params, auth, request, response }) {
    try {
      const telefones = await Telefone.findOrFail(params.id);

      await telefones.delete();

      return response.json({
        status: "success",
        message: "telefone deletado com sucesso.",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações não encontradas!",
      });
    }
  }
}
  
module.exports = TelefoneController
