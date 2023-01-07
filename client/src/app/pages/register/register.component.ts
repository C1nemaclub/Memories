import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  constructor(private userService: UserService) {}

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
      console.log(response);
    });
  }
}
