'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import db from '../database/connection.js';

class Grups extends Model {
  static associate(models) {
    // define association here
  }
}

Grups.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  tutor_id: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Persona',
      key: 'id'
    }
  },
 name: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: db,
  modelName: 'Grup',
  tableName: 'grups',
  timestamps: true,
  paranoid: true
});

export default Grups;


