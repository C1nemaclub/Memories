import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './interfaces/User';
import { Router } from '@angular/router'; // import router from angular router

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';
  user: User;

  constructor(private userService: UserService, private route: Router) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    if (!this.user) {
      console.log('Going Login');
      this.route.navigate(['/login']);
    } else if (this.user) {
      console.log('Going Home');
      this.route.navigate(['/home']);
    }
  }
}
