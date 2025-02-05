import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Role, UserInterface} from '../../interfaces/user.interface';
import {UserService} from '../../services/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import {ToastComponent} from '../../../shared/components/toast/toast.component';
import {UsersListComponent} from '../../pages/users-list/users-list.component';

@Component({
  selector: 'app-user-form',
  standalone: false,

  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnChanges{
  @Input() user: UserInterface | null = null;
  @Output() submit = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('userForm', { static: true }) userForm!: NgForm;

  rolesList: Role['name'][] = ['administrador', 'direccion', 'jefeDepartamento', 'profesor'];
  formData: Partial<UserInterface & { role?: string }> = {};
  hasChanges: boolean = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private UsersLists: UsersListComponent
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.formData = { ...this.user };
      this.hasChanges = false;
    } else {
      this.formData = {};
      this.hasChanges = false;
      if (this.userForm) {
        this.userForm.resetForm();
      }
    }
  }

  onInputChange() {
    this.hasChanges = JSON.stringify(this.formData) !== JSON.stringify(this.user);
  }

  onSubmit(form: NgForm): void {
    if (form.invalid || !this.hasChanges) {
      this.snackBar.openFromComponent(ToastComponent, {
        data: {
          status: 'false',
          message: 'Por favor, completa todos los campos correctamente.'
        },
        duration: 3000
      });
      return;
    }

    const operation = this.user
      ? this.userService.updateUser(this.user.id!, this.formData)
      : this.userService.createUser(this.formData);

    operation.subscribe({
      next: (response) => {
        console.log('Usuario guardado:', response);
        this.submit.emit();
        this.UsersLists.onUserFormSubmit()
        this.snackBar.openFromComponent(ToastComponent, {
          data: {
            status: 'true',
            message: "Acción realizada correctamente"
          },
          duration: 3000
        });
        this.userForm.resetForm()
      },
      error: (err) => {
        console.error('Error al guardar usuario:', err.error.msg);
        this.snackBar.openFromComponent(ToastComponent, {
          data: {
            status: 'false',
            message: err.error.msg
          },
          duration: 3000
        });
      },
    });
  }
}
