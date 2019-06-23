module.exports = (sequelize, Sequelize) => {
    const CargoConteudo = sequelize.define("cargoconteudo", {
        id_cargo: {
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
        tablename: "cargoconteudo",
        timestamps: false
    });
    return CargoConteudo;
}
