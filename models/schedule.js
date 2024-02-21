//user.js

const Sequelize = require('sequelize');

class Schedule extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            schedule_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
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
              schname: {
                type: Sequelize.STRING,
                allowNull: false
              },
              schcontent: {
                type: Sequelize.STRING,
                allowNull: true
              },
              stattime: {
                type: Sequelize.DATE,
                allowNull: true
              },
              endtime: {
                type: Sequelize.DATE,
                allowNull: true
              },
              
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Schedule',
            tableName: 'schedule',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }


    static associate(db){}
};

module.exports = Schedule;