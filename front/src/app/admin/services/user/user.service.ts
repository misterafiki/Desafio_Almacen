import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInterface} from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9090/api/user';

  constructor(private http: HttpClient) { }
  HeaderParam = new HttpParams().set('auth', "si");

  getUsers(params: {
    page: string,
    limit: string,
    sortBy?: string,
    sortOrder?: string,
    search?: string,
  }): Observable<any> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('limit', params.limit)
      .set('auth', "si");

    if (params.sortBy && params.sortOrder) {
      httpParams = httpParams
        .set('sortBy', params.sortBy)
        .set('sortOrder', params.sortOrder)
        .set('auth', "si");
    }

    if (params.search) {
      httpParams = httpParams
        .set('search', params.search)
        .set('auth', "si");
    }

    return this.http.get<any>(`${this.apiUrl}/`, { params: httpParams});
  }

  createUser(user: Partial<UserInterface>): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, user, { params: this.HeaderParam });
  }

  updateUser(id: number, user: Partial<UserInterface>): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, user, { params: this.HeaderParam  });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { params: this.HeaderParam  });
  }

  searchUsers(term: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${term}`, { params: this.HeaderParam });
  }
}
