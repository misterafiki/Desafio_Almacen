export interface Role {
  id: number;
  name: string;
}

export interface UserRole {
  idra: number;
  user_id: number;
  rol_id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  Rol: Role;
}

export interface UserInterface {
  id: number;
  name: string;
  last_name: string;
  email: string;
  img?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  User_roles: UserRole[];
  RolesNames?: string;
}

export interface PageInterface {
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  users: UserInterface[];
}

export interface UserResponseInterface {
  msg: string;
  status: boolean;
  data: PageInterface[];
}
