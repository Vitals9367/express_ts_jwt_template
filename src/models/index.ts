'use strict';

import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize, { DataTypes, Sequelize as connection } from 'sequelize';
import config from '../config/db.config';

type dbType = {
  sequelize?: any,
  Sequelize?: any,
  
}

const basename = _basename(__filename);
const db: dbType = {};

let sequelize;
sequelize = new connection(config.CONNECTION_STRING);

readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach(file => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
