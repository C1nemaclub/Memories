import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = 'sam@gmail.com';
  password: string = '123';
  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
    };
    this.userService.login(loginData).subscribe((res: any) => {
      console.log(res);
      this.userService.setToken(res.token);
      this.tokenService.setToken(res.token);
      this.reloadPage();
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
