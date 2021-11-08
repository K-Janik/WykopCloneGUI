import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../post-model";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import {faSquare} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  faPlus = faPlus;
  faMinus = faMinus;
  faSquare = faSquare;

  @Input() post: PostModel;

  constructor() { }

  ngOnInit(): void {
  }

  upvotePost() {

  }

  downvotePost() {

  }
}
