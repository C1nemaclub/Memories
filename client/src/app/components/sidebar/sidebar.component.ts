import { Component } from '@angular/core';
import { UserService } from '../..//services/user.service';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  user: any = '';
  postAmount: number = 0;
  subscription: Subscription;
  constructor(
    private userService: UserService,
    private route: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    const url = this.route.url.replace('/', '').toString();
    this.userService.subject.subscribe((res) => {
      this.user = res;
      this.title.setTitle(
        url[0].toUpperCase() +
          url.slice(1) +
          ' | ' +
          this.user.firstname +
          ' ' +
          this.user.lastname
      );
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
