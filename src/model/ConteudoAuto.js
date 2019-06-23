module.exports = (sequelize, Sequelize) => {
    const ConteudoAuto = sequelize.define("conteudo_ref", {
        id_conteudo_pai: {
            type: Sequelize.INTEGER,
		    primaryKey: true,
		    foreignKey: true
        },
        id_conteudo_filho: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            foreignKey: true
        }
    }, {
        freezeTableName: true,
        tablename: "conteudo_ref",
        timestamps: false
    });
    return ConteudoAuto;
}
