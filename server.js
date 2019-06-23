const express = require("express");
const cors = require("cors");

const conteudo = require("./src/route/conteudo.route.js");

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
app.listen(4000);
module.exports = app;
