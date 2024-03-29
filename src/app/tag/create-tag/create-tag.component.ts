import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TagModel} from "../tag-response";
import {TagService} from "../tag.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.css']
})
export class CreateTagComponent implements OnInit {
  createTagForm: FormGroup;
  tagModel: TagModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router, private tagService: TagService) {
    this.createTagForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.tagModel = {
      name: '',
      description: ''
    }
  }

  ngOnInit(): void {
  }

  createTag() {
    this.tagModel.name = this.createTagForm.get('title').value;
    this.tagModel.description = this.createTagForm.get('description').value;
    this.tagService.createTag(this.tagModel).subscribe(data => {
      this.router.navigateByUrl('/list-tags');
    },error => {
      throwError(error);
    })
  }

  discard() {
    this.router.navigateByUrl('/');
  }
}
