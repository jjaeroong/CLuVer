const {Sequelize} = require("sequelize");


class SubclubUser extends Sequelize.Model {
  static initiate(sequelize) {
    SubclubUser.init({
      UserId : {
        type : Sequelize.INTEGER,
        allowNull : false,
      }
      ,
      subclubId: {
        type : Sequelize.INTEGER,
        allowNull : false,
      },
      sub_cate: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      createdAt: {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.NOW,
      },
      updatedAt: {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.NOW,
      },


     
    
      
    }, {
      sequelize,
      timestamps : true,
      underscored : false,
      modelName : "SubclubUser",
      tableName : "subclubusers",
      paranoid : false,
      charset : "utf8",
      collate : "utf8_general_ci",
  });
  
 }

 
  static associate(db) {
    SubclubUser.belongsTo(db.User,{foreignKey : "UserId", targetKey: "id", onDelete: "CASCADE"});
    SubclubUser.belongsTo(db.Subclub, { foreignKey: "subclubId",targetKey: "id", onDelete: "CASCADE" })

  }
}

module.exports = SubclubUser;
