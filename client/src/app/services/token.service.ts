import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  token: string = '';

  constructor() {}

  setToken(token: string) {
    this.token = token;
  }
  getToken(): string {
    return this.token;
  }
}
