const Sequelize = require('sequelize');

class Subclubuser extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
              },
              club_id: {
                type: Sequelize.INTEGER,
                allowNull: true
              },
              sub_id: {
                type: Sequelize.INTEGER,
                allowNull: true
              },
              joinDate: {
                type: Sequelize.DATE,
                allowNull: true
              },
              cate: {
                type: Sequelize.INTEGER,
                allowNull: false
              },
             
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Subclubuser',
            tableName: 'subclubuser',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }


    static associate(db){}
};

module.exports = Subclubuser;
