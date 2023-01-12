import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PostComponent } from './components/post/post.component';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProfileComponent } from './pages/profile/profile.component';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { PhotosComponent } from './pages/photos/photos.component';
import { CardModule } from 'primeng/card';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'photos',
    component: PhotosComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    HeroComponent,
    SidebarComponent,
    PostComponent,
    ProfileComponent,
    PhotosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    ImageModule,
    DialogModule,
    InputTextareaModule,
    ToastModule,
    FileUploadModule,
    CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
