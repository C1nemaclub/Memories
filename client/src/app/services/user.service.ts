import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User;
  constructor(private http: HttpClient) {}

  getUser(): User {
    return this.user;
  }
}
