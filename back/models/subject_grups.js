'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import db from '../databases/connection.js';

class SubjectGrups extends Model {
  static associate(models) {
    // define association here
  }
}

SubjectGrups.init({
  idra: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  subject_id: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Subject',
      key: 'id'
    }
  },
  grup_id: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Grups',
      key: 'id'
    }
  },
  teacher_id: {
    type: DataTypes.BIGINT,
    references: {
      model: 'User',
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
  modelName: 'SubjectGrups',
  tableName: 'subjectgrups',
  timestamps: true,
  paranoid: true
});

export default SubjectGrups;


