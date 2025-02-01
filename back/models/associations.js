import User from './user.js';
import User_role from './user_role.js';
import Roles from './role.js';
import Grups from './grups.js';
import Subject from './subject.js';
import SubjectGrups from './subject_grups.js';

User.hasMany(User_role, { 
  as: 'User_roles', 
  foreignKey: 'user_id' 
});

User_role.belongsTo(User, { 
  as: 'User', 
  foreignKey: 'user_id' 
});

User_role.belongsTo(Roles, { 
  as: 'Rol', 
  foreignKey: 'rol_id' 
});

Roles.hasMany(User_role, { 
  as: 'User_roles', 
  foreignKey: 'rol_id' 
});

Grups.hasMany(SubjectGrups, {
  as: 'SubjectGrups',
  foreignKey: 'grup_id',
});

SubjectGrups.belongsTo(Grups, {
  as: 'Grup',
  foreignKey: 'grup_id',
});

Subject.hasMany(SubjectGrups, {
  as: 'SubjectGrups',
  foreignKey: 'subject_id',
});

SubjectGrups.belongsTo(Subject, {
  as: 'Subject',
  foreignKey: 'subject_id',
});

User.hasMany(SubjectGrups, {
  as: 'SubjectGrups',
  foreignKey: 'teacher_id',
});

SubjectGrups.belongsTo(User, {
  as: 'Teacher',
  foreignKey: 'teacher_id',
});

export { User_role, User, Roles, Grups, Subject, SubjectGrups };
