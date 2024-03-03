const {Sequelize} = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true

        },
        username: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false,
        }
     
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
    static associate(db) {
      db.User.hasMany(db.Post, {
        foreignKey: "user_id",
        sourceKey: "id",
        onDelete: "CASCADE",
      });
      // User와 SubClubUser 간의 1:N 관계 설정
  
      // db.User.hasMany(db.SubclubUser, {
      //   foreignKey: "userId",
      //   sourceKey: "id",
      //   onDelete: "CASCADE",
      // });
      db.User.belongsToMany(db.Subclub, { through: db.SubclubUser });
      db.User.belongsToMany(db.Club, { through: db.Clubuser  ,foreignKey: 'clubuserId', otherKey: 'clubId'});
      db.User.hasMany(db.Schedule, {
        foreignKey: "user_id",
        sourceKey: "id",
        onDelete: "CASCADE",
      });
    }
}

module.exports = User;