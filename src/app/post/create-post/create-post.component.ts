import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostModel} from "../../shared/post-model";
import {TagModel} from "../../tag/tag-response";
import {Router} from "@angular/router";
import {PostService} from "../../shared/post.service";
import {TagService} from "../../tag/tag.service";
import {throwError} from "rxjs";
import {templateJitUrl} from "@angular/compiler";
import {CreatePostModule} from "./create-post.module";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  postModel: CreatePostModule;
  tags: Array<TagModel>;

  constructor(private router: Router, private postService: PostService, private tagService: TagService) {
    this.postModel ={
      postName: '',
      url: '',
      description: '',
      tagName: ''
    }
  }

  ngOnInit(): void {
    this.createPostForm=new FormGroup({
      postName: new FormControl('', Validators.required),
      tagName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.tagService.getAllTags().subscribe((data)=>{
      this.tags= data;
    }, error => {
      throwError(error);
    });
  }

  createPost() {
    this.postModel.postName=this.createPostForm.get('postName').value;
    this.postModel.tagName = this.createPostForm.get('tagName').value;
    this.postModel.url = this.createPostForm.get('url').value;
    this.postModel.description = this.createPostForm.get('description').value;

    this.postService.createPost(this.postModel).subscribe((data)=>{
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
}
