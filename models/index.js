const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Search = require('./search');
const Map = require('./map');
const Lost = require('./losts');
const Location = require('./location');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;
db.Search = Search;
db.Map = Map;
db.Location = Location;
db.Lost=Lost;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Search.init(sequelize);
Map.init(sequelize);
Location.init(sequelize);
Lost.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
Search.associate(db);
Map.associate(db);
Location.associate(db);

module.exports = db;