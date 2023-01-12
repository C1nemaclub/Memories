import { RegisterComponent } from './../pages/register/register.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/User';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Authorization: 'Bearer ',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any = '';
  token: string = localStorage.getItem('token') || '';
  public subject = new BehaviorSubject<User>(this.user);
  constructor(private http: HttpClient, private route: Router) {}

  updateSubject(user: any): void {
    this.subject.next(user); //emit the user result
  }

  getUserObservable(): Observable<any> {
    return this.subject.asObservable();
  }

  getUser(): User {
    return this.user;
  }
  setUser(user: any): void {
    this.user = user;
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return this.token;
  }

  login(loginData: any): any {
    return this.http.post<User>(
      `http://localhost:4000/api/v1/auth/authenticate`,
      loginData,
      httpOptions
    );
  }
  register(registerData: any): any {
    return this.http.post<User>(
      `http://localhost:4000/api/v1/auth/register`,
      registerData,
      httpOptions
    );
  }
  fetchLoggedUser(): any {
    return this.http.get<any>('/api/v1/users/profile', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.token,
      }),
    });
  }
  updateAvatar(FormData: any, userId: any): any {
    return this.http.put<any>(`api/v1/users/me/${userId}`, FormData, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.token,
      }),
    });
  }
}
