import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();

  apiURL: string = 'http://localhost:8081/users';
  token!: string;
  public loggedUser!: string;
  public isloggedIn: boolean = false;
  public roles!: string[];

  constructor(private router: Router, private http: HttpClient) { }

  login(user: User) {
    return this.http.post<User>(`${this.apiURL}/login`, user, { observe: 'response' });
  }

 



  registerUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/register`, user);
  }

  verifyUser(username: string, verificationCode: string): Observable<any> {
    const body = {
      username: username,
      verificationCode: verificationCode,
    };

     return this.http.post(`${this.apiURL}/verify`, body, { responseType: 'text' })
    .pipe(
      catchError((error: any) => {
        console.error('Error verifying user', error);
        return throwError(error);
      })
    );
  }
 

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  getToken(): string {
    return this.token;
  }

  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    if (!this.roles) // this.roles == undefined
      return false;
    return this.roles.indexOf('ADMIN') > -1;
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.token);
  }
}
