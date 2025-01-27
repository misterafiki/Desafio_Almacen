'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import db from '../database/connection.js';

class AssignedRoles extends Model {
  static associate(models) {
    // define association here
  }
}

AssignedRoles.init({
  idra: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  rol_id: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Roles',
      key: 'id'
    }
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
  modelName: 'AssignedRoles',
  tableName: 'assignedroles',
  timestamps: true,
  paranoid: true
});

export default AssignedRoles;


