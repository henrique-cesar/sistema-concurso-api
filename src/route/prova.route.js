var express = require('express');
var router = express.Router();

const prova = require("../controller/prova.controller");

router.post('/create', prova.create);

router.delete('/delete', prova.delete);

router.put('/alterarData', prova.updateData);

router.get('/:idCandidato', prova.findOne);

router.get('/:idCandidato/all', prova.findAllByCandidato);

router.get('/:idCandidato/find', prova.findAllByPeriodo);

module.exports = router;
