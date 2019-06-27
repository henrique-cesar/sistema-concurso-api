const db = require("../config/db.config.js");
const Concurso = db.concurso;
const Cargo = db.cargo;
const CargoConteudo = db.cargoConteudo;
const Conteudo = db.conteudo;
const Dificuldade = db.dificuldade;

exports.create = async function(req, res) {
    try {
        const concurso = await Concurso.findOne({
            where: {
                id_Concurso: req.body.idConcurso
            }
        });
        if (concurso) {
            const cargo = await Cargo.create({
                id_concurso: req.body.idConcurso,
                descricao: req.body.descricao
            });
            if (cargo) {
                res.status(201).send({success: true, alert: "Cargo cadastrado."});
            }
        }
    } catch (err) {
        console.log(err);
        res.status(404).send({success: false, alert: "Não foi possível cadastrar o cargo."});
    }
}

exports.update = async function(req, res){
    try {
        const cargo = await Cargo.update({
            descricao: req.body.descricao
        },{
            where: {
                id_cargo: req.params.idCargo
            }
        });
        if (cargo){
            return res.status(200).send({success: true, alert: "Cargo atualizado."});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível atualizar o cargo."});
    }
}

exports.findOne = async function(req, res){
    try {
        const cargo = await Cargo.findByPk(req.params.idCargo);
        if (cargo) {
            return res.status(200).send(cargo);
        }
        return res.status(404).send({success: false, alert: "Cargo não encontrado."});
    } catch (err) {
        return res.status(500).send({success: false, alert: "Não foi possível localizar o cargo."});
    }
}

exports.findAll = async function(req, res){
    try {
        const cargos = await Cargo.findAll({
            attributes: { exclude: ["id_concurso"] },
            where: {
                id_concurso: req.params.idConcurso
            }
        });
        if (cargos) {
            return res.status(200).send(cargos);
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível listar todos os cargos."})
    }
}

exports.delete = async function(req, res) {
	try {
		const cargo = await Cargo.findOne({
            where: {
                id_cargo: req.params.idCargp
            }
        });
		if (cargo) {
			await Cargo.destroy({
                where: {
                    id_cargo: req.params.idCargo
                }
            });
			return res.status(200).send({success: true, alert: "Cargo deletado com sucesso."});
		}
		return res.status(404).send({success: false, alert: "Cargo não encontrado."});
	} catch (err) {
        console.log(err);
		return res.status(500).send({success: false, alert: "Não foi possível deletar o cargo."});
	}
}

exports.addConteudo2Cargo = async function(req, res) {
    try {
        conteudo = await Conteudo.findByPk(req.body.idConteudo);
        if (conteudo) {
            CargoConteudo.create({
                id_cargo: req.params.idCargo,
                id_conteudo: req.body.idConteudo,
                cod_dificuldade: req.body.codDificuldade
            });
            return res.status(201).send({success: true, alert: "Conteúdo adicionado."});
        } return res.status(404).send({success: false, alert: "Conteúdo não encontrado."});
    } catch (err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível adicionar o conteúdo ao cargo."});
    }    
}

exports.getConteudosByCargo = async function(req, res) {
    try {
        conteudos = await CargoConteudo.findAll({
            attributes: [],
            where: {
                id_cargo: req.params.idCargo
            },
            include: [{model: Conteudo}, {model: Dificuldade, attributes: ["descricao"]}]
        });
        if (conteudos.length > 0) {
            return res.status(200).send(conteudos);
        } return res.status(200).send({success: true, alert: "Nenhum conteúdo listado."});
    } catch (err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível obter os conteúdos do cargo."});
    }
}
