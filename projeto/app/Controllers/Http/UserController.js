'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */

const User = use("App/Models/User");

class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async index({ request, response, view }) {
    const users = await User.all();

    return response.json(users);
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async signup({ request, response, auth }) {
    const userData = request.only(["pessoa_id", "username", "email", "password", "permissao"])

    try {
      const user = await User.create(userData);

      const token = await auth.generate(user);

      return response.json({
        status: "success",
        data: token,
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "Ocorreu um erro inesperado!",
        technical: error,
      });
    }
  }
  async login({ request, response, auth }) {
    try {
      const token = await auth.attempt(
        request.input("email"),
        request.input("password")
      );

      return response.json({
        status: "success",
        data: token,
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "E-mail ou Senha inválidos.",
      });
    }
  }

  async logout({ response, auth }) {
    await auth.logout()

    return response.redirect('/')
  }


  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const userData = request.only(['pessoa_id", "username", "email", "password", "permissao'])
    const user = await User.create(userData)

    await auth
      .remember(true)
      .login(user)

    return response.redirect('/')
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response}) {
    try {
      const user = await User.findOrFail(params.id)
      if(user.permissao == "cliente")
        await user.loadMany(['pessoas', 'clientes'])
      if(user.permissao == "funcionario")
        await user.loadMany(['pessoas', 'funcionarios'])

      return response.json(user);
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Usuário não encontrado!",
      });
    }

  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const userData = request.only([
      "username",
      "email",
      "password",
      "permissao"
     
    ]);

    try {
      const user = auth.current.user;

      user.username = userData.username;
      user.email = userData.email;
      user.password = userData.password;
      user.permissao = userData.permissao;

      await user.save();
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar o seu perfil!",
      });
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const user = await User.findOrFail(params.id);

      await user.delete();

      return response.json({
        status: "success",
        message: "Usuário removido com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Usuário não encontrado!",
      });
    }
  }
}

module.exports = UserController
