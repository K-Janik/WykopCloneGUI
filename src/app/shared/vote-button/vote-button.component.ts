import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../post-model";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {faSquare} from "@fortawesome/free-regular-svg-icons";
import {VoteService} from "../vote.service";
import {AuthService} from "../../auth/shared/auth.service";
import {PostService} from "../post.service";
import {ToastrService} from "ngx-toastr";
import {VotePayload} from "./vote-payload";
import {VoteType} from "./vote-type";
import {throwError} from "rxjs";
import {templateJitUrl} from "@angular/compiler";

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;
  votePayload: VotePayload;
  faPlus = faPlus;
  faMinus = faMinus;
  faSquare = faSquare;

  constructor(private voteService: VoteService, private authService: AuthService,
              private postService: PostService, private toastr: ToastrService) {

    this.votePayload ={
      voteType: undefined,
      postId: undefined
    }

  }

  ngOnInit(): void {
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(()=>{
      this.updateVoteDetails();
    }, error => {
      this.toastr.error('Brak dostępu');
      throwError(error);
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post=post;
    });
  }
}
