const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
const Post = require('./post')
const User = require('./user')
const Club = require('./club')
const Clubuser = require('./clubuser')


db.Post = Post;
db.User = User;
db.Club = Club;
db.Clubuser = Clubuser;

Post.init(sequelize);
User.init(sequelize);
Club.init(sequelize);
Clubuser.init(sequelize);


Post.associate(db);
User.associate(db);
Club.associate(db);
Clubuser.associate(db);



module.exports = db;