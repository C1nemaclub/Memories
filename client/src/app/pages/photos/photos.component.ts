import { User } from './../../interfaces/User';
import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  providers: [MessageService],
})
export class PhotosComponent {
  user: any = '';
  posts: any[] = [];
  constructor(
    private userService: UserService,
    private postService: PostService,
    private toast: MessageService
  ) {}
  ngOnInit() {
    this.user = this.userService.getUser();
    this.postService.getPostsByUser(this.user.id).subscribe((res) => {
      this.posts = res;
      this.postService.setPosts(this.posts);
    });
  }

  handleDangerClick(post: any) {
    this.postService.deletePost(post.id).subscribe((res) => {
      this.posts = this.posts.filter((p) => p.id !== post.id);
      this.toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Post Deleted Successfully',
      });
    });
  }
}
