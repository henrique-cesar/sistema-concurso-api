const database = "bd_concurso";
const username = "root";
const password = "";
const host = "localhost";
const dialect = "mysql";

const Sequelize = require("sequelize");
const sequelize = new Sequelize(database, username, password, {
	host: host,
	dialect: dialect,
	operatorsAliases: false,
	timezone: "-03:00"
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.op = Sequelize.Op;

db.candidato = require("../model/Candidato.js")(sequelize, Sequelize);
db.cargo = require("../model/Cargo.js")(sequelize, Sequelize);
db.cargoConteudo = require("../model/CargoConteudo.js")(sequelize, Sequelize);
db.concurso = require("../model/Concurso.js")(sequelize, Sequelize);
db.conteudo = require("../model/Conteudo.js")(sequelize, Sequelize);
db.conteudoAuto = require("../model/ConteudoAuto.js")(sequelize, Sequelize);
db.prova = require("../model/Prova.js")(sequelize, Sequelize);
db.provaConteudo = require("../model/ProvaConteudo.js")(sequelize, Sequelize);

//Relações do banco
db.candidato.hasMany(db.prova, {foreignKey: "id_candidato"});
db.prova.belongsTo(db.candidato, {foreignKey: "id_candidato"});

db.concurso.hasMany(db.cargo, {foreignKey: "id_concurso"});
db.cargo.belongsTo(db.concurso, {foreignKey: "id_concurso"});

db.conteudo.belongsToMany(db.cargo, {through: "cargoconteudo"});
db.cargo.belongsToMany(db.conteudo, {through: "cargoconteudo"});

db.conteudo.belongsToMany(db.conteudo, {as: "Subconteudos", through: db.conteudoAuto});
db.conteudoAuto.belongsTo(db.conteudo, {as: "Subconteudo", foreignKey: "id_conteudo_filho"});


module.exports = db;
