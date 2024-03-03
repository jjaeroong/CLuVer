const Sequelize = require('sequelize');

class Club extends Sequelize.Model{
    static init(sequelize){
        super.init({
            club_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
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
    

    static associate(db){
      Club.hasMany(db.Schedule, { foreignKey: 'club_id' });
      Club.belongsToMany(db.User, { through: db.Clubuser,foreignKey: 'clubId', otherKey: 'clubuserId'});
     
    }
};

module.exports = Club;