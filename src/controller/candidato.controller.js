const db = require("../config/db.config.js");
const Candidato = db.candidato;

exports.create = async function(req, res){
    try {
        const candidato = await Candidato.create({
            nome: req.body.nome
        });
        if (candidato) {
            return res.status(201).send({success: true, alert: "Candidato cadastrado."});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível cadastrar o candidato."});
    }
}

exports.update = async function(req, res){
    try {
        const candidato = await Candidato.update({
            nome: req.body.nome
        },{
            where: {
                id_candidato: req.params.idCandidato
            }
        });
        if (candidato){
            return res.status(200).send({success: true, alert: "Candidato atualizado."});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível atualizar o candidato."});
    }
}

exports.findOne = async function(req, res){
    try {
        const candidato = await Candidato.findByPk(req.params.id);
        if (candidato) {
            return res.status(200).send(candidato);
        }
        return res.status(404).send({success: false, alert: "Candidato não encontrado."});
    } catch (err) {
        return res.status(500).send({success: false, alert: "Não foi possível localizar o candidato."});
    }
}

exports.findByNome = async function(req, res){
    try {
        const candidato = await Candidato.findOne({
            where: {
                nome: req.params.nome
            }
        });
        if (candidato) {
            return res.status(200).send(candidato);
        }
        return res.status(404).send({success: false, alert: "Candidato não encontrado."});
    } catch (err) {
        return res.status(500).send({success: false, alert: "Não foi possível localizar o candidato."});
    }
}

exports.findAll = async function(req, res){
    try {
        const candidatos = await Candidato.findAll();
        if (candidatos) {
            return res.status(200).send(candidatos);
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível listar todos os candidatos."})
    }
}

exports.deleteCandidato = async function(req, res) {
	try {
		const candidato = await Candidato.findOne({
            where: {
                id_candidato: req.params.id
            }
        });
		if (candidato) {
			await Candidato.destroy({
                where: {
                    id_candidato: req.params.id
                }
            });
			return res.status(200).send({success: true, alert: "Candidato deletado com sucesso."});
		}
		return res.status(404).send({success: false, alert: "Candidato não encontrado."});
	} catch (err) {
        console.log(err);
		return res.status(500).send({success: false, alert: "Não foi possível deletar o candidato."});
	}
}
