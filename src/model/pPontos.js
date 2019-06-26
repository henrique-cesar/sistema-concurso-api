module.exports = (sequelize, Sequelize) => {
    const ProvaPontos = sequelize.define("p_pontos", {
        data_realizacao: {
            type: Sequelize.DATEONLY,
            primaryKey: true
        },
        id_candidato: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        pontos: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        tablename: "p_pontos",
        timestamps: false
    });
    return ProvaPontos;
}
