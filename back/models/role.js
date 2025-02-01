'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import db from '../databases/connection.js';

class Role extends Model {
  static associate(models) {
    //this.hasMany(models.RolesAsignados, { as: 'RolesAsignados', foreignKey: 'id' })
    //this.hasMany(models.RolesAsignados, { as: 'RolesAsignados', foreignKey: 'id_rol' });
  }
}

Role.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  descrption: {
    type: DataTypes.STRING,
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
  modelName: 'Role',
  tableName: 'roles',
  timestamps: true,
  paranoid: true
});

export default Role;