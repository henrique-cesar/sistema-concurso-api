const db = require("../config/db.config.js");
const Orgao = db.orgao;

exports.create = async function(req, res){
    try {
        const orgao = await Orgao.create({
            nome: req.body.nome
        });
        if (orgao) {
            return res.status(201).send({success: true, alert: "Órgão cadastrado."});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível cadastrar o órgão."});
    }
}

exports.update = async function(req, res){
    try {
        const orgao = await Orgao.update({
            nome: req.body.nome
        },{
            where: {
                id_orgao: req.params.idOrgao
            }
        });
        if (orgao){
            return res.status(200).send({success: true, alert: "Órgão atualizado."});
        }
        return res.status(404).send({success: false, alert: "Órgão não encontrado."});
    } catch (err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível atualizar o órgão."});
    }
}

exports.findOne = async function(req, res){
    try {
        const orgao = await Orgao.findByPk(req.params.idOrgao);
        if (orgao) {
            return res.status(200).send(orgao);
        }
        return res.status(404).send({success: false, alert: "Órgão não encontrado."});
    } catch (err) {
        return res.status(500).send({success: false, alert: "Não foi possível localizar o órgão."});
    }
}

exports.findAll = async function(req, res){
    try {
        const orgaos = await Orgao.findAll();
        if (orgaos) {
            return res.status(200).send(orgaos);
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível listar todos os órgãos."})
    }
}

exports.delete = async function(req, res) {
	try {
		const orgao = await Orgao.findOne({
            where: {
                id_orgao: req.params.idOrgao
            }
        });
		if (orgao) {
			await Orgao.destroy({
                where: {
                    id_orgao: req.params.idOrgao
                }
            });
			return res.status(200).send({success: true, alert: "Órgão deletado com sucesso."});
		}
		return res.status(404).send({success: false, alert: "Órgão não encontrado."});
	} catch (err) {
        console.log(err);
		return res.status(500).send({success: false, alert: "Não foi possível deletar o órgão."});
	}
}
