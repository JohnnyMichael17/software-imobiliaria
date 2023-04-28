'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Cliente = use("App/Models/Cliente");

class ClienteController {

    /**
     * Show list of all clientes.
     * GET clientes
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {view} ctx.view
     */
    async index({ request, response, view }) {
        const cliente = await Cliente.all();

        return response.json(cliente);
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
      return response.json(await Cliente.findOrFail(params.id));
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Cliente não encontrado!",
      });
    }
  }
   
    
    /**
     * Create/save a new cliente.
     * POST cliente
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    
    async create({ request, response, auth }) {
        const clienteData = request.only(["pessoa_id", "estado_civil", "profissao"]);

        try {
            const clientes = await Cliente.create(clienteData);

            const token = await auth.generate(clientes);

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

    async update({ params, request, response }) {

        const clienteData = request.only([
            "estado_civil",
            "profissao" ,"pessoa_id"
        ]);

        try {
            const cliente = await Cliente.findOrfail (params.id)

            cliente.estado_civil = clienteData.estado_civil;
            cliente.profissao = clienteData.profissao;

            await cliente.save();
        } catch (error) {
            return response.status(404).json({
                status: "error",
                message: "Não foi possível atualizar o cliente!"
            })
        }
    }

    /**
    * Delete a cliente with id
    * DELETE cliente/:id
    * 
    * @param {object} ctx
    * @param {Request} ctx.request
    * @param {Response} ctx.response
    */
    async destroy({ params, auth, request, response}) {
        try {
            const cliente = await Cliente.findOrfail(params.id);

            await cliente.delete();

            return response.json({
                status: "sucess",
                message: "Removido com sucesso!",})
        } catch (error) {
            return response.status(500).json({
                status: "error",
                message: "Usuário não encontrado!",
            });

        }
    }
}

module.exports = ClienteController