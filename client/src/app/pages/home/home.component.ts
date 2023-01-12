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
  //Form info
  description: string = '';
  image: any = '';

  constructor(
    private userService: UserService,
    private route: Router,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.userService.fetchLoggedUser().subscribe(
      (res: any) => {
        this.user = res;
        this.userService.setUser(res);
        this.userService.updateSubject(res);
      },
      (e: any) => {
        if (e.status === 403) {
          this.route.navigate(['/login']);
        }
      }
    );
    this.postService.getAllPosts().subscribe((res: any) => {
      this.posts = res.reverse();
    });
  }

  toggleNewPost() {
    this.displayNewPost = !this.displayNewPost;
  }
  onFileChange(e: any) {
    console.log(e.target.files[0]);
    this.image = e.target.files[0];
  }

  onSubmit() {
    console.log(this.description);
    console.log(this.image);
    const formBody = {
      title: this.description.split(' ')[0] || this.description,
      description: this.description,
      author: this.user.firstname + ' ' + this.user.lastname,
    };
    console.log(this.user);

    const formData = new FormData();
    formData.append('file', this.image);
    formData.append('body', JSON.stringify(formBody));
    formData.append('authorid', this.user.id);
    this.postService.createPost(formData).subscribe((res) => {
      console.log(res);
      this.displayNewPost = false;
      this.image = '';
      this.description = '';
      this.reloadPage();
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
