var fs = require('fs');
var path = require('path');
const Sequelize = require('sequelize');
var basename = path.basename(__filename);
require('../config/config');
const db = {};

//database name, user, password
const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
  //'mysql', 'sqlite', 'postgres', 'mssql'
  dialect: 'mysql',
  //default is localhost
  host:  CONFIG.db_host,
  //optional, default value is 3306
  port: CONFIG.db_port,
  //default value is console.log
  // logging: console.count,x`
  define: {
    timestamps: false,
    paranoid: true,
    underscored: false
  }
});
console.log('basename', basename);
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;