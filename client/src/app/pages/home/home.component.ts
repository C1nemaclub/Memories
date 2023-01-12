import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],
})
export class HomeComponent {
  user: any = null;
  posts: any[] = [];
  displayNewPost: boolean = false;
  //Form info
  description: string = '';
  image: any = null;
  maxFileSize: number = 1000000;

  constructor(
    private userService: UserService,
    private route: Router,
    private postService: PostService,
    private toast: MessageService
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
          this.toast.add({
            severity: 'warn',
            summary: 'Info',
            detail: 'Session Expired, Please Login Again',
          });
          setTimeout(() => {
            this.logout();
            this.reloadPage();
            this.route.navigate(['/login']);
          }, 2000);
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
    this.image = e.files[0];
  }

  onSubmit() {
    if (
      this.description === '' ||
      this.image === undefined ||
      this.image === null
    )
      return;
    const formBody = {
      title: this.description.split(' ')[0] || this.description,
      description: this.description,
      author: this.user.firstname + ' ' + this.user.lastname,
    };
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
  logout() {
    localStorage.removeItem('token');
  }
}
