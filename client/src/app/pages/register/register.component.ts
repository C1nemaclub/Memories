import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  firstname: string = 'sam';
  lastname: string = 'sam';
  email: string = 'sam@gmail.com';
  password: string = '123';
  confirmPassword: string = '123';
  constructor(private userService: UserService, private route: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    const registerData = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
    };
    this.userService.register(registerData).subscribe((response: any) => {
      //this.userService.setToken(response.token);
      this.route.navigate(['/login']);
    });
  }
}
