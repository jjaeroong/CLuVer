
const Sequelize = require('sequelize');

class Clubuser extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      club_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
      },
      joinDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      cate: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
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

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
    this.belongsTo(models.Club, { foreignKey: 'club_id', targetKey: 'club_id' });
  }

};

module.exports = Clubuser;
