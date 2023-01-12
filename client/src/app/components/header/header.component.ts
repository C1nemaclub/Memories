import { User } from './../../interfaces/User';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  subscription: Subscription;
  user: any = '';
  constructor(private route: Router, private userService: UserService) {}
  handleLogout() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
    this.reloadPage();
  }

  ngOnInit() {
    this.subscription = this.userService
      .getUserObservable()
      .subscribe((res) => {
        this.user = res;
      });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
