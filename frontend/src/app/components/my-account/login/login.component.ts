import { Component, OnInit } from '@angular/core';
// Import necessary modules
import { User } from '../../../models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // User variable
  public user;
  // Token variable
  public token: any;
  // Variable identity
  public identity: any;
  // Error variable
  public errors: any;

  constructor(private userService: UserService, private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {}
  // Declare Login Method
  login(loginForm: any) {
    // Validate is form is valid
    if (!loginForm.valid) {
      // Validate invalid or incomplete data
      console.log('Missing required fields');
      this.errors = 'Missing required fields';
      this.endError();
    } else {
      // Execute Login
      this.userService.login(this.user, true).subscribe(
        (response) => {
          // Save incoming token in a variable
          this.token = response.jwt;
          localStorage.setItem('token', this.token);
          // Save user data in variable identity
          this.userService.login(this.user,true).subscribe(
            response=>{
              localStorage.setItem('identity',JSON.stringify(response.user));
              this.router.navigate(['profile']);
            },
            error=>{

            }
          )
          // Redirect to DashBoard
          this.router.navigate(['dashboard']);
        },
        (error) => {
          console.log(error.error.message);
          this.errors = error.error.message;
          this.endError();
        }
      );
    }
  }
  // Close error window
  endError() {
    setTimeout(() => {
      this.errors = '';
    }, 3000);
  }
}

