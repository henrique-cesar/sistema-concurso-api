module.exports = (sequelize, Sequelize) => {
    const Candidato = sequelize.define("candidato", {
        id_candidato: {
            type: Sequelize.INTEGER,
		    primaryKey: true,
		    autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING(45),
        }
    }, {
        freezeTableName: true,
        tablename: "candidato",
        timestamps: false
    });
    return Candidato;
}
