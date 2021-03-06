module.exports = (sequelize, Sequelize) => {
    const Prova = sequelize.define("prova", {
        data_realizacao: {
            type: Sequelize.DATEONLY,
            primaryKey: true
        },
        id_candidato: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_cargo: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        tablename: "prova",
        timestamps: false
    });
    return Prova;
}
