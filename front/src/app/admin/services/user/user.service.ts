import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInterface} from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9090/api/user';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'x-token': token || ''
    });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`, { headers: this.getHeaders() });
  }

  createUser(user: Partial<UserInterface>): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, user, { headers: this.getHeaders() });
  }

  updateUser(id: number, user: Partial<UserInterface>): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders() });
  }

  searchUsers(term: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${term}`, { headers: this.getHeaders() });
  }
}
