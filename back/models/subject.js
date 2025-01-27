'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import db from '../database/connection.js';

class Subject extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    
  }
}

Subject.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  img:{
    type: DataTypes.STRING,
    defaultValue:null,
    allowNull: true
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
  modelName: 'Subject',
  tableName: 'subjects',
  timestamps: true,
  paranoid: true
});

export default Subject;