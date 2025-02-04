import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {Role, UserInterface, UserRole} from '../../interfaces/user.interface';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../components/confirmation-dialog/confirmation-dialog.component';
import {Title} from '@angular/platform-browser';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-users-list',
  standalone: false,

  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit, AfterViewInit{
  users: UserInterface[] = [];
  allUsers: UserInterface[] = [];
  searchTerm: string = '';
  selectedUser: UserInterface | null = null;
  showForm: boolean = false;
  loadError: boolean = false;
  roles: Role['name'][] = ['administrador', 'direccion', 'jefeDepartamento', 'profesor'];

  //Pagination
  dataSource = new MatTableDataSource<UserInterface>();
  displayedColumns: string[] = ['name', 'last_name', 'email', 'role', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //Tooltip
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);

  //Sort
  currentSort: Sort = {active: 'id', direction: 'asc'}
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

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

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.sort) {
        this.sort.sortChange.subscribe((sort: Sort) => {
          this.currentSort = sort;
          this.loadUsers(1, this.paginator.pageSize);
        });
      } else {
        console.error('MatSort unavailable');
      }
    });
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

  loadUsers(page: number = 1, limit: number = 5): void {
    this.loadError = false;

    const params = {
      page: page.toString(),
      limit: limit.toString(),
      sortBy: this.currentSort.active,
      sortOrder: this.currentSort.direction,
      search: this.searchTerm
    };

    this.userService.getUsers(params).subscribe({
      next: (response) => {
        this.dataSource.data = response.data.users.map((user: UserInterface) => ({
          ...user,
          RolesNames: user.User_roles.map((ur: UserRole) => ur.Rol.name).join(', ')
        }));
        this.paginator.length = response.data.totalUsers;
        this.paginator.pageIndex = response.data.currentPage - 1;
      },
      error: (err) => {
        console.error(err);
        this.loadError = true;
        this.dataSource.data = [];
      }
    });
  }

  onPageChange(event: any): void {
    const page = event.pageIndex + 1;
    const limit = event.pageSize;
    this.loadUsers(page, limit);
  }

  search(): void {
    this.loadUsers(1, this.paginator?.pageSize || 5);
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
