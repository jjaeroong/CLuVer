const Sequelize = require('sequelize');

class Club extends Sequelize.Model{
    static init(sequelize){
        super.init({
            club_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
              },
              club_name: {
                type: Sequelize.STRING,
                allowNull: false
              },
              comment: {
                type: Sequelize.TEXT,
                allowNull: false
              },
              color: {
                type: Sequelize.STRING,
                allowNull: false
              },
              clubLog: {
                type: Sequelize.INTEGER,
                allowNull: false
              },
             
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Club',
            tableName: 'club',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    

    static associate(models){
      this.hasMany(models.Clubuser, {foreignKey: 'club_id' });
    }
};

module.exports = Club;
