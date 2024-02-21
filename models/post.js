
const Sequelize = require('sequelize');

class Post extends Sequelize.Model{
    static init(sequelize){
        super.init({
            post_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
              },
              post_title: {
                type: Sequelize.STRING,
                allowNull: true
              },
              post_content: {
                type: Sequelize.TEXT,
                allowNull: true
              },
              post_hits: {
                type: Sequelize.BIGINT,
                allowNull: true
              },
              post_like_number: {
                type: Sequelize.BIGINT,
                allowNull: false
              },
              post_create_at: {
                type: Sequelize.DATE,
                allowNull: true
              },
              post_modified_at: {
                type: Sequelize.DATE,
                allowNull: true
              },
              post_cate: {
                type: Sequelize.BOOLEAN,
                allowNull: true
              },
              postLog: {
                type: Sequelize.INTEGER,
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
            modelName: 'Post',
            tableName: 'post',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){}
};

module.exports = Post;
