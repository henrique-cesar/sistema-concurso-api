var express = require('express');
var router = express.Router();

const conteudo = require("../controller/conteudo.controller")

router.post('/create', conteudo.create);

router.put('/update/:idConteudo', conteudo.update);

router.post('/create/relation', conteudo.subConteudo);

router.get('/all', conteudo.findAll);

router.get('/all/:id', conteudo.findByPk);

router.get('/all/:idPai', conteudo.findSubConteudos);

router.put('/delete/:id', conteudo.deleteConteudo);

module.exports = router;
