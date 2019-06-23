const db = require('../config/db.config.js');
const Conteudo = db.conteudo;
const ConteudoAuto = db.conteudoAuto;

exports.create = async function(req, res){
    try {
        const conteudo = await Conteudo.create({
            titulo: req.body.titulo,
            descricao: req.body.descricao
        });
        if (conteudo) {
            res.status(201).send({success: true, alert: "Conteúdo cadastrado."});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({success: false, alert: "Não foi possível cadastrar o conteúdo."});
    }
}

exports.update = async function(req, res){
    try {
        const conteudo = await Conteudo.update({
            titulo: req.body.titulo,
            descricao: req.body.descricao
        },{
            where: {
                id_conteudo: req.params.idConteudo
            }
        });
        if (conteudo){
            res.status(200).send({success: true, alert: "Conteúdo atualizado."});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({success: false, alert: "Não foi possível atualizar o conteúdo."});
    }
}

exports.subConteudo = async function(req, res){
    try {
        const relacao = await ConteudoAuto.create({
            id_conteudo_pai: req.body.idPai,
            id_conteudo_filho: req.body.idFilho
        });
        if (relacao) {
            res.status(201).send({success: true, alert: "Relação criada."})
        }
    } catch (err){
        console.log(err)
        res.status(500).send({success: false, alert: "Não foi possível criar a relação."})
    }
}

exports.findAll = async function(req, res){
    try {
        const conteudos = await Conteudo.findAll();
        if (conteudos) {
            res.status(200).send(conteudos);
        }
    } catch(err) {
        console.log(err);
        res.status(500).send({success: false, alert: "Não foi possível listar todos os conteúdos."})
    }
}

exports.findSubConteudos = async function(req, res){
    try {
        const conteudos = await ConteudoAuto.findAll({
            where : {id_conteudo_pai: req.params.idPai},
            attributes: [],
            include: [{model: Conteudo, as: "Subconteudo"}]
        });
        if (conteudos){
            res.status(200).send(conteudos);
        }
    } catch(err){
        console.log(err);
        res.status(500).send({success: false, alert: "Não foi possível listar os subconteúdos."});
    }
}

exports.deleteConteudo = async function(req, res) {
	try {
		const conteudo = await Conteudo.findOne({
            where: {
                id_conteudo: req.params.id
            }
        });
		if (conteudo) {
			await Conteudo.destroy({
                where: {
                    id_conteudo: req.params.id
                }
            });
			res.status(200).send({success: true, alert: "Conteúdo deletado com sucesso."});
		} else {
			res.status(404).send({success: false, alert: "Conteúdo não encontrado"});
		}
	} catch (err) {
        console.log(err)
		res.status(500).send({success: false, alert: "Não foi possível deletar o conteúdo"});
	}
};
