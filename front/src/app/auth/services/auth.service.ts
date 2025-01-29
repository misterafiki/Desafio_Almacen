import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { LoginResponse } from '../interfaces/auth.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serviceUrl: string = 'http://localhost:9090/api/auth';

  constructor(private http: HttpClient) {

  }
  Login( data: JSON ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>( `${this.serviceUrl}/login`,data)

  }
}
