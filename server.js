const express = require("express");
const cors = require("cors");

const conteudo = require("./src/route/conteudo.route.js");
const concurso = require("./src/route/concurso.route.js");
const candidato = require("./src/route/candidato.route.js");
const orgao = require("./src/route/orgao.route.js");
const prova = require("./src/route/prova.route.js");

var app = express();
var bodyParser = require("body-parser");
const db = require("./src/config/db.config.js");

db.sequelize.sync().then(() => {});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
	cors({
		origin: "*"
	})
);
app.use("/conteudo", conteudo);
app.use("/candidato", candidato);
app.use("/concurso", concurso);
app.use("/orgao", orgao);
app.use("/prova", prova);
app.listen(4000);
module.exports = app;
