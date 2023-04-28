CREATE TABLE pessoa(
	cpf VARCHAR(14),
	nome VARCHAR(60)
);
CREATE TABLE telefone(
	cpf VARCHAR(14),
	telefone VARCHAR(20),
	tipo_telefone CHAR(1),
	CONSTRAINT chk_tipo_tel CHECK (tipo_telefone IN ('F', 'C'))
	
);
CREATE TABLE endereco_pessoa(
	cpf VARCHAR(14),
	logadouro VARCHAR(256),
	numero VARCHAR(10),
	bairro VARCHAR(256)
	
);

CREATE TABLE cliente(
	cpf VARCHAR(14),
	email VARCHAR(256),
	sexo CHAR(1),
	estado_civil VARCHAR(13),
	profissao VARCHAR(256),
	CONSTRAINT chk_sexo CHECK (sexo IN ('F', 'M')),
	CONSTRAINT chk_est_civil CHECK (estado_civil IN ('Casado(a)', 'Solteiro(a)'))
);



CREATE TABLE funcionario(
	cpf VARCHAR(14),
	data_ingresso DATE,
	cod_cargo VARCHAR(4)
);

CREATE TABLE cargo(
	cod VARCHAR(4),
	nome VARCHAR(256),
	salario_base DECIMAL(5,2)
);

CREATE TABLE imovel(
	cod VARCHAR(5),
	area INT,
	valor_loc DECIMAL(5,2),
	valor_vend DECIMAL(5,2),
	data_cnstr DATE,
	data_post DATE,
	foto VARCHAR(10),
	situacao VARCHAR(33),
	CONSTRAINT chk_sitiacao CHECK (situacao IN ('Disponivel para Aluguel', 'Disponivel para Venda','Disponivel para Aluguel/Venda',
												'Alugado','Vendido','indisponivel','retirado do catalogo'))
);

CREATE TABLE endereco_imovel(
	cod_imov VARCHAR(5),
	logadouro VARCHAR(256),
	numero VARCHAR(10),
	bairro VARCHAR(256)
	
);

CREATE TABLE terreno (
	cod VARCHAR(5),
	largura INT,
	comprimento int,
	nivel VARCHAR(10),
	CONSTRAINT chk_tipo_nivel CHECK (nivel IN ('declive', 'aclive','plano'))

);

CREATE TABLE comercial (
	cod VARCHAR(5),
	qtd_banheiros INT,
	qtd_comodos INT
);

CREATE TABLE casa (
	cod VARCHAR(5),
	qtd_quarto INT,
	qtd_suite INT,
	qtd_salas_estar INT,
	qtd_salas_jantar INT,
	num_vagas_garagem INT,
	armario_imbutido BOOLEAN,
	descricao VARCHAR(256)
	
);

CREATE TABLE apartamento (
	cod VARCHAR(5),
	qtd_quarto INT,
	qtd_suite INT,
	qtd_salas_estar INT,
	qtd_salas_jantar INT,
	num_vagas_garagem INT,
	armario_imbutido BOOLEAN,
	descricao VARCHAR(256),
	andar INT,
	valor_cond DECIMAL(5,2),
	portaria_24hrs Boolean
	
);

CREATE TABLE transacao(
	num_contrato SERIAL,
	data_tr DATE,
	tipo_trans VARCHAR(10),
	cpf_funcionario VARCHAR(14),
	cpf_cliente_prorpietario VARCHAR(14),
	cpf_cliente_usuario VARCHAR(14),
	cod_imovel VARCHAR(5),
	valor_operacao_imovel DECIMAL(5,2),
	valor_real DECIMAL(5,2),
	forma_pagamento VARCHAR(10),
	CONSTRAINT chk_tipo_trans CHECK (tipo_trans IN ('venda', 'aluguel'))
);

CREATE TABLE comissao_fun(
	num_contrato INTEGER,
	cpf_funcionario VARCHAR(14),
	data_trans DATE,
	valor DECIMAL(5,2)

	
);

CREATE TABLE proprietario_imv(
	cpf_cliente_prorpietario VARCHAR(14),
	cod_imovel VARCHAR(5)
);

CREATE TABLE historico(
	num_contrato SERIAL,
	data_tr DATE,
	tipo_trans VARCHAR(10),
	cpf_funcionario VARCHAR(14),
	cpf_cliente_prorpietario VARCHAR(14),
	cpf_cliente_usuario VARCHAR(14),
	cod_imovel VARCHAR(5),
	valor_operacao_imovel DECIMAL(5,2),
	valor_real DECIMAL(5,2),
	forma_pagamento VARCHAR(10),
	CONSTRAINT chk_tipo_trans CHECK (tipo_trans IN ('venda', 'aluguel'))
);

CREATE TABLE usuario(
	login VARCHAR(128),
	senha VARCHAR(128)
);


/* Chaves primarias*/
ALTER TABLE pessoa ADD CONSTRAINT pk_pessoa PRIMARY KEY(cpf);
ALTER TABLE funcionario ADD CONSTRAINT pk_funcionario PRIMARY KEY(cpf);
ALTER TABLE cliente ADD CONSTRAINT pk_cliente PRIMARY KEY(cpf);
ALTER TABLE telefone ADD CONSTRAINT pk_telefone PRIMARY KEY(cpf,telefone);
ALTER TABLE endereco_pessoa ADD CONSTRAINT pk_end_ps PRIMARY KEY(cpf);
ALTER TABLE imovel ADD CONSTRAINT pk_imv PRIMARY KEY(cod);
ALTER TABLE terreno ADD CONSTRAINT pk_terreno PRIMARY KEY(cod);
ALTER TABLE comercial ADD CONSTRAINT pk_comercial PRIMARY KEY(cod);
ALTER TABLE apartamento ADD CONSTRAINT pk_ap PRIMARY KEY(cod);
ALTER TABLE casa ADD CONSTRAINT pk_casa PRIMARY KEY(cod);
ALTER TABLE comissao_fun ADD CONSTRAINT pk_coms_fun PRIMARY KEY(num_contrato,cpf_funcionario);
ALTER TABLE transacao ADD CONSTRAINT pk_trans PRIMARY KEY(num_contrato);
ALTER TABLE endereco_imovel ADD CONSTRAINT pk_end_imv PRIMARY KEY(cod_imov);
ALTER TABLE cargo ADD CONSTRAINT pk_cargo PRIMARY KEY(cod);
ALTER TABLE proprietario_imv ADD CONSTRAINT pk_prop_imv PRIMARY KEY(cpf_cliente_prorpietario,cod_imovel);
ALTER TABLE historico ADD CONSTRAINT pk_hist PRIMARY KEY(num_contrato);
ALTER TABLE usuario ADD CONSTRAINT pk_usuario PRIMARY KEY(login);



/* Chaves estrangeiras */

ALTER TABLE cliente ADD CONSTRAINT fk_pess_cli FOREIGN KEY(cpf) REFERENCES pessoa(cpf);
ALTER TABLE funcionario ADD CONSTRAINT fk_pess_fun FOREIGN KEY(cpf) REFERENCES pessoa(cpf);
ALTER TABLE funcionario ADD CONSTRAINT fk_car_fun FOREIGN KEY(cod_cargo) REFERENCES cargo(cod);

ALTER TABLE endereco_pessoa ADD CONSTRAINT fk_pss_end FOREIGN KEY(cpf) REFERENCES pessoa(cpf);
ALTER TABLE telefone ADD CONSTRAINT fk_pss_tel FOREIGN KEY(cpf) REFERENCES pessoa(cpf);

ALTER TABLE terreno ADD CONSTRAINT fk_imv_ter FOREIGN KEY(cod) REFERENCES imovel(cod);
ALTER TABLE comercial ADD CONSTRAINT fk_imv_com FOREIGN KEY(cod) REFERENCES imovel(cod);
ALTER TABLE apartamento ADD CONSTRAINT fk_imv_ap FOREIGN KEY(cod) REFERENCES imovel(cod);
ALTER TABLE casa ADD CONSTRAINT fk_imv_cas FOREIGN KEY(cod) REFERENCES imovel(cod);

ALTER TABLE endereco_imovel ADD CONSTRAINT fk_imv_end FOREIGN KEY(cod_imov) REFERENCES imovel(cod);
ALTER TABLE comissao_fun ADD CONSTRAINT fk_fun_comss FOREIGN KEY(cpf_funcionario) REFERENCES funcionario(cpf);
ALTER TABLE comissao_fun ADD CONSTRAINT fk_trans_comss FOREIGN KEY(num_contrato) REFERENCES transacao(num_contrato);

ALTER TABLE proprietario_imv ADD CONSTRAINT fk_cli_prop FOREIGN KEY(cpf_cliente_prorpietario) REFERENCES cliente(cpf);
ALTER TABLE proprietario_imv ADD CONSTRAINT fk_imv_prop FOREIGN KEY(cod_imovel) REFERENCES imovel(cod);

ALTER TABLE transacao ADD CONSTRAINT fk_cli_prop_trns FOREIGN KEY(cpf_cliente_prorpietario) REFERENCES cliente(cpf);
ALTER TABLE transacao ADD CONSTRAINT fk_cli_usua_trns FOREIGN KEY(cpf_cliente_usuario) REFERENCES cliente(cpf);
ALTER TABLE transacao ADD CONSTRAINT fk_fun_trns FOREIGN KEY(cpf_funcionario) REFERENCES funcionario(cpf);
ALTER TABLE transacao ADD CONSTRAINT fk_imv_trns FOREIGN KEY(cod_imovel) REFERENCES imovel(cod);
