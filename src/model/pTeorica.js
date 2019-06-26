module.exports = (sequelize, Sequelize) => {
    const ProvaTeorica = sequelize.define("p_teorica", {
        data_realizacao: {
            type: Sequelize.DATEONLY,
            primaryKey: true
        },
        id_candidato: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nota: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        tablename: "p_teorica",
        timestamps: false
    });
    return ProvaTeorica;
}
