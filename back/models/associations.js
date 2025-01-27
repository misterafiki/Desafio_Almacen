import User from './user.js';
import User_role from './user_role.js';
import Roles from './role.js';

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

export { User_role, User, Roles };