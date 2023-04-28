'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with imoveis
 */

 const Imovei = use('App/Models/Imovei')
class ImoveiController {
  /**
   * Show a list of all imoveis.
   * GET imoveis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const imovei = await Imovei.all();

    return response.json(imovei);
  }
  /**
   * Show a list of all imoveis.
   * GET imoveis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async dados_imovel ({ request, response, view }) {
    const imovei = await Imovei.query().with('endereco').with('terreno').with('ap').with('comercial').with('casa')
    .with("proprietario",(bilder)=> bilder.with("pessoas",(bilder)=> bilder.with('telefone'))).fetch()
    try {
     
      return response.json(imovei);
      
    } catch (error) {
      
        return response.status(500).json({
          status: "error",
          message: "Ocorreu um erro inesperado!",
          technical: error,
        });
    }
    

    
  }
  async dados_imovel_venda ({ request, response, view }) {
    const imovei = await Imovei.query().where('situacao','LIKE','%'+'venda'+'%').with('endereco')
    .with('terreno').with('ap').with('comercial').with('casa')
    .with("proprietario",(bilder)=> bilder.with("pessoas",(bilder)=> bilder.with('telefone'))).fetch()
    try {
     
      return response.json(imovei);
      
    } catch (error) {
      
        return response.status(500).json({
          status: "error",
          message: "Ocorreu um erro inesperado!",
          technical: error,
        });
    }
    

    
  }
  async dados_imovel_aluguel ({ request, response, view }) {
    const imovei = await Imovei.query().where('situacao','LIKE','%'+'aluguel'+'%').with('endereco')
    .with('terreno').with('ap').with('comercial').with('casa')
    .with("proprietario",(bilder)=> bilder.with("pessoas",(bilder)=> bilder.with('telefone'))).fetch()
    try {
     
      return response.json(imovei);
      
    } catch (error) {
      
        return response.status(500).json({
          status: "error",
          message: "Ocorreu um erro inesperado!",
          technical: error,
        });
    }
    

    
  }

  /**
   * Render a form to be used for creating a new imovei.
   * GET imoveis/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    
    const imoveiData = request.only(["cliente_id","area","valor_loc","valor_vend","data_const","end_foto","situacao"])

    try {
        const imovei = await Imovei.create(imoveiData);
        

        return response.json({
            status: "success",
            data: imovei.id
            
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
   * Create/save a new imovei.
   * POST imoveis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single imovei.
   * GET imoveis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      return response.json(await Imovei.findOrFail(params.id));
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações do imovel não encontradas!",
      });
    }
  }

  /**
   * Render a form to update an existing imovei.
   * GET imoveis/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update imovei details.
   * PUT or PATCH imoveis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const imoveiData = request.only(["id","cliente_id","area","valor_loc","valor_vend","data_const","end_foto","situacao"])

    try {
      const imovei = await Imovei.findOrFail(params.id);

      imovei.cliente_id =  imoveiData.cliente_id
      imovei.area = imoveiData.area
      imovei.valor_loc = imoveiData.valor_loc
      imovei.valor_vend = imoveiData.valor_ven
      imovei.data_const = imoveiData.data_const
      imovei.end_foto = imoveiData.end_foto
      imovei.situacao = imoveiData.situacao

      await imovei.save();
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar informações do imovel!",
      });
    }
  }

  /**
   * Delete a imovei with id.
   * DELETE imoveis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const imovei = await Imovei.findOrFail(params.id);

      await imovei.delete();

      return response.json({
        status: "success",
        message: "Informações do imovel deletadas com sucesso.",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações não encontradas!",
      });
    }
  }
}

module.exports = ImoveiController
