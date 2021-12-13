import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../post-model";
import {PostService} from "../post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-side-bar',
  templateUrl: './post-side-bar.component.html',
  styleUrls: ['./post-side-bar.component.css']
})
export class PostSideBarComponent implements OnInit {

  @Input() sides: Array<PostModel> = [];

  constructor(private postService: PostService, private router: Router) {
    this.postService.getAllPosts().subscribe(side => {
      this.sides=side;
    })
  }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }

}
