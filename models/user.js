//user.js

const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
              },
              username: {
                type: Sequelize.TEXT,
                allowNull: true
              },
              id: {
                type: Sequelize.BIGINT,
                allowNull: true
              },
              password: {
                type: Sequelize.BIGINT,
                allowNull: true
              },
              birth: {
                type: Sequelize.DATE,
                allowNull: false
              },
              email: {
                type: Sequelize.STRING,
                allowNull: true
              },
              association: {
                type: Sequelize.STRING,
                allowNull: true
              },
              phone: {
                type: Sequelize.BIGINT,
                allowNull: true
              },
              cate: {
                type: Sequelize.BIGINT,
                allowNull: true
              },
              userLog: {
                type: Sequelize.STRING,
                allowNull: true
              },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'user',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }


    static associate(db){}
};

module.exports = User;
