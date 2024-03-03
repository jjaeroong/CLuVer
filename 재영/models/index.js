const Sequelize = require("sequelize");

const env=process.env.NODE_ENV || 'development';
const config = require("../config/config")[env];
const db = {};


const User = require("./user");
const Post = require("./posts");
const Subclub = require("./subclub");
const SubclubUser = require("./subclubusers");
const Schedule = require("./schedule");
const Club = require("./club");
const Clubuser = require("./clubuser");

// const bcrypt = require("bcrypt");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);


db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.Schedule = Schedule;
db.SubclubUser = SubclubUser;
db.Subclub = Subclub;
db.Club = Club;
db.Clubuser = Clubuser;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

User.initiate(sequelize);
Post.initiate(sequelize);
Subclub.initiate(sequelize);
SubclubUser.initiate(sequelize);
Schedule.initiate(sequelize);
Club.init(sequelize);
Clubuser.initiate(sequelize);


User.associate(db);
Post.associate(db);
Subclub.associate(db);
SubclubUser.associate(db);
Schedule.associate(db);
Club.associate(db);
Clubuser.associate(db);


db.Sequelize = Sequelize;

module.exports = db;