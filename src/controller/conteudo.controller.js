const db = require('../config/db.config.js');
const Conteudo = db.conteudo;
const ConteudoAuto = db.conteudoAuto;

exports.create = async function(req, res){
    console.log(req.body)
    try {
        const conteudo = await Conteudo.create({
            titulo: req.body.titulo,
            descricao: req.body.descricao
        });
        if (conteudo) {
            return res.status(201).send({success: true, alert: "Conteúdo cadastrado."});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível cadastrar o conteúdo."});
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
            return res.status(200).send({success: true, alert: "Conteúdo atualizado."});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível atualizar o conteúdo."});
    }
}

exports.subConteudo = async function(req, res){
    try {
        const relacao = await ConteudoAuto.create({
            id_conteudo_pai: req.body.idPai,
            id_conteudo_filho: req.body.idFilho
        });
        if (relacao) {
            return res.status(201).send({success: true, alert: "Relação criada."})
        }
    } catch (err){
        console.log(err)
        return res.status(500).send({success: false, alert: "Não foi possível criar a relação."})
    }
}

exports.findAll = async function(req, res){
    try {
        const conteudos = await Conteudo.findAll();
        if (conteudos) {
            return res.status(200).send(conteudos);
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível listar todos os conteúdos."})
    }
}

exports.findByPk = async function(req, res){
    try {
        const conteudo = await Conteudo.findByPk(req.params.id);
        if (conteudo) {
            return res.status(200).send(conteudo);
        }
        return res.status(404).send({success: false, alert: "Conteudo não encontrado."});
    } catch (err) {
        return res.status(500).send({success: false, alert: "Não foi possível localizar o conteúdo."});
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
            return res.status(200).send(conteudos);
        }
    } catch(err){
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível listar os subconteúdos."});
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
			return res.status(200).send({success: true, alert: "Conteúdo deletado com sucesso."});
		}
		return res.status(404).send({success: false, alert: "Conteúdo não encontrado."});
	} catch (err) {
        console.log(err);
		return res.status(500).send({success: false, alert: "Não foi possível deletar o conteúdo."});
	}
}
