import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequest} from '../signup/signup-request';
import {Observable} from 'rxjs';
import {LoginRequest} from "../login/login-request";
import {map, tap} from "rxjs/operators";
import {LocalStorageService} from "ngx-webstorage";
import {LoginResponse} from "../login/login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequest: SignupRequest): Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequest, {responseType: 'text'});
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login', loginRequest)
      .pipe(map(data =>{
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt)
        this.localStorage.store('username', data.username);

        return true;
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken() {
    const refreshToken = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    }
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token', refreshToken)
      .pipe(tap(response => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUsername() {
    return this.localStorage.retrieve('username');
  }
}

