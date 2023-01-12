import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  userId: number;
  user: any;
  posts: any[];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.fetchUser();
    });
  }

  fetchUser() {
    this.userService.getUserById(this.userId).subscribe((res: any) => {
      console.log(res);
      this.user = res;
      this.fetchPosts();
    });
  }
  fetchPosts() {
    this.postService.getPostsByUser(this.userId).subscribe((res: any) => {
      console.log(res);
      this.posts = res;
    });
  }
}
