import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Role, UserInterface} from '../../interfaces/user.interface';
import {UserService} from '../../services/user/user.service';

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

  constructor(private userService: UserService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.formData = {
        ...this.user
      };
    } else {
      this.formData = {};
    }
  }

  onSubmit(): void {
    const operation = this.user
      ? this.userService.updateUser(this.user.id!, this.formData)
      : this.userService.createUser(this.formData);

    operation.subscribe({
      next: (response) => {
        console.log('Usuario guardado:', response);
        this.submit.emit();
      },
      error: (err) => console.error('Error al guardar usuario:', err),
    });
  }
}
