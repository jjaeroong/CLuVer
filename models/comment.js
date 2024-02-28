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
                allowNull: false
              },
              is_delete: {
                type: Sequelize.BOOLEAN,
                allowNull: false
              },
              comment_createAt: {
                type: Sequelize.DATE,
                allowNull: false
              },
              comment_like: {
                type: Sequelize.BIGINT,
                allowNull: false
              },
              post_id: {
                type: Sequelize.BIGINT,
                allowNull: false
              },
              user_id: {
                type: Sequelize.BIGINT,
                allowNull: false
              },
              club_id: {
                type: Sequelize.BIGINT,
                allowNull: false
              },
              sub_id: {
                type: Sequelize.BIGINT,
                allowNull: false
              },
              comment_like: Sequelize.BIGINT,
              allowNull: false
            
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

module.exports = Comment;
