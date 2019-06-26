module.exports = (sequelize, Sequelize) => {
    const TeoricaConteudo = sequelize.define("teorica_conteudo", {
        data_realizacao: {
            type: Sequelize.DATEONLY,
            primaryKey: true
        },
        id_candidato: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_conteudo: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            foreignKey: true
        }
    }, {
        freezeTableName: true,
        tablename: "teorica_conteudo",
        timestamps: false
    });
    return TeoricaConteudo;
}
