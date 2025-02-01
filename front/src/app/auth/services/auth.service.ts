import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { LoginResponse } from '../interfaces/auth.interfaces';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serviceUrl: string = 'http://localhost:9090/api/auth';

  // Obtiene el rol guardado en localStorage al iniciar
  private selectedRoleSubject = new BehaviorSubject<string | null>(this.getSelectedRoleFromStorage());
  selectedRole$ = this.selectedRoleSubject.asObservable();

  constructor(private http: HttpClient) {

  }
  Login( data: JSON ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>( `${this.serviceUrl}/login`,data)

  }
  recoverPassword(data: { email: string }): Observable<LoginResponse> {
    const encodedEmail = encodeURIComponent(data.email);
    return this.http.get<LoginResponse>(`http://localhost:9090/api/user/forgot/${encodedEmail}`);
  }
  


   // Guarda el rol seleccionado en `localStorage` y actualiza el observable
   setSelectedRole(role: string | null): void {
    if (role) {
      localStorage.setItem('rolSelected', role);
    } else {
      localStorage.removeItem('rolSelected');
    }
    this.selectedRoleSubject.next(role);
  }


  // Obtiene el rol seleccionado desde `localStorage`
  getSelectedRoleFromStorage(): string | null {
    return localStorage.getItem('rolSelected');
  }

  getSelectedRole(): string | null {
    return this.selectedRoleSubject.value;
  }
}
