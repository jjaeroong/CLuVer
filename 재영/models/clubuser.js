
const {Sequelize} = require("sequelize");



class Clubuser extends Sequelize.Model {
  static initiate(sequelize) {
    Clubuser.init({
      clubuserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      clubId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      joinDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      club_cate: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
}, {
    sequelize,
    timestamps: false,
    underscored: false,
    modelName: 'Clubuser',
    tableName: 'clubuser',
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

     
    
      
   
  
 }

 
  static associate(db) {
    Clubuser.belongsTo(db.User, { foreignKey: "clubuserId", sourceKey: "id", onDelete: "CASCADE"});
    Clubuser.belongsTo(db.Club, { foreignKey: "clubId" , sourceKey: "club_id", onDelete: "CASCADE"});

  }
}


module.exports = Clubuser;