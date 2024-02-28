const Sequelize = require('sequelize');

class Subclub extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            sub_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
              },
              subname: {
                type: Sequelize.STRING,
                allowNull: false
              },
              subcontent: {
                type: Sequelize.TEXT,
                allowNull: false
              },
              club_id: {
                type: Sequelize.INTEGER,
                allowNull: false
              },
              
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Subclub',
            tableName: 'subclub',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }


    static associate(db){}
};

module.exports = Subclub;
