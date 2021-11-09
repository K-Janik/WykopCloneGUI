import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxWebstorageModule} from "ngx-webstorage";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { HomeComponent } from './home/home.component';
import {TokenInterceptor} from "./token-interceptor";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { PostTileComponent } from './shared/post-tile/post-tile.component';
import { VoteButtonComponent } from './shared/vote-button/vote-button.component';
import { PostSideBarComponent } from './shared/post-side-bar/post-side-bar.component';
import { CreateTagComponent } from './tag/create-tag/create-tag.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ListTagsComponent } from './tag/list-tags/list-tags.component';
import {EditorModule} from "@tinymce/tinymce-angular";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostTileComponent,
    VoteButtonComponent,
    PostSideBarComponent,
    CreateTagComponent,
    CreatePostComponent,
    ListTagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
