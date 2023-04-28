'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with historicos
 */
const Historico = use('App/Models/Historico')
class HistoricoController {
  /**
   * Show a list of all historicos.
   * GET historicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    const historico = await Historico.all()
    return response.json(historico)
  }

  /**
   * Render a form to be used for creating a new historico.
   * GET historicos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response }) {
    const historicoData = request.only(['num_contrato','tipo_trans','valor_operacao_imovel',
    'valor_real','forma_pagamento','funcionario_id',
    'cliente_proprietario_id','cliente_usuario_id',
    'imovei_id'
  ])
    try {
      const historico = await Historico.create(historicoData)
      response.json({
        status: "success",
        data: pessoa.id
      })
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "Ocorreu um erro inesperado!",
        technical: error,
      })
    }

  }

  /**
   * Create/save a new historico.
   * POST historicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single historico.
   * GET historicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response}) {
    try {
      return response.jason(await Historico.findOrFail(params.id))

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações não encontradas!",
      });
      
    }
  }

  /**
   * Render a form to update an existing historico.
   * GET historicos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update historico details.
   * PUT or PATCH historicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const historicoData = request.only(['tipo_trans','valor_operacao_imovel',
    'valor_real','forma_pagamento','funcionario_id',
    'cliente_proprietario_id','cliente_usuario_id',
    'imovei_id'])
    try {
      const historico = await Historico.findOrFail(params.id)
      historico.tipo_trans = historicoData.tipo_trans
      historico.valor_operacao_imovel = historicoData.valor_operacao_imovel
      historico.valor_real = historicoData.valor_real
      historico.formapagamento = historicoData.formapagamento
      historico.funcionario_id = historicoData.funcionario_id
      historico.cliente_proprietario_id = historicoData.cliente_proprietario_id
      historico.cliente_usuario_id = historicoData.cliente_usuario_id
      historico.imovei_id = historicoData.imovei_id
      await historico.save()
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
   * Delete a historico with id.
   * DELETE historicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
        
      const historico = await Historico.findOrFail(params.id)

      await historico.delete()
      return response.json({
        status: "success",
        message: "Informações deletadas com sucesso.",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações não encontradas!",
      });
      
    }
  }
}

module.exports = HistoricoController
