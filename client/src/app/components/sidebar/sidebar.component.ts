import { Component } from '@angular/core';
import { UserService } from '../..//services/user.service';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  user: any = '';
  subscription: Subscription;
  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {
    this.userService.subject.subscribe((res) => {
      this.user = res;
    });
  }

  onDestroy(): void {
    // you need this in order to avoid a memory leak
    this.subscription.unsubscribe();
  }

  hasRoute(route: string) {
    return this.route.url === route;
  }
}
