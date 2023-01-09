import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user: any = null;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.fetchLoggedUser().subscribe((res: any) => {
      console.log(res);

      this.user = res;
    });
  }
}
