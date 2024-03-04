const Sequelize = require('sequelize');

class Club extends Sequelize.Model{
    static init(sequelize){
        super.init({
            club_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
              },
              club_name: {
                type: Sequelize.STRING,
                allowNull: true
              },
              comment: {
                type: Sequelize.TEXT,
                allowNull: true
              },
              color: {
                type: Sequelize.INTEGER,
                allowNull: true
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
      this.hasMany(models.Clubuser, { foreignKey: 'club_id' });
      this.hasMany(models.Subclub, { foreignKey: 'club_id' });
    }
};

module.exports = Club;
