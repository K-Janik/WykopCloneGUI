import { Component, OnInit } from '@angular/core';
import {PostModel} from "../../shared/post-model";
import {PostService} from "../../shared/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {throwError} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentPayload} from "../../comment/comment.payload";
import {CommentService} from "../../comment/comment.service";
import {AuthService} from "../../auth/shared/auth.service";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  side: Array<PostModel> = [];
  isLoggedIn: boolean;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
              private commentService: CommentService, private router: Router, private authService: AuthService) {
    this.postId = this.activateRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      postId: this.postId
    };
    this.isLoggedIn = this.authService.isLoggedIn();
    this.postService.getAllPosts().subscribe(post => {
      this.side=post;
    })
  }

  ngOnInit(): void {
    this.getPosById();
    this.getCommentsForPost();
  }

  private getPosById(){
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentPayload).subscribe(data =>{
      this.commentForm.get('text').setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data =>{
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }
}
