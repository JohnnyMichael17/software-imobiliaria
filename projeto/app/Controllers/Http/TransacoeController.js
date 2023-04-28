'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with transacoes
 */
const Transacao = use('App/Models/Transacoe')
class TransacoeController {
  /**
   * Show a list of all transacoes.
   * GET transacoes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    const transacoe = await Transacao.all()
    return response.json(transacoe)
  }

  /**
   * Render a form to be used for creating a new transacoe.
   * GET transacoes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response }) {
    const transacoeData = request.only(['num_contrato','tipo_trans','valor_operacao_imovel',
    'valor_real','forma_pagamento','funcionario_id',
    'cliente_prorpietario_id','cliente_usuario_id',
    'imovei_id'
  ])
  const transaceo = await Transacao.create(transacoeData)
    try {
      
      response.json({
        status: "success"
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
   * Create/save a new transacoe.
   * POST transacoes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single transacoe.
   * GET transacoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {
    try {
      return response.jason(await Transacao.findOrFail(params.id))

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Informações não encontradas!",
      });
      
    }
  }

  /**
   * Render a form to update an existing transacoe.
   * GET transacoes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update transacoe details.
   * PUT or PATCH transacoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const transacoeData = request.only(['tipo_trans','valor_operacao_imovel',
    'valor_real','forma_pagamento','funcionario_id',
    'cliente_proprietario_id','cliente_usuario_id',
    'imovei_id'])
    try {
      const transacoe = await Transacao.findOrFail(params.id)
      transacoe.tipo_trans = transacoeData.tipo_trans
      transacoe.valor_operacao_imovel = transacoeData.valor_operacao_imovel
      transacoe.valor_real = transacoeData.valor_real
      transacoe.formapagamento = transacoeData.formapagamento
      transacoe.funcionario_id = transacoeData.funcionario_id
      transacoe.cliente_proprietario_id = transacoeData.cliente_proprietario_id
      transacoe.cliente_usuario_id = transacoeData.cliente_usuario_id
      transacoe.imovei_id = transacoeData.imovei_id
      await transacoe.save()
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
   * Delete a transacoe with id.
   * DELETE transacoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
        
      const transacoe = await Transacao.findOrFail(params.id)

      await transacoe.delete()
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

module.exports = TransacoeController
