const db = require("../config/db.config.js");
const Orgao = db.orgao;
const Concurso = db.concurso;

exports.create = async function(req, res) {
    try {
        const orgao = await Orgao.findOne({
            where: {
                id_orgao: req.body.idOrgao
            }
        });
        if (orgao) {
            const concurso = await Concurso.create({
                id_orgao: req.body.idOrgao,
                nome: req.body.nome,
                ano: req.body.ano
            });
            if (concurso) {
                res.status(201).send({success: true, alert: "Concurso cadastrado."});
            }
        }
    } catch (err) {
        console.log(err);
        res.status(404).send({success: false, alert: "Não foi possível cadastrar o concurso."});
    }
}

exports.update = async function(req, res){
    try {
        const concurso = await Concurso.update({
            ano: req.body.ano
        },{
            where: {
                id_concurso: req.params.idConcurso
            }
        });
        if (concurso){
            return res.status(200).send({success: true, alert: "Concurso atualizado."});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível atualizar o concurso."});
    }
}

exports.findOne = async function(req, res){
    try {
        const concurso = await Concurso.findOne({
            attributes: ["nome", "ano"],
            where: { id_concurso: req.params.idConcurso},
            include: [{model: Orgao}]
        });
        if (concurso) {
            return res.status(200).send(concurso);
        }
        return res.status(404).send({success: false, alert: "Concurso não encontrado."});
    } catch (err) {
        return res.status(500).send({success: false, alert: "Não foi possível localizar o concurso."});
    }
}

exports.findAll = async function(req, res){
    try {
        const concursos = await Concurso.findAll({
            attributes: { exclude: ["id_orgao"]},
            where: {
                id_orgao: req.params.idOrgao
            }
        });
        if (concursos) {
            return res.status(200).send(concursos);
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível listar todos os concursos."})
    }
}

exports.delete = async function(req, res) {
	try {
		const concurso = await Concurso.findOne({
            where: {
                id_concurso: req.params.idConcurso
            }
        });
		if (concurso) {
			await Concurso.destroy({
                where: {
                    id_concurso: req.params.idConcurso
                }
            });
			return res.status(200).send({success: true, alert: "Concurso deletado com sucesso."});
		}
		return res.status(404).send({success: false, alert: "Concurso não encontrado."});
	} catch (err) {
        console.log(err);
		return res.status(500).send({success: false, alert: "Não foi possível deletar o concurso."});
	}
}
