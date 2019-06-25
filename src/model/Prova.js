module.exports = (sequelize, Sequelize) => {
    const Prova = sequelize.define("prova", {
        data_prova: {
            type: Sequelize.DATEONLY,
            primaryKey: true
        },
        id_candidato: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        tipo: {
            type: Sequelize.STRING(8)
        },
        pontos: {
            type: Sequelize.INTEGER
        },
        nota: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        tablename: "prova",
        timestamps: false
    });
    return Prova;
}
