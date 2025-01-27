import User from './user.js';
import AssignedRoles from './assigned_roles.js';
import Roles from './roles.js';

User.hasMany(AssignedRoles, { 
  as: 'AssignedRoles', 
  foreignKey: 'user_id' 
});

AssignedRoles.belongsTo(User, { 
  as: 'User', 
  foreignKey: 'user_id' 
});

AssignedRoles.belongsTo(Roles, { 
  as: 'Rol', 
  foreignKey: 'rol_id' 
});

Roles.hasMany(AssignedRoles, { 
  as: 'AssignedRoles', 
  foreignKey: 'rol_id' 
});

export { AssignedRoles, User, Roles };