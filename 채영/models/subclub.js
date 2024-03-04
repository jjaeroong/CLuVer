const Sequelize = require('sequelize');

class Subclub extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      sub_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      subname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      subcontent: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      club_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },

    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Subclub',
      tableName: 'subclub',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }


  static associate(models) {
    this.hasMany(models.Subclubuser, { foreignKey: 'sub_id', sourceKey: 'sub_id' });
    this.belongsTo(models.Club, { foreignKey: 'club_id' });
  }
};

module.exports = Subclub;