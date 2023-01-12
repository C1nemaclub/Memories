import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent {
  email: string = 'sam@gmail.com';
  password: string = '123';
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private toast: MessageService
  ) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
    };
    this.userService.login(loginData).subscribe(
      (res: any) => {
        this.userService.setToken(res.token);
        this.tokenService.setToken(res.token);
        this.reloadPage();
      },
      (e: any) => {
        console.log(e.status);
        if (e.status === 403) {
          this.toast.add({
            severity: 'error',
            summary: 'There was an error',
            detail: 'Invalid Credentials',
          });
        } else {
          this.toast.add({
            severity: 'error',
            summary: 'There was an error',
            detail: 'Something went wrong',
          });
        }
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
