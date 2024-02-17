//user.js

const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
              },
              username: {
                type: Sequelize.STRING,
                allowNull: false
              },
              id: {
                type: Sequelize.STRING,
                allowNull: false
              },
              password: {
                type: Sequelize.STRING,
                allowNull: false
              },
              birth: {
                type: Sequelize.DATE,
                allowNull: false
              },
              email: {
                type: Sequelize.STRING,
                allowNull: false
              },
              association: {
                type: Sequelize.STRING,
                allowNull: false
              },
              phone: {
                type: Sequelize.STRING,
                allowNull: false
              },
              cate: {
                type: Sequelize.INTEGER,
                allowNull: false
              },
              userLog: {
                type: Sequelize.INTEGER,
                allowNull: false
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


    static associate(models){
      this.hasMany(models.Clubuser, { foreignKey: 'user_id', sourceKey: 'user_id' });
    }
};

module.exports = User;
