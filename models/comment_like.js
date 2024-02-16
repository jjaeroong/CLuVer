//user.js

const Sequelize = require('sequelize');

class Comment_like extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            comment_like_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
              },
              comment_id: {
                type: Sequelize.BIGINT,
                allowNull: true
              },
              user_id: {
                type: Sequelize.BIGINT,
                allowNull: true
              },
              club_id: {
                type: Sequelize.INTEGER,
                allowNull: true
              },
              sub_id: {
                type: Sequelize.INTEGER,
                allowNull: false
              },
             
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Comment_like',
            tableName: 'comment_like',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }


    static associate(db){}
};

module.exports = User;
