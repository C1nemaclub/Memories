import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { Post } from '../interfaces/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  getAllPosts(): any {
    return this.http.get<Post>(`/api/v1/posts`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.userService.getToken(),
      }),
    });
  }

  createPost(post: any) {
    return this.http.post<Post>(`/api/v1/posts/create`, post, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.userService.getToken(),
      }),
    });
  }
}
