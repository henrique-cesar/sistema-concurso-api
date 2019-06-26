const db = require("../config/db.config.js");
const Concurso = db.concurso;
const Cargo = db.cargo;

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
