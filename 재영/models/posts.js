const {Sequelize} = require("sequelize");

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init({
      post_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      post_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      post_content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      post_hits: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      post_like_number: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      post_create_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      post_modified_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      post_cate: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      postLog: {
        type: Sequelize.INTEGER,
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
    
    }, {
      sequelize,
      timestamps : true,
      underscored : false,
      modelName : "Post",
      tableName : "posts",
      paranoid : false,
      charset : "utf8",
      collate : "utf8_general_ci",
  });
}

  static associate(db){
    db.Post.belongsTo(db.User,{foreignKey : "user_id", targetKey: "id", onDelete: "CASCADE"});
    
  }

};

module.exports = Post;