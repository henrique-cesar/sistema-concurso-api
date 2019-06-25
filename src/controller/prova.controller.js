const db = require("../config/db.config");
const Candidato = db.candidato;
const Prova = db.prova;
const Op = db.op;

exports.create = async function(req, res){
    try {
        const candidato = await Candidato.findByPk(req.body.idCandidato);
        if (candidato) {
            var prova;
            if (req.body.tipo == "teorica") {
                prova = await Prova.create({
                    data_prova: req.body.dataProva,
                    id_candidato: req.body.idCandidato,
                    tipo: "titulos",
                    pontos: req.body.pontos
                });
            } else {
                prova = await Prova.create({
                    data_prova: req.body.dataProva,
                    id_candidato: req.body.idCandidato,
                    tipo: "teorica",
                    nota: req.body.nota
                });
            }
            if (prova) {
                return res.status(201).send({success: true, alert: "Prova criada com sucesso."});
            }            
            return res.status(400).send({success: false, alert: "Não foi possível cadastrar a prova."});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Erro: ao cadastrar a prova."});
    } 
}

exports.updateData = async function(req, res) {
    try {
        const prova = await Prova.update({
            data_prova: req.body.dataNova
        },{
            where: {
                id_candidato: req.body.idCandidato,
                data_prova: req.body.dataAntiga
            }
        });
        if (prova[0]) {
            return res.status(200).send({success: true, alert: "Prova atualizada."});
        }
        return res.status(404).send({success: false, alert: "Prova não encontrada."});
    } catch (err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível atualizar a prova."});
    }
}

exports.delete = async function(req, res) {
    try {
        const prova = await Prova.findOne({
            where: {
                id_candidato: req.body.idCandidato,
                data_prova: req.body.data
            }
        });
        if (prova) {
            await Prova.destroy({
                where: {
                    id_candidato: req.body.idCandidato,
                    data_prova: req.body.data
                }
            });
            return res.status(200).send({success: true, alert: "Prova deletada com sucesso."});
        }
        return res.status(404).send({success: false, alert: "Prova não encontrada."});
    } catch (err) {
        return res.status(500).send({sucess: false, alert: "Não foi possível deletar a prova."});
    }
}

// FIND FUNCTIONS


exports.findOne = async function(req, res) {
    try {
        const date = req.query.date
        const prova = await Prova.findOne({
            where: {
                id_candidato: req.params.idCandidato,
                data_prova: date
            }
        });
        if (prova) {
            return res.status(200).send(prova);
        }
        return res.status(404).send({sucess: false, alert: "Prova não encontrada."});
    } catch (err) {
        return res.status(500).send({success: false, alert: "Não foi possível localizar a prova."});
    }
}

exports.findAllByCandidato = async function(req, res) {
    try {
        const provas = await Prova.findAll({
            where: {
                id_candidato: req.params.idCandidato
            }
        });
        return res.status(200).send(provas);
    } catch (err) {
        return res.status(500).send({success: false, alert: "Não foi possível localizar as provas do candidato."});
    }
}

exports.findAllByPeriodo = async function(req, res) {
    try {
        const provas = await Prova.findAll({
            where: {
                id_candidato: req.params.idCandidato,
                data_prova: {
                    [Op.between]: [req.query.dataInicio, req.query.dataFim]
                }
            }
        });
        return res.status(200).send(provas);
    } catch (err) {
        return res.status(500).send({success: false, alert: "Não foi possível localizar as provas do candidato."})
    }
}
