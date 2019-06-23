module.exports = (sequelize, Sequelize) => {
    const ProvaConteudo = sequelize.define("provaconteudo", {
        id_prova: {
            type: Sequelize.INTEGER,
		    primaryKey: true,
		    foreignKey: true
        },
        id_conteudo: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            foreignKey: true
        }
    }, {
        freezeTableName: true,
        tablename: "provaconteudo",
        timestamps: false
    });
    return ProvaConteudo;
}
