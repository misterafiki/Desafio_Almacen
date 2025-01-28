import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { LoginResponse } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serviceUrl: string = 'http://localhost:9090/api/auth';

  constructor(private http: HttpClient,private router: Router) {

  }
  Login( data: JSON ): void {

    this.http.post<LoginResponse>( `${this.serviceUrl}/login`,data)
      .subscribe(
        response => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/selectRol'])
          }
        },
        err => {
          console.log(err.error)
          alert('Error al hacer login '+err.error.msg);
        });
  }
}
