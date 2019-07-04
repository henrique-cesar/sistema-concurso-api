var express = require('express');
var router = express.Router();

const candidato = require("../controller/candidato.controller")

router.post('/create', candidato.create);

router.put('/update/:idCandidato', candidato.update);

router.get('/all', candidato.findAll);

router.get("/:id", candidato.findOne);

router.get("/name/:nome", candidato.findByNome);

router.put('/delete/:id', candidato.deleteCandidato);

module.exports = router;
