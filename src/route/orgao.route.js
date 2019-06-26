var express = require('express');
var router = express.Router();

const orgao = require("../controller/orgao.controller");

router.post("/create", orgao.create);

router.get("/all/", orgao.findAll);

router.get("/:idOrgao", orgao.findOne);

router.delete("/:idOrgao/delete", orgao.delete);

module.exports = router;
