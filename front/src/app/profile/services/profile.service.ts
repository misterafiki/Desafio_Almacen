import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { LoginResponse } from '../interfaces/auth.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {

  }
  changeImg( data: JSON ): Observable<LoginResponse> {
    let serviceUrl: string = 'http://localhost:9090/api/img/';

    return this.http.post<LoginResponse>( `${serviceUrl}/login`,data)

  }
}
