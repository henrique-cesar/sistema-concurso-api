var express = require("express");
var router = express.Router();

const concurso = require("../controller/concurso.controller");
const cargo = require("../controller/cargo.controller");

router.post("/create", concurso.create);

router.get("/:idConcurso", concurso.findOne);

router.get("/:idOrgao/all", concurso.findAll);

router.put("/:idConcurso/update", concurso.update);

router.delete("/:idConcurso/delete", concurso.delete);

router.post("/:idConcurso/cargo/create", cargo.create);

router.get("/:idConcurso/cargo/:idCargo", cargo.findOne);

router.get("/:idConcurso/cargos", cargo.findAll);

router.put("/:idConcurso/cargo/:idCargo/update", cargo.update);

router.delete("/:idConcurso/cargo/:idCargo/update", cargo.delete);

module.exports = router;
