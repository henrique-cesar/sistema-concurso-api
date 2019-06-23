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

//db.object = require("../model/Object.js")(sequelize, Sequelize);

/*
db.people.hasOne(db.object, {foreignKey: "idPeople"});
db.object.belongsTo(db.people, {foreignKey: "idPeople"});
*/

module.exports = db;
