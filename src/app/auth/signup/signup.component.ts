import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupRequest} from './signup-request';
import {AuthService} from '../shared/auth.service';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequest: SignupRequest;
  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.signupRequest = {
      username: '',
      password: '',
      email: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }
  signup() {
    this.signupRequest.username = this.signupForm.get('username').value;
    this.signupRequest.password = this.signupForm.get('password').value;
    this.signupRequest.email = this.signupForm.get('email').value;

    this.authService.signup(this.signupRequest)
      .subscribe(() => {
        this.router.navigate(['/login'],{queryParams: {registered: 'true'}});
      }, ()=>{
        this.toastr.error('Rejestracja zakończona niepowodzeniem! Spróbuj jeszcze raz');
      });
  }
}
