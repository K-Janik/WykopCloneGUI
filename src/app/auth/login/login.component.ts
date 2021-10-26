import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequest} from "./login-request";
import {AuthService} from "../shared/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {throwError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequest: LoginRequest;
  registerSuccessMessage: string;
  isError: boolean;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router,
              private toastr: ToastrService) {
    this.loginRequest = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
      .subscribe(params=> {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Rejestracja zakończona!');
          this.registerSuccessMessage = 'Mail aktywacyjny został wysłany!';
        }
      });
  }

  login() {
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequest).subscribe(data =>{
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Logowanie pomyślne!');
      }, ()=> {
        this.isError = true;
        throwError(this);
    });
  }

}
