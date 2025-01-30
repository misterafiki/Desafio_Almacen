import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { LoginResponse } from '../interfaces/auth.interfaces';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serviceUrl: string = 'http://localhost:9090/api/auth';

  private selectedRoleSubject = new BehaviorSubject<string | null>(null);
  selectedRole$ = this.selectedRoleSubject.asObservable();

  constructor(private http: HttpClient) {

  }
  Login( data: JSON ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>( `${this.serviceUrl}/login`,data)

  }

   // Método para actualizar el rol seleccionado
   setSelectedRole(role: string): void {
    this.selectedRoleSubject.next(role);
  }

  // Método para obtener el rol seleccionado
  getSelectedRole(): string | null {
    return this.selectedRoleSubject.value;
  }
}
