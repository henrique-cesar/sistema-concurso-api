module.exports = (sequelize, Sequelize) => {
    const Orgao = sequelize.define("orgao", {
        id_orgao: {
            type: Sequelize.INTEGER,
		    primaryKey: true,
		    autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING(45),
        }
    }, {
        freezeTableName: true,
        tablename: "orgao",
        timestamps: false
    });
    return Orgao;
}
