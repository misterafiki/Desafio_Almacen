import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {Role, UserInterface, UserRole} from '../../interfaces/user.interface';
import {MatDialog} from '@angular/material/dialog';
import  { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-users-list',
  standalone: false,

  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  users: UserInterface[] = [];
  allUsers: UserInterface[] = [];
  searchTerm: string = '';
  selectedUser: UserInterface | null = null;
  showForm: boolean = false;
  loadError: boolean = false;
  roles: Role['name'][] = ['administrador', 'direccion', 'jefeDepartamento', 'profesor'];

  showModal = false;
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Admin · Usuarios');
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
    this.loadError = false;
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.allUsers = response.data.map((user: UserInterface) => ({
          ...user,
          RolesNames: user.User_roles.map((ur: UserRole) => ur.Rol.name).join(', ')
        }));
        this.users = [...this.allUsers];
        console.log('Usuarios cargados:', this.users);
      },
      error: (err) => {
        console.error(err);
        this.loadError = true;
        this.users = [];
        this.allUsers = [];
      }
    });
  }


  search(): void {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.users = this.allUsers.filter(user => {
        const roles = user.RolesNames?.toLowerCase() || '';
        return (
          user.id.toString().includes(searchTermLower) ||
          user.name.toLowerCase().includes(searchTermLower) ||
          user.email.toLowerCase().includes(searchTermLower) ||
          roles.includes(searchTermLower)
        );
      });
    } else {
      this.users = [...this.allUsers];
    }
  }

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: '¿Quieres eliminar este usuario?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe({
          next: () => this.loadUsers(),
          error: (err) => console.error(err)
        });
      }
    });
  }

  handleFormSubmit(): void {
    this.selectedUser = null;
    this.showForm = false;

    setTimeout(() => {
      this.loadUsers();
    }, 500);
  }
}
