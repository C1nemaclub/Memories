import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private userService: UserService) {}

  onSubmit() {
    const loginData = {
      username: this.email,
      password: this.password,
    };
    this.userService.login(loginData);
  }
}
