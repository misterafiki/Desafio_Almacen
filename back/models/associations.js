import User from './user.js';
import User_role from './user_role.js';
import Roles from './role.js';
import Category from './category.js';
import Item from './item.js';
import State from './state.js';
import Loan from './loan.js';

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

Category.hasMany(Item, {
  as: 'items',
  foreignKey: 'category_id',
});


Item.belongsTo(Category, {
  as: 'category',
  foreignKey: 'category_id',
});

Category.hasMany(Item, {
  as: 'items',
  foreignKey: 'category_id',
});

Item.belongsTo(Category, {
  as: 'category',
  foreignKey: 'category_id',
});

Item.hasOne(State, {
  as: 'state', 
  foreignKey: 'item_id', 
});

State.belongsTo(Item, {
  as: 'item',  
  foreignKey: 'item_id', 
});

State.belongsTo(Loan, {
  as: 'loan', 
  foreignKey: 'loan_id', 
});

Loan.hasOne(State, {
  as: 'state', 
  foreignKey: 'loan_id', 
});

export { User_role, User, Roles, Loan, State, Item, Category };