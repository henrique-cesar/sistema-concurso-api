module.exports = (sequelize, Sequelize) => {
    const Cargo = sequelize.define("cargo", {
        id_cargo: {
            type: Sequelize.INTEGER,
		    primaryKey: true,
		    autoIncrement: true
        },
        descricao: {
            type: Sequelize.STRING(256),
        },
        id_concurso: {
            type: Sequelize.INTEGER,
            foreignKey: true
        }
    }, {
        freezeTableName: true,
        tablename: "cargo",
        timestamps: false
    });
    return Cargo;
}
