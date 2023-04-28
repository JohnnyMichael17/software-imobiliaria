'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with endereco_pessoa
 */
const Endereco_pessoa = use('App/Models/Endereco_pessoa')
class Endereco_pessoaController {
     /**
   * Show a list of all endereco_pessoa.
   * GET aps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const enderco_pessoa = await Endereco_pessoa.all()
    return response.json(enderco_pessoa);
  }

  /**
   * Render a form to be used for creating a new endereco_pessoa.
   * GET endereco_pessoa/create      
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async create ({ request, response, view }) {
    const endereco_pessoaData = request.only(["pessoa_id", "logradouro", "bairro", "numero"])
    try {
      const endereco_pessoa = await Endereco_pessoa.create(endereco_pessoaData)

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
   * Display a single endereco_pessoa.
   * GET endereco_pessoa/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async show ({ params, request, response, view }) {
    try {
      const endereco_pessoa =await Endereco_pessoa.findOrFail(params.pessoa_id)
      await endereco_pessoa.load('endereco_imovei')
      return response.json(Endereco_pessoa);
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações não encontradas!",
      });
    }
  }

   /**
   * Update endereco_pessoa details.
   * PUT or PATCH endereco_pessoa/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async update ({ params, request, response }) {
      const endereco_pessoaData = request.only(["pessoa_id", "logradouro", "bairro", "numero"])
        try {
          const endereco_pessoa = await Endereco_pessoa.findOrFail(params.pessoa_id)
    
          endereco_pessoa.bairro = endereco_pessoaData.bairro
          endereco_pessoa.logadouro = endereco_pessoaData.logradouro
          endereco_pessoa.numero = endereco_pessoa.numero
    
          await endereco_pessoa.save()
          
        } catch (error) {
          return response.status(404).json({
            status: "error",
            message: "Não foi possível atualizar informações"
          })
        }
    }

    /**
   * Delete a endereco_pessoa with id.
   * DELETE endereco_pessoa/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const endereco_pessoa = await Endereco_pessoa.findOrFail(params.pessoa_id)
      await endereco_pessoa.delete()
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

module.exports = Endereco_pessoaController
