import { RegisterComponent } from './../pages/register/register.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/User';
import { Observable, Subject } from 'rxjs';
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
  user: User;
  token: string = localStorage.getItem('token') || '';
  userSubject: Subject<User>;
  constructor(private http: HttpClient, private route: Router) {
    this.userSubject = new Subject<User>();
  }

  getUser(): User {
    return this.user;
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return this.token;
  }

  setUserSubject(): any {
    this.userSubject.next(this.user);
  }
  setSubject(): Observable<any> {
    return this.userSubject.asObservable();
  }

  login(loginData: any): any {
    console.log('login', loginData);
    return this.http.post<User>(
      `http://localhost:4000/api/v1/auth/authenticate`,
      loginData,
      httpOptions
    );
  }
  register(registerData: any): any {
    console.log('register', registerData);
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
}
