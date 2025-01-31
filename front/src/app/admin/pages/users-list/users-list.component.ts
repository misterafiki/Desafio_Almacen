import { Component } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {Role, UserInterface, UserRole} from '../../interfaces/user.interface';

@Component({
  selector: 'app-users-list',
  standalone: false,

  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  users: UserInterface[] = [];
  searchTerm: string = '';
  selectedUser: UserInterface | null = null;
  showForm: boolean = false;
  roles: Role['name'][] = ['administrador', 'direccion', 'jefeDepartamento', 'profesor'];

  showModal = false;
  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.loadUsers();
  }

  openModal(user: UserInterface | null = null): void {
    this.selectedUser = user;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedUser = null;
  }

  onUserFormSubmit(): void {
    this.closeModal();
    this.loadUsers();
  }

  editUser(user: UserInterface): void {
    this.openModal({...user});
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data.map((user: UserInterface) => ({
          ...user,
          RolesNames: user.User_roles.map((ur: UserRole) => ur.Rol.name).join(', ')
        }));
        console.log('Usuarios cargados:', this.users);
      },
      error: (err) => console.error(err),
    });
  }


  search(): void {
    if (this.searchTerm) {
      this.userService.searchUsers(this.searchTerm).subscribe({
        next: (response) => this.users = response.data,
        error: (err) => console.error(err)
      });
    } else {
      this.loadUsers();
    }
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error(err)
      });
    }
  }

  handleFormSubmit(): void {
    this.selectedUser = null;
    this.showForm = false;

    setTimeout(() => {
      this.loadUsers();
    }, 500);
  }
}
