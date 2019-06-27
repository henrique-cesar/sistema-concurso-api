const db = require("../config/db.config");
const Prova = db.prova;
const ProvaPontos = db.provaPontos;
const ProvaTeorica = db.provaTeorica;
const Candidato = db.candidato;
const CargoConteudo = db.cargoConteudo;
const TeoricaConteudo = db.teoricaConteudo;
const Cargo = db.cargo;
const Concurso = db.concurso;
const Orgao = db.orgao;
const Op = db.op;

exports.create = async function(req, res){
    try {
        const candidato = await Candidato.findByPk(req.body.idCandidato);
        if (candidato) {
            const prova = await Prova.create({
                data_realizacao: req.body.dataRealizacao,
                id_candidato: req.body.idCandidato,
                id_cargo: req.body.idCargo
            });
            if (req.body.tipo == "teorica") {
                console.log("aqui");
                await ProvaTeorica.create({
                    data_realizacao: req.body.dataRealizacao,
                    id_candidato: req.body.idCandidato
                });
                console.log("aqui2")
                conteudos = await CargoConteudo.findAll({
                    attributes: ["id_conteudo", "cod_dificuldade"],
                    where: {
                        id_cargo: req.body.idCargo
                    },
                    raw: true
                });
                for (c in conteudos) {
                    console.log(conteudos);
                    await TeoricaConteudo.create({
                        data_realizacao: req.body.dataRealizacao,
                        id_candidato: req.body.idCandidato,
                        id_conteudo: conteudos[c].id_conteudo,
                        cod_dificuldade: conteudos[c].cod_dificuldade
                    });
                }
            } else {
                await ProvaPontos.create({
                    data_realizacao: req.body.dataRealizacao,
                    id_candidato: req.body.idCandidato
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
            data_realizacao: req.body.dataNova
        },{
            where: {
                id_candidato: req.body.idCandidato,
                data_realizacao: req.body.dataAntiga
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
                data_realizacao: req.body.data
            }
        });
        if (prova) {
            await Prova.destroy({
                where: {
                    id_candidato: req.body.idCandidato,
                    data_realizacao: req.body.data
                }
            });
            return res.status(200).send({success: true, alert: "Prova deletada com sucesso."});
        }
        return res.status(404).send({success: false, alert: "Prova não encontrada."});
    } catch (err) {
        console.log(err);
        return res.status(500).send({sucess: false, alert: "Não foi possível deletar a prova."});
    }
}

// FIND FUNCTIONS


exports.findOne = async function(req, res) {
    try {
        const date = req.query.date
        const prova = await Prova.findOne({
            attributes: ["data_realizacao", "id_candidato"],
            where: {
                id_candidato: req.params.idCandidato,
                data_realizacao: date
            },
            include: [{
                model: Cargo,
                attributes: ["descricao", "id_cargo"], 
                include: {
                    model: Concurso,
                    attributes: { exclude: ["id_orgao"] },
                    include: {model: Orgao}
                }
            }, {
                model: Candidato,
                attributes: ["nome"]
            }]
        });
        if (prova) {
            return res.status(200).send(prova);
        }
        return res.status(404).send({sucess: false, alert: "Prova não encontrada."});
    } catch (err) {
        console.log(err);
        return res.status(500).send({success: false, alert: "Não foi possível localizar a prova."});
    }
}

exports.findAllByCandidato = async function(req, res) {
    try {
        const provas = await Prova.findAll({
            attributes: ["data_realizacao", "id_candidato"],
            where: {
                id_candidato: req.params.idCandidato
            },
            include: [{
                model: Cargo,
                attributes: ["descricao", "id_cargo"], 
                include: {
                    model: Concurso,
                    attributes: { exclude: ["id_orgao"] },
                    include: {model: Orgao}
                }
            }, {
                model: Candidato,
                attributes: ["nome"]
            }]
        });
        return res.status(200).send(provas);
    } catch (err) {
        return res.status(500).send({success: false, alert: "Não foi possível localizar as provas do candidato."});
    }
}

exports.findAllByPeriodo = async function(req, res) {
    try {
        const provas = await Prova.findAll({
            attributes: ["data_realizacao", "id_candidato"],
            where: {
                id_candidato: req.params.idCandidato,
                data_realizacao: {
                    [Op.between]: [req.query.dataInicio, req.query.dataFim]
                }
            },
            include: [{
                model: Cargo,
                attributes: ["descricao", "id_cargo"], 
                include: {
                    model: Concurso,
                    attributes: { exclude: ["id_orgao"] },
                    include: {model: Orgao}
                }
            }, {
                model: Candidato,
                attributes: ["nome"]
            }]
        });
        return res.status(200).send(provas);
    } catch (err) {
        return res.status(500).send({success: false, alert: "Não foi possível localizar as provas do candidato."})
    }
}
