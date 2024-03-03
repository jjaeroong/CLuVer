const {Sequelize} = require("sequelize");


class Subclub extends Sequelize.Model {
  static initiate(sequelize) {
    Subclub.init({
      id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        primaryKey: true
      },
      subclubname : {
        type : Sequelize.STRING(255),
        allowNull : false,
      },
      subcontent: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      club_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      
      // createdAt : {
      //   type : Sequelize.DATE,
      //   allowNull : false,
      //   defaultValue : Sequelize.NOW, //DEFAULT now()
      // },
      // updatedAt:{
      //   type : Sequelize.DATE,
      //   allowNull : false,
      //   defaultValue : Sequelize.NOW, //DEFAULT now() 
      // },
      
    }, {
      sequelize,
      timestamps : true,
      underscored : false,
      modelName : "Subclub",
      tableName : "subclubs",
      paranoid : false,
      charset : "utf8",
      collate : "utf8_general_ci",
  });
  
}

 
  static associate(db) {
    // Subclub과 SubClubUser 간의 1:N 관계 설정
  
    // Subclub.hasMany(db.SubClubUser, {
    //   foreignKey: "subclubcode",
    //   sourceKey: "id",
    //   onDelete: "CASCADE",
    // });
    // db.SubClubUser.belongsTo(db.User, { foreignKey: 'joinuserId', targetKey: "id", onDelete: "CASCADE"});
    Subclub.belongsToMany(db.User, { through: db.SubclubUser });
    Subclub.hasMany(db.Schedule, { foreignKey: 'sub_id', targetKey: "id", onDelete: "CASCADE" });
    
  }
}

module.exports = Subclub;
