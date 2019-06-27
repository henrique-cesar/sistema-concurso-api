module.exports = (sequelize, Sequelize) => {
    const Dificuldade = sequelize.define("dificuldade", {
        cod_dificuldade: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        descricao: {
            type: Sequelize.CHAR(16)
        }
    },
    {
        freezeTableName: true,
        tablename: "dificuldade",
        timestamps: false
    });
    return Dificuldade;
}
