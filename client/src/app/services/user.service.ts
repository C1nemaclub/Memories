import { RegisterComponent } from './../pages/register/register.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/User';
import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User;
  userSubject: Subject<User>;
  constructor(private http: HttpClient) {
    this.userSubject = new Subject<User>();
  }

  getUser(): User {
    return this.user;
  }

  setUser(): void {}
  setSubject(): Observable<any> {
    return this.userSubject.asObservable();
  }

  login(loginData: any) {
    console.log('login', loginData);
  }
  register(registerData: any): any {
    console.log('register', registerData);
    return this.http.post<User>(
      `http://localhost:4000/api/v1/auth/register`,
      registerData
    );
  }
}
