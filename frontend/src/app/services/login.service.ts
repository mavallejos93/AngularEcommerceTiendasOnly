import { Injectable } from '@angular/core';

// Import necessary modules
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './GLOBAL';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Create variable for URL
  public url;
  public user;
  // Token and Identity variables
  public token: any;
  public identity: any;
  // Class constructor
  constructor(private http: HttpClient) {
    // Assign backend url to global variable
    this.url = global.url;
    // Initialize user model
    this.user = new User();
  }
  // Login Method
  login(user: User, getToken = true): Observable<any> {
    // User data variable to send to back
    let json = user;
    // Validate if valid token comes in
    if (!getToken) {
    } else {
      user.getToken = true;
    }
    // Request Headers
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Return, send request to consume API in backend
    return this.http.post(this.url + 'login', json, { headers: headers });
  }
  // Token Method
  getToken(): Observable<any> {
    let token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    } else {
      this.token = false;
    }
    return this.token;
  }
  // Method for user identity
  getIdentity(): Observable<any> {
    let identity = localStorage.getItem('identity');
    if (identity) {
      this.identity = identity;
    } else {
      this.identity = false;
    }
    return this.identity;
  }
}
