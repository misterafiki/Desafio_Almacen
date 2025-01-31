import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetUserDataResponse } from '../interfaces/profile.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}
  params = new HttpParams().set('auth', "si");

  changeImg(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', file);

    const serviceUrl: string = 'http://localhost:9090/api/img/';
    return this.http.post<any>(serviceUrl, formData, { params: this.params });
  }
  getUserData(): Observable<GetUserDataResponse> {
    const serviceUrl: string = 'http://localhost:9090/api/auth/getInfo';
    return this.http.get<any>(serviceUrl, { params: this.params });
  }
}
