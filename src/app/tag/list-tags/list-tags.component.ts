import { Component, OnInit } from '@angular/core';
import {TagModel} from "../tag-response";
import {TagService} from "../tag.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.css']
})
export class ListTagsComponent implements OnInit {

  tags: Array<TagModel>;

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.tagService.getAllTags().subscribe(data =>{
      this.tags=data;
    },error => {
      throwError(error);
    })
  }

}
