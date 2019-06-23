module.exports = (sequelize, Sequelize) => {
    const Prova = sequelize.define("prova", {
        id_prova: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_candidato: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        data_prova: {
            type: Sequelize.DATE
        },
        tipo: {
            type: Sequelize.STRING(8)
        },
        pontos: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        tablename: "prova",
        timestamps: false
    });
    return Prova;
}
