import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { Post } from '../interfaces/Post';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts: any[] = [];
  private postSubject = new BehaviorSubject<any>(this.posts);
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  setPosts(posts: any) {
    this.posts = posts;
    this.postSubject.next(this.posts);
  }
  getPosts() {
    return this.posts;
  }

  getPostsAsObservable(): Observable<any> {
    return this.postSubject.asObservable();
  }

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

  getPostsByUser(id: number) {
    return this.http.get<any>(`/api/v1/posts/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.userService.getToken(),
      }),
    });
  }
}
