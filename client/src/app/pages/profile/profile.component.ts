import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: any = '';
  displayAvatarModal: boolean = false;
  image: any;
  postAmount: number = 0;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private route: Router,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.subscription = this.postService
      .getPostsAsObservable()
      .subscribe((res) => {
        this.postAmount = res.length;
      });
  }

  onSubmit() {
    if (this.image === undefined || this.image === null) return;

    const formData = new FormData();
    formData.append('file', this.image);
    this.userService
      .updateAvatar(formData, this.user.id)
      .subscribe((res: any) => {
        console.log(res);
        this.reloadPage();
      });
  }
  onFileChange(e: any) {
    console.log(e.target.files[0]);
    this.image = e.target.files[0];
  }
  toggleAvatarModal() {
    this.displayAvatarModal = !this.displayAvatarModal;
  }
  reloadPage(): void {
    window.location.reload();
  }
}
