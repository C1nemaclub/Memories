import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user: any = null;
  posts: any[] = [];
  displayNewPost: boolean = false;
  constructor(
    private userService: UserService,
    private route: Router,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.userService.fetchLoggedUser().subscribe(
      (res: any) => {
        this.user = res;
      },
      (e: any) => {
        if (e.status === 403) {
          this.route.navigate(['/login']);
        }
      }
    );
    this.postService.getAllPosts().subscribe((res: any) => {
      this.posts = res;
    });
  }

  toggleNewPost() {
    this.displayNewPost = !this.displayNewPost;
  }
}
