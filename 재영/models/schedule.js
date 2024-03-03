//user.js



const {Sequelize} = require("sequelize");


class Schedule extends Sequelize.Model {
  static initiate(sequelize) {
    Schedule.init({
        schedule_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          user_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
          },
          club_id: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
          sub_id: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
          schname: {
            type: Sequelize.STRING,
            allowNull: false
          },
          schcontent: {
            type: Sequelize.STRING,
            allowNull: true
          },
          eventDate: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          eventtime: {
            type: Sequelize.STRING,
            allowNull: true,
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
      timestamps: false,
      underscored : false,
      modelName: 'Schedule',
      tableName: 'schedule',
      paranoid : false,
      charset : "utf8",
      collate : "utf8_general_ci",
  });
  
}

 
  static associate(db) {

    db.Schedule.belongsTo(db.User,{foreignKey : "user_id", targetKey: "id", onDelete: "CASCADE"});
    db.Schedule.belongsTo(db.Club,{foreignKey : "club_id", targetKey: "club_id", onDelete: "CASCADE"});
    db.Schedule.belongsTo(db.Subclub,{foreignKey : "sub_id", targetKey: "id", onDelete: "CASCADE"});
   
  }
}


module.exports = Schedule;
