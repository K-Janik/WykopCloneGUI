import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";
import {CreatePostComponent} from "./post/create-post/create-post.component";
import {CreateTagComponent} from "./tag/create-tag/create-tag.component";
import {ListTagsComponent} from "./tag/list-tags/list-tags.component";
import {ViewPostComponent} from "./post/view-post/view-post.component";
import {UserProfileComponent} from "./auth/user-profile/user-profile.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'create-tag', component: CreateTagComponent, canActivate: [AuthGuard]},
  {path: 'list-tags', component: ListTagsComponent},
  {path: 'view-post/:id', component: ViewPostComponent},
  {path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
