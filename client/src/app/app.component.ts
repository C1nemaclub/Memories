import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './interfaces/User';
import { Router } from '@angular/router'; // import router from angular router
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';
  user: User;
  token: string = '';
  subscription: Subscription;

  constructor(private userService: UserService, private route: Router) {}

  ngOnInit() {
    this.token = this.userService.getToken();
    if (this.token != '') {
      this.route.navigate(['/home']);
    } else {
      this.route.navigate(['/login']);
    }
  }
}
