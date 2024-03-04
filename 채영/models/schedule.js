const Sequelize = require('sequelize');

class Schedule extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            schedule_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
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
              schname: {
                type: Sequelize.STRING,
                allowNull: false
              },
              schcontent: {
                type: Sequelize.STRING,
                allowNull: true
              },
              time: {
                type: Sequelize.TIME,
                allowNull: true
              },
              date: {
                type: Sequelize.DATE,
                allowNull: false
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


    static associate(models){
      this.belongsTo(models.User, { foreignKey: 'user_id' });
        this.belongsTo(models.Club, { foreignKey: 'club_id' });
        this.belongsTo(models.Subclub, { foreignKey: 'sub_id' });
    }
};

module.exports = Schedule;