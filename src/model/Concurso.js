module.exports = (sequelize, Sequelize) => {
    const Concurso = sequelize.define("concurso", {
        id_concurso: {
            type: Sequelize.INTEGER,
		    primaryKey: true,
		    autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING(45)
        },
        orgao: {
            type: Sequelize.STRING(45)
        },
        ano: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        tablename: "concurso",
        timestamps: false
    });
    return Concurso;
};
