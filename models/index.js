'use strict';

import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
//const basename = path.basename(__filename);
const env = process.argv[2];
const config = {
  "username": "root",
  "password": null,
  "database": "database_development",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "dialectOptions": {
    "multipleStatements": true
  }
}
const db = {};

let sequelize;

sequelize = new Sequelize(config.database, config.username, config.password, config);
/*
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    console.log(path.join(__dirname, file))
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
*/
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
