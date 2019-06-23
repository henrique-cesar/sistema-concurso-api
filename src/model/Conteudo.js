module.exports = (sequelize, Sequelize) => {
    const Conteudo = sequelize.define("conteudo", {
        id_conteudo: {
            type: Sequelize.INTEGER
        },
        titulo: {
            type: Sequelize.STRING(45)
        },
        descricao: {
            type: Sequelize.STRING(256)
        }
    }, {
        freezeTableName: true,
        tablename: "conteudo",
        timestamps: false
    });
    return Conteudo;
}
