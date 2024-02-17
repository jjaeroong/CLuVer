//user.js

const Sequelize = require('sequelize');

class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            comment_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
              },
              comment_content: {
                type: Sequelize.TEXT,
                allowNull: true
              },
              is_delete: {
                type: Sequelize.BOOLEAN,
                allowNull: true
              },
              comment_st: {
                type: Sequelize.DATE,
                allowNull: true
              },
              comment_like: {
                type: Sequelize.BIGINT,
                allowNull: false
              },
              post_id: {
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
                allowNull: true
              },
            
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Comment',
            tableName: 'comment',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }


    static associate(db){}
};

module.exports = User;
