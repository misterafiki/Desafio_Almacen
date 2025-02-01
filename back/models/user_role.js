'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import db from '../databases/connection.js';

class User_role extends Model {
  static associate(models) {
    // define association here
  }
}

User_role.init({
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
  modelName: 'User_role',
  tableName: 'users_roles',
  timestamps: true,
  paranoid: true
});

export default User_role;


