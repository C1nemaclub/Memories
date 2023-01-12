import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: any = '';
  displayAvatarModal: boolean = false;
  image: any;
  constructor(
    private userService: UserService,
    private route: Router,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    console.log(this.user);
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
