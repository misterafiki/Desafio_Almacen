import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Role, UserInterface} from '../../interfaces/user.interface';
import {UserService} from '../../services/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import {ToastComponent} from '../../../shared/toast/toast.component';

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

  rolesList: Role['name'][] = ['administrador', 'direccion', 'jefeDepartamento', 'profesor'];
  formData: Partial<UserInterface & { role?: string }> = {};

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.formData = {
        ...this.user
      };
    } else {
      this.formData = {};
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.snackBar.openFromComponent(ToastComponent, {
        data: {
          status: 'error',
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
      },
      error: (err) => {
        console.error('Error al guardar usuario:', err);
        this.snackBar.openFromComponent(ToastComponent, {
          data: {
            status: 'error',
            message: 'Error al guardar usuario. Inténtalo de nuevo.'
          },
          duration: 3000
        });
      },
    });
  }
}
