'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.post("/signup", "UserController.signup")
Route.post("/login", "UserController.login")

Route.get("/user", "UserController.index") 
Route.post("/user_dell", "UserController.destroy")
Route.put("/user_upd", "UserController.update")

Route.post("/pessoa", "PessoaController.create")
Route.get("/pessoa", "PessoaController.index")
Route.post("/pessoa_dell", "PessoaController.destroy")
Route.put("/pessoa_upd", "PessoaController.update")

Route.post("/funcionario", "FuncionarioController.create")
Route.get("/funcionario", "FuncionarioController.index")
Route.post("/funcionario_dell", "FuncionarioController.destroy")
Route.put("/funcionario_upd", "FuncionarioController.update")

Route.post("/cargo", "CargoController.create")
Route.get("/cargo", "CargoController.index")
Route.post("/cargo_dell", "CargoController.destroy")
Route.put("/cargo_upd", "CargoController.update")

Route.post("/cliente", "ClienteController.create")
Route.get("/cliente", "ClienteController.index")
Route.post("/cliente_dell", "ClienteController.destroy")
Route.put("/cliente_upd", "ClienteController.update")

Route.post("/telefone", "TelefoneController.create")
Route.get("/telefone", "TelefoneController.index")
Route.post("/telefone_dell", "TelefoneController.destroy")
Route.put("/telefone_upd", "TelefoneController.update")

Route.post("/endereco_p", "Endereco_pessoaController.create")
Route.get("/endereco_p", "Endereco_pessoaController.index")
Route.post("/endereco_p_dell", "Endereco_pessoaController.destroy")
Route.put("/endereco_p_upd", "Endereco_pessoaController.update")

Route.post("/endereco_i", "Endereco_imoveiController.create")
Route.get("/endereco_i", "Endereco_imoveiController.index")

Route.get("/Imoveis", "ImoveiController.index")
Route.get("/dados_imovel", "ImoveiController.dados_imovel")
Route.get("/dados_imovel_venda", "ImoveiController.dados_imovel_venda")
Route.get("/dados_imovel_aluguel", "ImoveiController.dados_imovel_aluguel")
Route.post("/Imoveis", "ImoveiController.create")
Route.post("/terreno","TerrenoController.create")
Route.post("/ap","ApController.create")
Route.post("/casa","CasaController.create")
Route.post("/comercial","ComerciaiController.create")
Route.post("/transacao","TransacoeController.create")



